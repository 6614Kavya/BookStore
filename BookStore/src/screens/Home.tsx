import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BookCard} from '../components/BookCard';

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
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <BookCard
            title={item.title}
            author={item.author}
            description={item.description}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000080',
  },
});
