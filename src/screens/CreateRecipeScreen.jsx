import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../firebase/firebaseConfig'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

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
    if (!firebase.auth().currentUser) {
      Alert.alert('Error', 'You must be logged in to submit a recipe');
      return;
    }
  
    try {
      const userRole = (await firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()).data().role;
  
      // Check if user is allowed to create recipes
      if (userRole !== 'Member' && userRole !== 'Admin Member' && userRole !== 'Author') {
        Alert.alert('Permission Denied', 'You do not have permission to create recipes');
        return;
      }
  
      const newRecipe = {
        title,
        ingredients,
        instructions,
        isPublic,
        creatorId: firebase.auth().currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
  
      await firebase.firestore().collection('recipes').add(newRecipe);
      Alert.alert('Recipe Submitted', `Recipe Title: ${title}`);
      navigation.goBack(); // Optionally navigate back or reset form
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