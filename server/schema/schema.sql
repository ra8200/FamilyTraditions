/* Create Tables */

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,  -- Clerk authentication ID
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    profile_image_url VARCHAR(255),
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMPTZ CHECK (last_login IS NULL OR last_login >= creation_date)
);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
    role_id serial PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL
);

-- Recipe Books Table
CREATE TABLE IF NOT EXISTS recipe_books (
    recipe_book_id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    banner_image_url VARCHAR(255),
    author_id INT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (user_id)
);

-- Recipes Table
CREATE TABLE IF NOT EXISTS recipes (
    recipe_id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    ingredients TEXT[],
    instructions TEXT,
    recipe_book_id INT NOT NULL,
    creator_id INT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_book_id) REFERENCES recipe_books (recipe_book_id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES users (user_id)
);

-- Recipe Photos Table
CREATE TABLE IF NOT EXISTS recipe_photos (
    photo_id serial PRIMARY KEY,
    recipe_id INT NOT NULL,
    cloudinary_url VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE
);

-- User Has Permission Table
CREATE TABLE IF NOT EXISTS user_has_permission (
    permission_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_book_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (recipe_book_id) REFERENCES recipe_books(recipe_book_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Permissions Matrix Table
CREATE TABLE IF NOT EXISTS permissions_matrix (
    matrix_id serial PRIMARY KEY,
    role_id INT NOT NULL,
    permission_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- User Account Permissions Table
CREATE TABLE IF NOT EXISTS user_account_permissions (
    account_permission_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    permission_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* Insert Roles */
INSERT INTO roles (role_name) VALUES ('Author'), ('Admin'), ('Member');

/* Insert Permissions */
INSERT INTO permissions_matrix (role_id, permission_name) VALUES
((SELECT role_id FROM roles WHERE role_name = 'Author'), 'Create Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Author'), 'Read Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Author'), 'Update Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Author'), 'Delete Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Author'), 'Invite Users'),
((SELECT role_id FROM roles WHERE role_name = 'Author'), 'Manage Permissions'),
((SELECT role_id FROM roles WHERE role_name = 'Admin'), 'Create Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Admin'), 'Read Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Admin'), 'Update Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Admin'), 'Delete Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Admin'), 'Invite Users'),
((SELECT role_id FROM roles WHERE role_name = 'Member'), 'Create Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Member'), 'Read Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Member'), 'Update Recipe'),
((SELECT role_id FROM roles WHERE role_name = 'Member'), 'Delete Recipe');

/* Insert Test Data */
-- Insert Users
INSERT INTO users (clerk_user_id, username, first_name, last_name, email, profile_image_url) VALUES
('clerk001', 'johndoe', 'John', 'Doe', 'johndoe@example.com',
CREATE TABLE IF NOT EXISTS roles (
    role_id serial PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions_matrix (
    matrix_id serial PRIMARY KEY,
    role_id INT NOT NULL,
    permission_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE IF NOT EXISTS user_account_permissions (
    account_permission_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    permission_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

