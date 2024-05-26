const express = require('express');
const { Pool } = require('pg');

// Load environment variables (for local development)
require('dotenv').config();
// Setup PostgreSQL connection pool using environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
  });

// Create an instance of express application
const app = express();

// Use express built-in middleware to parse JSON request bodies
app.use(express.json());

// Import and use routes modules, passing the Express app and PostgreSQL pool
require('./routes/userRoutes')(app, pool);
require('./routes/recipeBooksRoutes')(app, pool);
require('./routes/recipesRoutes')(app, pool);

// Specify the port to listen on, use environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});