import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    console.log('Signup started');
    try {
      console.log('Signup started2');
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('FIREBASE_AUTH:', FIREBASE_AUTH);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('Signup started3');
      console.log(response);
      console.log('User created:', response);
      alert('Check your emails!');
    } catch (error) {
      alert('Sign In failed! ' + error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.Container}>
      <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>
        Create your account!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.LogInButton} onPress={() => signUp()}>
        <Text style={styles.ButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#FFA621',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: '80%', // Adjust width as needed
    height: 50, // Adjust height as needed
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow effect
  },

  LogInButton: {
    backgroundColor: 'black',
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
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
