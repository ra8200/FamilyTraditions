// src/components/RecipeCard.jsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeCard = ({ title, imageUri, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
    elevation: 3, // Shadow for Android
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeCard;
