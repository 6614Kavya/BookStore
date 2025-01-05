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
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

export const Login = ({route}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('Home', {userName: username});
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  useEffect(() => {
    setUsername(route.params);
  }, []);
  return (
    <KeyboardAvoidingView style={styles.Container}>
      <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>
        Sign In to your Account!
      </Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        onChangeText={text => setUsername(text)}
      /> */}
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
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.LogInButton}
        onPress={() => {
          signIn();
        }}>
        <Text style={styles.ButtonText}>Log In</Text>
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
  error: {color: 'red', alignItems: 'flex-start', marginBottom: 12},
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
