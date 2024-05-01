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

    app.post('/users', (req, res) => {
        const { username, password } = req.body;
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2);';
        pool.query(query, [username, password], (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(201).send('User created');
            }
        });
    });

    app.put('/users/:id', (req, res) => {
        const { id } = req.params;
        const { username, password } = req.body;
        const query = 'UPDATE users SET username = $1, password = $2 WHERE id = $3;';
        pool.query(query, [username, password, id], (error, result) => {
            if (error) {
                console.error('Error executing query', error.stack);
                res.status(500).send('Error executing query');
            } else {
                res.status(200).send('User updated');
            }
        });
    });

    app.delete('/users/:id', (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id=$1;';
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