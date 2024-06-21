const express = require('express');
require('dotenv').config();
const pool = require('./config/config');

const app = express();
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeBookRoutes = require('./routes/recipeBooksRoutes');
const recipeRoutes = require('./routes/recipesRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/recipeBooks', recipeBookRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});