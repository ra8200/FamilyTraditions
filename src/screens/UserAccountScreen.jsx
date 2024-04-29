import React, { useState, useEffect }  from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { db, auth } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const UserAccountScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userProfile ? (
        <>
          <Image source={{ uri: userProfile.profileImageUrl || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }} style={styles.profileImage} />
          <Text style={styles.title}>{userProfile.username || 'No Username'}</Text>
          <Text style={styles.userInfo}>Name: {userProfile.firstName} {userProfile.lastName}</Text>
          <Text style={styles.userInfo}>Email: {userProfile.email}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Edit Profile"
              onPress={() => console.log('Navigate to Edit Profile Screen')}
            />
            <Button
              title="My Recipe Books"
              onPress={() => navigation.navigate('RecipeBooksScreen')}
            />
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default UserAccountScreen;