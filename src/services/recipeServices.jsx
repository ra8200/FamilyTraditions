import { firestore } from '../firebase/firebaseConfig'; // Adjust the import path as needed

// Add a new recipe
export const addRecipe = async (recipe) => {
  try {
    const recipeRef = await firestore.collection('recipes').add(recipe);
    console.log('Recipe created with ID:', recipeRef.id);
    return recipeRef.id; // Return new recipe ID
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

// Fetch a recipe
export const getRecipe = async (recipeId) => {
  try {
    const recipeRef = firestore.collection('recipes').doc(recipeId);
    const doc = await recipeRef.get();
    if (doc.exists) {
      console.log('Recipe data:', doc.data());
      return doc.data();
    } else {
      console.log('No such recipe!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
};
