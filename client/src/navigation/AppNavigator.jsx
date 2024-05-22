// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
// import RecipeBookStack from './RecipeBookStack';
// import HomeScreen from '../screens/auth/HomeScreen';
// import UserAccountScreen from '../screens/auth/UserAccountScreen';
// // import LoginScreen from '../screens/public/LoginScreen';
// // import CreateAccountScreen from '../screens/public/CreateAccountScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           switch (route.name) {
//             case 'Home':
//               iconName = focused ? 'home' : 'home-outline';
//               break;
//             case 'RecipeBooksScreen':
//               iconName = focused ? 'book' : 'book-outline';
//               break;
//             case 'UserAccount':
//               iconName = focused ? 'person' : 'person-outline';
//               break;
//             default:
//               iconName = 'alert-circle-outline';
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'tomato',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="RecipeBooksScreen" component={RecipeBookStack} options={{ headerShown: false, title: 'Recipe Books' }} />
//       <Tab.Screen name="UserAccount" component={UserAccountScreen} />
//     </Tab.Navigator>
//   );
// }

// // function AuthStack() {
// //   return (
// //     <Stack.Navigator>
// //       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
// //       <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
// //     </Stack.Navigator>
// //   );
// // }

// function AppNavigator() {
//   // const [currentUser, setCurrentUser] = useState(null);

//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged((user) => {
//   //     setCurrentUser(user);
//   //   });
//   //   return unsubscribe;  // This ensures we correctly clean up the subscription
//   // }, []);

//   return (
//     <NavigationContainer>
//       {/* {currentUser ? <MainTabs /> : <AuthStack />} */}
//       <MainTabs />
//     </NavigationContainer>
//   );
// }

// export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import RecipeBookStack from './RecipeBookStack';
import HomeScreen from '../screens/auth/HomeScreen';
import UserAccountScreen from '../screens/auth/UserAccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
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
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

export default AppNavigator;
