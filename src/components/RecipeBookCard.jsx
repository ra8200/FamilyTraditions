import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

const RecipeBookCard = ({ title, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150, // Adjust the width as necessary
    marginRight: 15, // For spacing between items if in a horizontal list
  },
  image: {
    width: '100%', // Makes sure the image covers the width of the container
    height: 100, // Fixed height for the images, adjust as necessary
    borderRadius: 8, // Optional: if you want rounded corners
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Ensures the title is centered below the image
  },
});

export default RecipeBookCard;