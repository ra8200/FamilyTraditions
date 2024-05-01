const express = require('express');
const { Pool } = require('pg');

// Load environment variables (for local development)
require('dotenv').config();

// Setup PostgreSQL connection pool using environment variables
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
});

// Create an instance of express application
const app = express();

// Use express built-in middleware to parse JSON request bodies
app.use(express.json());

// Import and use routes modules, passing the Express app and PostgreSQL pool
require('./routes/users')(app, pool);
require('./routes/recipeBooks')(app, pool);
require('./routes/recipes')(app, pool);

// Specify the port to listen on, use environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});