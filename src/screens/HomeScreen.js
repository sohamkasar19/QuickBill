import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocument = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();

      setUserName(userDocument.data().name);
    };
    const fetchRole = async () => {
      const user = auth().currentUser;
      if (user) {
        const doc = await firestore().collection('users').doc(user.uid).get();
        setRole(doc.data().role);
      }
    };
    fetchRole();
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userName}!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Select Dealer')}>
        <Text style={styles.buttonText}>Create New Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Past Orders')}>
        <Text style={styles.buttonText}>View Past Orders</Text>
      </TouchableOpacity>
      {role === 'admin' && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Products')}>
            <Text style={styles.buttonText}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Dealers')}>
            <Text style={styles.buttonText}>Dealers</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => auth().signOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: '25%',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3897f1',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#eb4d4b',
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

export default HomeScreen;
