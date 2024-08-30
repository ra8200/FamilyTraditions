const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pool = require('./config/config');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipesRoutes');
const authRoutes = require('./routes/authRoutes');
const recipeBookRoutes = require('./routes/recipeBooksRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipeBooks', recipeBookRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Recipe Book API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
