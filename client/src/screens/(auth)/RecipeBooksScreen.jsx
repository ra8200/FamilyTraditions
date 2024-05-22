import React from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import RecipeBookCard from '../../components/containers/RecipeBookCard'; // Adjust the import path as needed

const RecipeBooksScreen = ({ navigation }) => {
  // Placeholder data - you'll replace this with data from your database
  const recipeBooks = [
    { id: '1', title: 'Family Favorites', imageUrl: 'https://example.com/family_favorites.jpg' },
    { id: '2', title: 'Holiday Specials', imageUrl: 'https://example.com/holiday_specials.jpg' },
  ];

  const renderItem = ({ item }) => (
    <RecipeBookCard
      title={item.title}
      imageUrl={item.imageUrl}
      onPress={() => navigation.navigate('Book', { bookId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipe Books</Text>
      <FlatList
        data={recipeBooks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="Create New Book"
        onPress={() => navigation.navigate('CreateBook')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default RecipeBooksScreen;
