import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Pressable } from 'react-native';

const PasswordRecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    // Placeholder for password recovery logic
    console.log('Password Recovery for: ', email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Button title="Send Recovery Email" onPress={handlePasswordRecovery} />
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Back to Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  linkText: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default PasswordRecoveryScreen;
