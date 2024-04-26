import { firestore } from '../firebase/firebaseConfig'; // Adjust the import path as needed

// Add a new book
export const addBook = async (book) => {
  try {
    const bookRef = await firestore.collection('books').add(book);
    console.log('Book created with ID:', bookRef.id);
    return bookRef.id; // Return new book ID
  } catch (error) {
    console.error('Error adding book:', error);
  }
};

// Fetch a book
export const getBook = async (bookId) => {
  try {
    const bookRef = firestore.collection('books').doc(bookId);
    const doc = await bookRef.get();
    if (doc.exists) {
      console.log('Book data:', doc.data());
      return doc.data();
    } else {
      console.log('No such book!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
};
