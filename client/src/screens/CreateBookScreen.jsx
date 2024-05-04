import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../firebase/firebaseConfig'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const CreateBookScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    // Placeholder for submission logic
    Alert.alert('Recipe Book Created', `Book Title: ${title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Book Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        multiline
        numberOfLines={4}
        onChangeText={setDescription}
      />
      
      <Button title="Pick a Cover Image" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

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
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 15,
  },
});

export default CreateBookScreen;
