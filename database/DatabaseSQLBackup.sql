/* Create Tables */

CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    salt TEXT NOT NULL, -- how to store passwords?
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (254) UNIQUE NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login TIMESTAMPTZ CHECK (last_login IS NULL OR last_login >= creation_date)
);

CREATE TABLE IF NOT EXISTS recipe_books (
    recipe_book_id serial PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    description VARCHAR (500),
    owner_id INT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated TIMESTAMPTZ CHECK (last_updated IS NULL OR last_updated >= creation_date),
    FOREIGN KEY (owner_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS recipes (
    recipe_id serial PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    description VARCHAR (500),
    instructions VARCHAR (4000),
    recipe_book_id INT NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_updated_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP CHECK (last_updated_date >= creation_date),
    FOREIGN KEY (recipe_book_id) REFERENCES recipe_books (recipe_book_id) 
);

CREATE TABLE IF NOT EXISTS user_has_permission (
    permission_id serial PRIMARY KEY,
    recipe_book_id INT NOT NULL,
    user_id INT NOT NULL,
    permission_type VARCHAR (10) NOT NULL DEFAULT 'READ' CHECK (permission_type = 'READ' OR permission_type = 'WRITE'),
    FOREIGN KEY (recipe_book_id) REFERENCES Recipe_Books (recipe_book_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);


/* Insert Test Data */

INSERT INTO users (username, hashed_password, salt, first_name, last_name, email) VALUES
('johndoe', 'hashedpassword1', 'salt1', 'John', 'Doe', 'johndoe@example.com'),
('janedoe', 'hashedpassword2', 'salt2', 'Jane', 'Doe', 'janedoe@example.com'),
('alicejohnson', 'hashedpassword3', 'salt3', 'Alice', 'Johnson', 'alicejohnson@example.com'),
('bobsmith', 'hashedpassword4', 'salt4', 'Bob', 'Smith', 'bobsmith@example.com');

INSERT INTO recipe_books (name, description, owner_id) VALUES
('Family Recipes', 'A collection of family cooking recipes.', 1),
('Holiday Specials', 'Recipes for holiday meals and treats.', 2),
('Healthy Eats', 'Delicious and healthy recipes.', 3),
('Quick Meals', 'Quick and easy recipes for busy days.', 4);

INSERT INTO recipes (name, description, instructions, recipe_book_id) VALUES
('Spaghetti Bolognese', 'A classic Italian dish.', 'Instructions for Spaghetti Bolognese...', 1),
('Pumpkin Pie', 'Perfect for the holidays.', 'Instructions for Pumpkin Pie...', 2),
('Quinoa Salad', 'A light and healthy salad.', 'Instructions for Quinoa Salad...', 3),
('Stir Fry', 'A quick and easy stir fry.', 'Instructions for Stir Fry...', 4);

INSERT INTO user_has_permission (recipe_book_id, user_id, permission_type) VALUES
(1, 1, 'WRITE'),
(1, 2, 'READ'),
(2, 2, 'WRITE'),
(3, 3, 'WRITE'),
(4, 4, 'WRITE'),
(4, 1, 'READ');


/* Table Alterations */

-- Alter Instructions Data Type
UPDATE recipes
SET instructions = jsonb_build_object('text', instructions);

ALTER TABLE recipes
ALTER COLUMN instructions TYPE JSONB USING instructions::JSONB;

-- Add Image URL Column
ALTER TABLE recipes
ADD COLUMN image_url VARCHAR(255);