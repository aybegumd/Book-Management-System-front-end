import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { fetchBooks } from '../api';
import axios from 'axios'; 
import searchIcon from '../assets/search.png';

const AdminPage = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 10;

  const categories = [
    { name: 'All' },
    { name: 'Fiction' },
    { name: 'Science Fiction' },
    { name: 'Romance' },
    { name: 'Magic Realism' },
    { name: 'Adventure' },
    { name: 'Gothic Fiction' },
    { name: 'Fantasy' },
    { name: 'Dystopian Fiction' },
    { name: 'Psychological Fiction' },
    { name: "Children's Literature" },
    { name: 'Thriller' },
    { name: 'Historical Fiction' },
    { name: 'Philosophical Fiction' },
    { name: 'Southern Gothic' },
    { name: 'Young Adult' }
  ];

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError("Kitapları yüklerken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const toggleAvailability = async (bookId, currentAvailability) => {
    const newAvailability = !currentAvailability;

    try {
        await axios.patch(`http://192.168.1.52:8080/api/books/${bookId}/availability`, {
            available: newAvailability,
        });
       
        const updatedBooks = books.map(book => 
            book.id === bookId ? { ...book, available: newAvailability } : book
        );
        setBooks(updatedBooks);
    } catch (error) {
        console.error("Kitap durumunu değiştirirken hata oluştu:", error.message);
    }
};

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ffb278" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome, Admin!</Text>
          <Text style={styles.subText}>Manage the library effectively.</Text>
        </View>
        <TouchableOpacity style={styles.addBookButton} onPress={() => navigation.navigate('AddBook')}>
          <Text style={styles.addBookButtonText}>Add New Book</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchAndCategoryContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search books by title, author, or category..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Image source={searchIcon} style={styles.searchIcon} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.name}
              style={[styles.categoryButton, selectedCategory === category.name && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={[styles.categoryButtonText, selectedCategory === category.name && styles.selectedCategoryButtonText]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bookListSection}>
        <FlatList
          data={paginatedBooks}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
              >
                <Image
                  source={{ uri: item.coverImage }}
                  style={styles.bookCover}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.author}</Text>
                <Text>{item.category}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, item.available ? styles.available : styles.unavailable]}
                onPress={() => toggleAvailability(item.id, item.available)}
              >
                <Text style={styles.toggleButtonText}>
                  {item.available ? 'Mark as Unavailable' : 'Mark as Available'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.pagination}>
          <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 0}>
            <Text style={[styles.pageButton, currentPage === 0 && styles.disabledButton]}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>{currentPage + 1} / {totalPages}</Text>
          <TouchableOpacity onPress={handleNextPage} disabled={currentPage >= totalPages - 1}>
            <Text style={[styles.pageButton, currentPage >= totalPages - 1 && styles.disabledButton]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e99c44', 
    marginBottom: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e99c44', 
  },
  subText: {
    fontSize: 16,
    color: '#e99c44', 
  },
  addBookButton: {
    backgroundColor: '#e99c44', 
    padding: 15,
    borderRadius: 80,
    alignItems: 'center',
  },
  addBookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  searchAndCategoryContainer: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchIcon: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#e99c44', 
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 0.5,
  },
  categoryButton: {
    backgroundColor: '#F3F4F6',
    borderColor: '#e99c44', 
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#e99c44', 
  },
  categoryButtonText: {
    color: '#e99c44', 
  },
  selectedCategoryButtonText: {
    color: '#FFFFFF',
  },
  bookListSection: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: '48%',
  },
  bookCover: {
    width: '100%',
    height: 250,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  available: {
    backgroundColor: '#28A745',
  },
  unavailable: {
    backgroundColor: '#DC3545',
  },
  toggleButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  pageButton: {
    color: '#e99c44', 
  },
  disabledButton: {
    color: '#C0C0C0',
  },
  pageInfo: {
    color: '#e99c44', 
  },
});

export default AdminPage;
