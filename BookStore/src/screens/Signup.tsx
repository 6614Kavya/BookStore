import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    general: '',
  });
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const validateInputs = () => {
    let isValid = true;
    let newErrors = {
      username: '',
      email: '',
      password: '',
      general: '',
    };

    if (!username.trim()) {
      newErrors.username = 'Username cannot be empty.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const signUp = async () => {
    if (!validateInputs()) return;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('User created:', response);
      // alert('Account created! Check your email for verification.');
      navigation.navigate('Login', {userName: username});
    } catch (error: any) {
      setErrors({general: error.message});
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
        onChangeText={text => {
          setUsername(text);
          setErrors({...errors, username: ''}); // Clear error on input change
        }}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={text => {
          setEmail(text);
          setErrors({...errors, email: ''}); // Clear error on input change
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
          setErrors({...errors, password: ''}); // Clear error on input change
        }}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <TouchableOpacity style={styles.LogInButton} onPress={signUp}>
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
    width: '80%',
    height: 50,
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
    elevation: 3,
  },
  LogInButton: {
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: '#FFA621',
    width: '100%',
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'left',
    width: '80%',
    marginTop: -5,
    marginBottom: 10,
  },
});
