import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
// import { ClerkProvider } from "@clerk/clerk-expo";
// import Constants from 'expo-constants';

enableScreens();

const App = () => {
  // console.log('Clerk Publishable Key:', Constants.expoConfig.extra.clerkPublishableKey);  // Log the key to the console

  return (
    // <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
    
      <ScrollView>
        <AppNavigator />
        <StatusBar style="auto" />
      </ScrollView>
      
    // </ClerkProvider>
  );
}

export default App;