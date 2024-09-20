import axios from 'axios';


const API_URL = 'http://192.168.1.39:8080/api';

// Kitapları getiren fonksiyon
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw error;
  }
};

// Kitap ekleyen fonksiyon
export const addBook = async (book) => {
  try {
    const response = await axios.post(`${API_URL}/books`, book);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error.message);
    throw error;
  }
};