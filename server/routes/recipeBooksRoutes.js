const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipe_books');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error fetching recipe books');
  }
});

router.post('/', async (req, res) => {
  const { name, description, author_id, image } = req.body;
  try {
    const uploadResponse = await cloudinary.uploader.upload(image);
    const result = await pool.query(
      'INSERT INTO recipe_books (name, description, author_id, banner_image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, author_id, uploadResponse.url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error creating recipe book');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, author_id, image } = req.body;
  try {
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.url;
    }
    const result = await pool.query(
      'UPDATE recipe_books SET name = $1, description = $2, author_id = $3, banner_image_url = $4, last_updated = CURRENT_TIMESTAMP WHERE recipe_book_id = $5 RETURNING *',
      [name, description, author_id, imageUrl, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error updating recipe book');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM recipe_books WHERE recipe_book_id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting recipe book');
  }
});

module.exports = router;