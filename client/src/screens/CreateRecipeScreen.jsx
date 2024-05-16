import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

const CreateRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to submit a recipe');
      return;
    }
  
    const recipeData = {
      title,
      ingredients,
      instructions,
      isPublic,
      creatorId: user.id  // Assuming Clerk provides a unique user ID
    };
  
    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.sessionToken}`  // Include the session token for authentication
        },
        body: JSON.stringify(recipeData)
      });
  
      const responseData = await response.json();
      if (response.ok) {
        Alert.alert('Recipe Submitted', `Recipe Title: ${title}`);
        navigation.goBack();
      } else {
        throw new Error(responseData.message || 'Failed to create recipe');
      }
    } catch (error) {
      console.error("Error submitting recipe: ", error);
      Alert.alert('Error', 'There was an error submitting your recipe');
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

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Make Public?</Text>
        <Switch
          onValueChange={setIsPublic}
          value={isPublic}
        />
      </View>

      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <Button
        title="Submit Recipe"
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 15,
  },
});

export default CreateRecipeScreen;