import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.Container}>
      <Text style={{fontSize: 36, color: 'white', textAlign: 'center'}}>
        Keep Reading
      </Text>
      <Text style={{fontSize: 36, color: 'white', textAlign: 'center'}}>
        You'll fall in love!
      </Text>
      <TouchableOpacity
        style={styles.SignUpButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.ButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.LogInButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.ButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#000080',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignUpButton: {
    backgroundColor: '#FFA621',
    width: '100%', // Button stretches to full width of the container
    maxWidth: 300, // Optional: limits the maximum width of the button
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center', // Centers text inside the button
  },
  LogInButton: {
    backgroundColor: '#000080',
    borderWidth: 3,
    borderColor: '#FFA621',
    width: '100%', // Button stretches to full width of the container
    maxWidth: 300, // Optional: limits the maximum width of the button
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center', // Centers text inside the button
  },
  ButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
