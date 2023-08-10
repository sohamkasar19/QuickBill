import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import {auth} from '../../firebase';
import auth from '@react-native-firebase/auth';
import Dialog from 'react-native-dialog';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const onLogin = () => {
    // Check for empty fields
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Check for valid email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    // Check for password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // The user is signed in
        var user = userCredential.user;
        console.log('User logged in: ', user.email);
        navigation.navigate('Home');
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  };

  const onForgotPassword = () => {
    setDialogVisible(true);
  };

  const onSubmitEmail = () => {
    auth()
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setDialogVisible(false);
        Alert.alert(
          'Success',
          'Password reset link has been sent to your email.',
        );
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', error.message);
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
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>First time user? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Password Reset</Dialog.Title>
        <Dialog.Description>
          Enter your email to receive a password reset link.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Email"
          onChangeText={text => setResetEmail(text)}
          value={resetEmail}
        />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Submit" onPress={onSubmitEmail} />
      </Dialog.Container>
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
  linkText: {
    color: '#0000EE', // Change this to your preferred link color
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#3897f1',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Login;
