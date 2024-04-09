import React from 'react';
import { StyleSheet, View, Text, FlatList, Button, Image } from 'react-native';
import RecipeCard from './components/RecipeCard'; // Adjust the import path as needed

const BookScreen = ({ route, navigation }) => {
  // Placeholder data for recipes within the book
  const recipes = [
    { id: '1', title: 'Grandma\'s Apple Pie', imageUrl: 'https://example.com/apple_pie.jpg', summary: 'A delicious traditional apple pie.' },
    { id: '2', title: 'Uncle Joe\'s BBQ Ribs', imageUrl: 'https://example.com/bbq_ribs.jpg', summary: 'Smokey, savory BBQ ribs.' },
    // Add more recipes
  ];

  const { bookId, bookTitle, bookImageUrl } = route.params;

  const renderRecipe = ({ item }) => (
    <RecipeCard
      title={item.title}
      imageUrl={item.imageUrl}
      summary={item.summary}
      onPress={() => navigation.navigate('RecipeScreen', { recipeId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      {/* Optionally use an image as a banner if the book has a cover image */}
      {bookImageUrl && (
        <Image source={{ uri: bookImageUrl }} style={styles.banner} />
      )}
      <Text style={styles.bookTitle}>{bookTitle}</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={item => item.id}
      />
      <Button
        title="Add New Recipe"
        onPress={() => navigation.navigate('CreateRecipeScreen', { bookId })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  banner: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default BookScreen;