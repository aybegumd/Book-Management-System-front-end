
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const books = [
  { id: '1', title: 'Book Title 1', author: 'Author 1', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Book Title 2', author: 'Author 2', image: 'https://via.placeholder.com/150' },
  // Diğer kitaplar...
];

const BookList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookCard}
      onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  bookImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
});

export default BookList;
