import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import useStore from '../store';

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  image?: string;
}

export const BookCard = ({
  title,
  author,
  description,
  image,
}: BookCardProps) => {
  const {clickCount, increment} = useStore();

  const handleItemPress = () => {
    increment();
  };

  return (
    <View style={styles.bookItem}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', padding: 5}}>
        {image && <Image source={{uri: image}} style={styles.bookImage} />}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>By: {author}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity style={styles.LogInButton} onPress={handleItemPress}>
          <Text style={styles.ButtonText}>Click me!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FFA621',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 8,
  },
  bookImage: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  LogInButton: {
    backgroundColor: '#000080',
    borderWidth: 3,
    borderColor: '#FFA621',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center', // Centers text inside the button
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
