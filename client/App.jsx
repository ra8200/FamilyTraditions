import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import { ClerkProvider } from "@clerk/clerk-expo";

enableScreens();

export default function App() {
  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
      <SafeAreaProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ClerkProvider>

  );
}