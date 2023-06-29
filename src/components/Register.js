import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

import {auth} from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // The user has been registered and is signed in!
        var user = userCredential.user;
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
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button onPress={onRegister} title="Register" />
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
});

export default Register;
