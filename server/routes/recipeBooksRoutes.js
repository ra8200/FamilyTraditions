const express = require('express');
const router = express.Router();
const { RecipeBook, User } = require('../models');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  try {
    const recipeBooks = await RecipeBook.findAll({
      include: [{ model: User, as: 'author' }]
    });
    res.json(recipeBooks);
  } catch (error) {
    res.status(500).send('Error fetching recipe books');
  }
});

router.post('/', async (req, res) => {
  const { name, description, user_id, image } = req.body;
  try {
    const uploadResponse = await cloudinary.uploader.upload(image);
    const newRecipeBook = await RecipeBook.create({
      name,
      description,
      author_id: user_id,
      banner_image_url: uploadResponse.url,
    });
    res.status(201).json(newRecipeBook);
  } catch (error) {
    res.status(500).send('Error creating recipe book');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, user_id, image } = req.body;
  try {
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.url;
    }
    const updatedRecipeBook = await RecipeBook.update(
      { name, description, author_id: user_id, banner_image_url: imageUrl },
      { where: { recipe_book_id: id } }
    );
    res.json(updatedRecipeBook);
  } catch (error) {
    res.status(500).send('Error updating recipe book');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await RecipeBook.destroy({ where: { recipe_book_id: id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting recipe book');
  }
});

module.exports = router;