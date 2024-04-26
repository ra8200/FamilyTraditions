import { firestore } from '../firebase/firebaseConfig'; // Adjust the import path as needed

// Add a new user
export const addUser = async (user) => {
  try {
    const userRef = firestore.collection('users').doc(user.uid);
    await userRef.set(user);
    console.log('User added/updated:', user.uid);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Fetch a user
export const getUser = async (userId) => {
  try {
    const userRef = firestore.collection('users').doc(userId);
    const doc = await userRef.get();
    if (doc.exists) {
      console.log('User data:', doc.data());
      return doc.data();
    } else {
      console.log('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
