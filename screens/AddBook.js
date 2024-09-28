
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addBook } from '../api'; 

const AddBook = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [isbn, setIsbn] = useState('');
    const [category, setCategory] = useState('');
    const [available, setAvailable] = useState(true);
    const [coverImage, setCoverImage] = useState('');

    const handleAddBook = async () => {
        const book = {
            title,
            author,
            publishedDate,
            isbn,
            category,
            available,
            coverImage,
        };

        try {
            await addBook(book);
            navigation.navigate('AdminPage'); 
        } catch (error) {
            console.error("Kitap eklerken hata:", error.message);
            alert("Kitap eklerken bir hata oluştu.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Book</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Author"
                value={author}
                onChangeText={setAuthor}
            />
            <TextInput
                style={styles.input}
                placeholder="Published Date (YYYY-MM-DD)"
                value={publishedDate}
                onChangeText={setPublishedDate}
            />
            <TextInput
                style={styles.input}
                placeholder="ISBN"
                value={isbn}
                onChangeText={setIsbn}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                style={styles.input}
                placeholder="Cover Image URL"
                value={coverImage}
                onChangeText={setCoverImage}
            />
            <Button title="Add Book" onPress={handleAddBook} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#e99c44',
    },
    input: {
        height: 40,
        borderColor: '#e99c44',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default AddBook;
