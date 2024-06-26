import React from 'react';
import { StyleSheet, Text, Pressable, Image } from 'react-native';

const RecipeBookCard = ({ title, imageUrl, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150, 
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RecipeBookCard;