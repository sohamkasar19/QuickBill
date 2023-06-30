import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// import {auth} from '../../firebase';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onRegister = () => {
    // Check for empty fields
    if (email === '' || name === '' || password === '') {
      alert('Please fill all fields');
      return;
    }

    // Check for valid email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    // Check for password length
    if (password.length < 6) {
      alert('Password should be at least 6 characters');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // The user has been registered and is signed in!
        var user = userCredential.user;
        firestore().collection('users').doc(userCredential.user.uid).set({
          email: userCredential.user.email,
          role: 'user',
          name: name,
        });
        Alert.alert(
          'Registration Successful',
          'You are now registered and logged in',
          [{text: 'OK', onPress: () => navigation.navigate('Home')}],
        );
        console.log('User registered: ', user.email);
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#3897f1',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Register;
