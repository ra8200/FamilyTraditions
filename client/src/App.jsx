import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-url-polyfill/auto';

enableScreens();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;