import React, {useState} from 'react';
import {View, Button, TextInput} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    firebase
      .auth()
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
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button onPress={onLogin} title="Login" />
    </View>
  );
};

export default Login;
