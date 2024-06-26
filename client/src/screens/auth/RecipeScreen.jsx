import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { fetchRecipe } from '../../api/api';

const RecipeScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const fetchedRecipe = await fetchRecipe(recipeId);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Failed to load recipe:', error);
      }
    };

    loadRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      {recipe.imageUrl && (
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      )}
      {recipe.ingredients && (
        <>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.text}>{recipe.ingredients}</Text>
        </>
      )}
      {recipe.instructions && (
        <>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.text}>{recipe.instructions}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default RecipeScreen;
