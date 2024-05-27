import React from 'react';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-url-polyfill/auto';

const App = () => {
  const CLERK_FRONTEND_API = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <ClerkProvider frontendApi={CLERK_FRONTEND_API}>
      <View style={{ flex: 1 }}>
        <SignedIn>
          <AppNavigator />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
};

export default App;