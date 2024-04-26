import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import RecipeBookStack from './RecipeBookStack';
import HomeScreen from '../screens/HomeScreen';
import UserAccountScreen from '../screens/UserAccountScreen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'RecipeBooksScreen':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'UserAccount':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'alert-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="RecipeBooksScreen" component={RecipeBookStack} options={{ headerShown: false, title: 'Recipe Books' }} />
        <Tab.Screen name="UserAccount" component={UserAccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;