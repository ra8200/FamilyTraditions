-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    salt TEXT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'),
    profile_image_url VARCHAR(255),
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMPTZ CHECK (last_login IS NULL OR last_login >= creation_date)
);

-- Recipe Books Table
CREATE TABLE IF NOT EXISTS recipe_books (
    recipe_book_id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    banner_image_url VARCHAR(255),
    owner_id INT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated TIMESTAMPTZ
);

-- Recipes Table
CREATE TABLE IF NOT EXISTS recipes (
    recipe_id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    ingredients TEXT[],
    instructions JSONB,
    recipe_book_id INT NOT NULL,
    creator_id INT NOT NULL,
    image_urls JSONB,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_book_id) REFERENCES recipe_books (recipe_book_id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES users (user_id)
);

-- User Has Permission Table
CREATE TABLE IF NOT EXISTS user_has_permission (
    permission_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_book_id INT NOT NULL,
    permission_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (recipe_book_id) REFERENCES recipe_books(recipe_book_id)
);
