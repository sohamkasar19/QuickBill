import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import firebase from 'firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // The user has been registered and is signed in!
        var user = userCredential.user;
        console.log('User registered: ', user);
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={onRegister} />
    </View>
  );
};

export default Register;
