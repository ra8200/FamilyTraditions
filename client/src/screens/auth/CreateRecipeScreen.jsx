import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import ImageUploader from '../../components/containers/ImageUploader';

const CreateRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [recipeBookId, setRecipeBookId] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          ingredients,
          instructions,
          recipe_book_id: recipeBookId,
          image
        })
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create recipe');
      }

      Alert.alert('Recipe Created', `Recipe Title: ${title}`);
      navigation.goBack();
    } catch (error) {
      console.error("Error creating recipe: ", error);
      Alert.alert('Error', 'There was an error creating the recipe');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Ingredients</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={styles.input}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Text style={styles.label}>Recipe Book ID</Text>
      <TextInput
        style={styles.input}
        value={recipeBookId}
        onChangeText={setRecipeBookId}
      />

      <ImageUploader onImageSelected={setImage} />

      <Button
        title="Create Recipe"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default CreateRecipeScreen;
