import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import RecipeCard from '../../components/containers/RecipeCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchRecipes } from '../../api/api';

// const mockRecipes = [
//   { id: '1', title: 'Grandma’s Apple Pie', category: 'Dessert' },
//   { id: '2', title: 'Uncle Joe’s Chili', category: 'Main Dish' },
//   { id: '3', title: 'Aunt May’s Veggie Salad', category: 'Salad' },
// ];

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      }
    };

    loadRecipes();
  }, []);

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Featured Recipes</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {filteredRecipes.map((item) => (
          <RecipeCard
            key={item.recipe_id}
            title={item.title}
            imageUri={item.image_url}
            onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.recipe_id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
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
});

export default HomeScreen;