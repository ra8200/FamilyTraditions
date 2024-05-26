const express = require('express');
const router = express.Router();
const { Recipe, RecipeBook, User } = require('../models');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        { model: RecipeBook, as: 'recipeBook' },
        { model: User, as: 'creator' },
      ],
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).send('Error fetching recipes');
  }
});

router.post('/', async (req, res) => {
  const { name, description, ingredients, instructions, recipe_book_id, creator_id, image } = req.body;
  try {
    const uploadResponse = await cloudinary.uploader.upload(image);
    const newRecipe = await Recipe.create({
      name,
      description,
      ingredients,
      instructions,
      recipe_book_id,
      creator_id,
      image_url: uploadResponse.url,
    });
    res.status(201).json(newRecipe);
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
    const updatedRecipe = await Recipe.update(
      { name, description, ingredients, instructions, recipe_book_id, image_url: imageUrl },
      { where: { recipe_id: id } }
    );
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).send('Error updating recipe');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.destroy({ where: { recipe_id: id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting recipe');
  }
});

module.exports = router;