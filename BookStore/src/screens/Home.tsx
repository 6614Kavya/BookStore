import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BookCard} from '../components/BookCard';
import useStore from '../store';

export const Home = ({route}) => {
  const [userName, setUserName] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {clickCount} = useStore();

  const getBooks = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=10',
      );
      // Filter only books with valid images
      const bookData = response.data.items
        .filter(item => item.volumeInfo?.imageLinks?.thumbnail)
        .map(item => ({
          id: item.id,
          title: item.volumeInfo?.title || 'No Title Available',
          authors: item.volumeInfo?.authors?.join(', ') || 'Unknown Author',
          description:
            item.volumeInfo?.description || 'No description available',
          image: item.volumeInfo.imageLinks.thumbnail,
        }));
      setItems(bookData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const {userName: name} = route.params || {}; // Destructure safely
    setUserName(name || 'Guest');
    getBooks();
  }, []);

  useEffect(() => {
    console.log(items); // Log whenever items are updated
  }, [items]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.floatingButton}>
        <Text style={styles.buttonText}>{clickCount}</Text>
      </View>
      <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>
        Hi {userName}!
      </Text>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <BookCard
            title={item.title}
            author={item.authors}
            description={item.description}
            image={item.image}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000080',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFA621',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#000080',
    fontWeight: 'bold',
  },
});
