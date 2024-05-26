require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./models');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
const recipeBookRoutes = require('./routes/recipeBookRoutes');

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipeBooks', recipeBookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});


// const express = require('express');
// const { Pool } = require('pg');

// // Load environment variables (for local development)
// require('dotenv').config();
// // Setup PostgreSQL connection pool using environment variables

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
//   });

// // Create an instance of express application
// const app = express();

// // Use express built-in middleware to parse JSON request bodies
// app.use(express.json());

// // Import and use routes modules, passing the Express app and PostgreSQL pool
// require('./routes/users')(app, pool);
// require('./routes/recipeBooks')(app, pool);
// require('./routes/recipes')(app, pool);

// // Specify the port to listen on, use environment variable or default to 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });