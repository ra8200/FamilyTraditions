const { uploadImage } = require('../services/imageServices');

module.exports = function (app, pool) {
    app.get('/users', (req, res) => {
        const query = 'SELECT * FROM users;';
        pool.query(query, (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).json(result.rows);
            }
        });
    });

    app.post('/users', async (req, res) => {
        const { username, password, email, firstName, lastName, profileImage } = req.body;
        try {
            const imageUrl = await uploadImage(profileImage);
            const query = `
                INSERT INTO users (username, password, email, first_name, last_name, profile_image_url) 
                VALUES ($1, $2, $3, $4, $5, $6);
            `;
            pool.query(query, [username, password, email, firstName, lastName, imageUrl], (error, result) => {
                if (error) {
                    console.error('Error executing query', error.stack);
                    res.status(500).send('Error executing query');
                } else {
                    res.status(201).send('User created');
                }
            });
        } catch (error) {
            res.status(500).send('Error uploading image');
        }
    });

    app.put('/users/:id', async (req, res) => {
        const { id } = req.params;
        const { username, password, profileImage } = req.body;
        try {
            let imageUrl;
            if (profileImage) {
                imageUrl = await uploadImage(profileImage);
            }
            const query = 'UPDATE users SET username = $1, password = $2, profile_image_url = $3 WHERE user_id = $4;';
            pool.query(query, [username, password, imageUrl, id], (error, result) => {
                if (error) {
                    console.error('Error executing query', error.stack);
                    res.status(500).send('Error executing query');
                } else {
                    res.status(200).send('User updated');
                }
            });
        } catch (error) {
            res.status(500).send('Error uploading image');
        }
    });

    app.delete('/users/:id', (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE user_id = $1;';
        pool.query(query, [id], (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).send('User deleted');
            }
        });
    });
};
