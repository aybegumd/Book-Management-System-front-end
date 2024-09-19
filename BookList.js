// BookList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Örnek kitap verileri
const books = [
  { id: '1', title: 'Kitap 1', author: 'Yazar 1' },
  { id: '2', title: 'Kitap 2', author: 'Yazar 2' },
  { id: '3', title: 'Kitap 3', author: 'Yazar 3' },
  // Daha fazla kitap ekleyebilirsiniz
];

const BookList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: '#555',
  },
});

export default BookList;
