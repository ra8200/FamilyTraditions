import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeBooksScreen from '../screens/RecipeBooksScreen';
import BookScreen from '../screens/BookScreen';
import CreateBookScreen from '../screens/CreateBookScreen';
import RecipeScreen from '../screens/RecipeScreen';
import FamilyMembersScreen from '../screens/FamilyMembersScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';

const Stack = createStackNavigator();

function RecipeBookStack() {
  return (
    <Stack.Navigator initialRouteName="RecipeBooks">
      <Stack.Screen name="RecipeBooks" component={RecipeBooksScreen} options={{ title: 'Recipe Books' }} />
      <Stack.Screen name="Book" component={BookScreen} options={{ title: 'Book Details' }} />
      <Stack.Screen name="CreateBook" component={CreateBookScreen} options={{ title: 'Create New Book' }} />
      <Stack.Screen name="RecipeScreen" component={RecipeScreen} options={{ title: 'Recipe Details' }} />
      <Stack.Screen name="FamilyMembers" component={FamilyMembersScreen} options={{ title: 'Family Members' }} />
      <Stack.Screen name="CreateRecipeScreen" component={CreateRecipeScreen} options={{ title: 'Create New Recipe' }} />
    </Stack.Navigator>
  );
}

export default RecipeBookStack;