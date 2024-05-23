import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import ImageUploader from '../../components/containers/ImageUploader';

const CreateBookScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/recipebooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          image: bannerImage
        })
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create recipe book');
      }

      Alert.alert('Recipe Book Created', `Book Title: ${title}`);
      navigation.goBack();
    } catch (error) {
      console.error("Error creating recipe book: ", error);
      Alert.alert('Error', 'There was an error creating the recipe book');
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

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <ImageUploader onImageSelected={setBannerImage} />

      <Button
        title="Create Recipe Book"
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

export default CreateBookScreen;