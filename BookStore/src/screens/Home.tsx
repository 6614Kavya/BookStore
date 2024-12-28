import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export const Home = () => {
  const [items, setItems] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get(
        'https://openlibrary.org/search.json?q=programming',
      );
      const bookData = response.data.docs.map(book => ({
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown',
        description: book.first_sentence || 'No description available',
      }));
      setItems(bookData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    console.log(items); // Log whenever items are updated
  }, [items]);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
