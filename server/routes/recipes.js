const { uploadImage } = require('../services/imageServices');

module.exports = function(app, pool) {
    app.get('/recipes', (req, res) => {
        const query = 'SELECT * FROM recipes;';
        pool.query(query, (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).json(result.rows);
            }
        });
    });

    app.post('/recipes', async (req, res) => {
        const { title, ingredients, instructions, recipe_book_id, image } = req.body;
        try {
            const imageUrl = await uploadImage(image);
            const query = 'INSERT INTO recipes (title, ingredients, instructions, recipe_book_id, image_url) VALUES ($1, $2, $3, $4, $5);';
            pool.query(query, [title, ingredients, instructions, recipe_book_id, imageUrl], (error, result) => {
                if (error) {
                    console.error('Error executing query', error.stack);
                    res.status(500).send('Error executing query');
                } else {
                    res.status(201).send('Recipe created');
                }
            });
        } catch (error) {
            res.status(500).send('Error uploading image');
        }
    });

    app.put('/recipes/:id', async (req, res) => {
        const { id } = req.params;
        const { title, ingredients, instructions, recipe_book_id, image } = req.body;
        try {
            let imageUrl;
            if (image) {
                imageUrl = await uploadImage(image);
            }
            const query = 'UPDATE recipes SET title = $1, ingredients = $2, instructions = $3, recipe_book_id = $4, image_url = $5 WHERE recipe_id = $6;';
            pool.query(query, [title, ingredients, instructions, recipe_book_id, imageUrl, id], (error, result) => {
                if (error) {
                    console.error('Error executing query', error.stack);
                    res.status(500).send('Error executing query');
                } else {
                    res.status(200).send('Recipe updated');
                }
            });
        } catch (error) {
            res.status(500).send('Error uploading image');
        }
    });

    app.delete('/recipes/:id', (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM recipes WHERE recipe_id = $1;';
        pool.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).send('Recipe deleted');
            }
        });
    });
};
