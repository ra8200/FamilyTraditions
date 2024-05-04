import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet,Text, TextInput, View, Button, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomAlert from '../components/CustomAlert';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create an Account",
      headerBackTitle: 'Login',
    });
  }, [navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const handleCreateAccount = async () => {
    
  };

  // const validateInput = () => {
  //   if (username.trim() === "") {
  //     setAlertMessage("Username is required.");
  //     setShowAlert(true);
  //     return false;
  //   }
  //   if (email.trim() === "") {
  //     setAlertMessage("Email is required.");
  //     setShowAlert(true);
  //     return false;
  //   }
  //   if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)) {
  //     setAlertMessage("Password must include upper, lower, number, and special char.");
  //     setShowAlert(true);
  //     return false;
  //   }
  //   if (password !== confirmPassword) {
  //     setAlertMessage("Passwords do not match.");
  //     setShowAlert(true);
  //     return false;
  //   }
  //   return true;
  // };

  // const checkUsernameUnique = async (username) => {
  //   try {
  //     const usersRef = collection(db, "users");
  //     const q = query(usersRef, where("username", "==", username));
  //     const querySnapshot = await getDocs(q);
  //     return querySnapshot.empty;
  //   } catch (error) {
  //     console.error("Error checking if username is unique:", error);
  //     throw error;
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Button title="Pick an Image" onPress={pickImage} />
      {profileImage && <Image source={{ uri: profileImage }} style={styles.image} />}
      <Button title="Create Account" onPress={handleCreateAccount} />
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account?</Text>
      </Pressable>
      <CustomAlert
        isVisible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
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

export default CreateAccountScreen;