/* Create Tables */

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,  -- Clerk authentication ID
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
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
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
    recipes TEXT[], --recipe ids for recipes in this recipe book
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
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

/* Triggers for Automatic Timestamp Updates */

-- Function to update the last_updated column
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to recipe_books table
CREATE TRIGGER update_recipe_books_last_updated
BEFORE UPDATE ON recipe_books
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();

-- Apply trigger to recipes table
CREATE TRIGGER update_recipes_last_updated
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();

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
('clerk001', 'johndoe', 'John', 'Doe', 'johndoe@example.com', 'http://cloudinary.com/johndoe/profile.jpg'),
('clerk002', 'janedoe', 'Jane', 'Doe', 'janedoe@example.com', 'http://cloudinary.com/janedoe/profile.jpg'),
('clerk003', 'alicejohnson', 'Alice', 'Johnson', 'alicejohnson@example.com', 'http://cloudinary.com/alicejohnson/profile.jpg'),
('clerk004', 'bobsmith', 'Bob', 'Smith', 'bobsmith@example.com', 'http://cloudinary.com/bobsmith/profile.jpg');

-- Insert Recipe Books
INSERT INTO recipe_books (name, description, banner_image_url, author_id) VALUES
('Family Recipes', 'A collection of family cooking recipes.', 'http://cloudinary.com/familyrecipes/banner.jpg', 1),
('Holiday Specials', 'Recipes for holiday meals and treats.', 'http://cloudinary.com/holidayspecials/banner.jpg', 2),
('Healthy Eats', 'Delicious and healthy recipes.', 'http://cloudinary.com/healthyeats/banner.jpg', 3),
('Quick Meals', 'Quick and easy recipes for busy days.', 'http://cloudinary.com/quickmeals/banner.jpg', 4);

-- Insert Recipes
INSERT INTO recipes (name, description, ingredients, instructions, recipe_book_id, creator_id) VALUES
('Spaghetti Bolognese', 'A classic Italian dish.', '{"pasta", "tomato sauce", "beef"}', 'Boil pasta; Cook beef; Mix with sauce;', 1, 1),
('Pumpkin Pie', 'Perfect for the holidays.', '{"pumpkin", "pie crust", "sugar"}', 'Mix ingredients; Bake for 45 minutes;', 2, 2),
('Quinoa Salad', 'A light and healthy salad.', '{"quinoa", "tomatoes", "feta cheese"}', 'Combine all ingredients; Chill before serving;', 3, 3),
('Stir Fry', 'A quick and easy stir fry.', '{"noodles", "chicken", "vegetables"}', 'Cook chicken; Add vegetables; Stir fry;', 4, 4);

-- Insert Recipe Photos
INSERT INTO recipe_photos (recipe_id, cloudinary_url) VALUES
(1, 'http://cloudinary.com/spaghettibolognese/photo1.jpg'),
(2, 'http://cloudinary.com/pumpkinpie/photo1.jpg'),
(3, 'http://cloudinary.com/quinoasalad/photo1.jpg'),
(4, 'http://cloudinary.com/stirfry/photo1.jpg');

-- Insert User Permissions
INSERT INTO user_has_permission (user_id, recipe_book_id, role_id) VALUES
(1, 1, (SELECT role_id FROM roles WHERE role_name = 'Author')),
(2, 2, (SELECT role_id FROM roles WHERE role_name = 'Author')),
(3, 3, (SELECT role_id FROM roles WHERE role_name = 'Author')),
(4, 4, (SELECT role_id FROM roles WHERE role_name = 'Author'));

-- Insert Default User Account Permissions
INSERT INTO user_account_permissions (user_id, permission_name) 
SELECT user_id, unnest(array['View Profile', 'Edit Profile', 'Change Password', 'Set Privacy Settings', 'Manage Communications'])
FROM users;
