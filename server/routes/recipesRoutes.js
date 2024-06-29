const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error fetching recipes');
  }
});

router.post('/', async (req, res) => {
  const { name, description, ingredients, instructions, recipe_book_id, creator_id, image } = req.body;
  try {
    const uploadResponse = await cloudinary.uploader.upload(image);
    const result = await pool.query(
      'INSERT INTO recipes (name, description, ingredients, instructions, recipe_book_id, creator_id, image_urls) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, ingredients, instructions, recipe_book_id, creator_id, uploadResponse.url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error creating recipe');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, ingredients, instructions, recipe_book_id, image } = req.body;
  try {
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.url;
    }
    const result = await pool.query(
      'UPDATE recipes SET name = $1, description = $2, ingredients = $3, instructions = $4, recipe_book_id = $5, image_urls = $6, last_updated = CURRENT_TIMESTAMP WHERE recipe_id = $7 RETURNING *',
      [name, description, ingredients, instructions, recipe_book_id, imageUrl, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error updating recipe');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM recipes WHERE recipe_id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting recipe');
  }
});

module.exports = router;