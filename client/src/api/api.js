const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchRecipe = async (recipeId) => {
  try {
    const response = await fetch(`${API_URL}/recipes/${recipeId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch recipe:', error);
    throw error;
  }
};
export const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}/recipes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      throw error;
    }
  };

