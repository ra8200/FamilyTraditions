import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';

const mockRecipes = [
  { id: '1', title: 'Grandma’s Apple Pie', category: 'Dessert' },
  { id: '2', title: 'Uncle Joe’s Chili', category: 'Main Dish' },
  { id: '3', title: 'Aunt May’s Veggie Salad', category: 'Salad' },
  // Add more recipes for prototyping
];

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredRecipes(mockRecipes);
    } else {
      const filtered = mockRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Featured Recipes</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.title}
            imageUri={item.imageUri}
            onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchInput: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  recipeItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeCategory: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default HomeScreen;