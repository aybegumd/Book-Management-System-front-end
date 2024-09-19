
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BookDetail = ({ route }) => {
  const { bookId } = route.params;



  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>Book Title {bookId}</Text>
      <Text style={styles.bookAuthor}>Author Name</Text>
      <Text style={styles.bookDetails}>Detailed information about the book will go here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bookImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#555',
  },
  bookDetails: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default BookDetail;
