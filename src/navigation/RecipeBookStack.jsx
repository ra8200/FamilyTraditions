import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeBooksScreen from '../screens/RecipeBooksScreen';
import BookScreen from '../screens/BookScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import FamilyMembersScreen from '../screens/FamilyMembersScreen';

const Stack = createStackNavigator();

function RecipeBookStack() {
  return (
    <Stack.Navigator initialRouteName="RecipeBooks">
      <Stack.Screen name="RecipeBooks" component={RecipeBooksScreen} options={{ title: 'Recipe Books' }} />
      <Stack.Screen name="Book" component={BookScreen} options={{ title: 'Book Details' }} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} options={{ title: 'Create Recipe' }} />
      <Stack.Screen name="FamilyMembers" component={FamilyMembersScreen} options={{ title: 'Family Members' }} />
    </Stack.Navigator>
  );
}

export default RecipeBookStack;
