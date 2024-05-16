// import cloudinary from './config/cloudinaryConfig';

module.exports = function(app, pool) {
    app.get('/recipebooks', (req, res) => {
        const query = 'SELECT * FROM recipe_books;';
        pool.query(query, (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).json(result.rows);
            }
        });
    });

    app.post('/recipebooks', (req, res) => {
        const { title, user_id } = req.body;
        const query = 'INSERT INTO recipe_books (title, user_id) VALUES ($1, $2);';
        pool.query(query, [title, user_id], (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(201).send('Recipe Book created');
            }
        });
    });

    app.put('/recipebooks/:id', (req, res) => {
        const { id } = req.params;
        const { title, user_id } = req.body;
        const query = 'UPDATE recipe_books SET title = $1, user_id = $2 WHERE id = $3;';
        pool.query(query, [title, user_id, id], (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).send('Recipe Book updated');
            }
        });
    });

    app.delete('/recipebooks/:id', (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM recipe_books WHERE id=$1;';
        pool.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).send('Recipe Book deleted');
            }
        });
    });
};
