import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const UserAccountScreen = ({ navigation }) => {
  // Placeholder for user information
  const userInfo = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.userInfo}>Name: {userInfo.name}</Text>
      <Text style={styles.userInfo}>Email: {userInfo.email}</Text>
      <Button
        title="Edit Profile"
        onPress={() => console.log('Navigate to Edit Profile Screen')}
      />
      <Button
        title="My Recipe Books"
        onPress={() => navigation.navigate('RecipeBooksScreen')}
      />
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserAccountScreen;
