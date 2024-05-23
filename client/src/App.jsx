import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';

enableScreens();

const App = () => {
  return (
    <ScrollView>
      <AppNavigator />
      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default App;
