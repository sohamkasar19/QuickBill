import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {auth} from '../../firebase';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // The user is signed in
        var user = userCredential.user;
        console.log('User logged in: ', user);
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
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button onPress={onLogin} title="Login" />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>First time user? Register</Text>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  linkText: {
    color: '#0000EE', // Change this to your preferred link color
    textDecorationLine: 'underline',
  },
});

export default Login;
