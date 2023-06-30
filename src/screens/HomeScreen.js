import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocument = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();

      setUserName(userDocument.data().name);
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userName}!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Select Party')}>
        <Text style={styles.buttonText}>Create New Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PastOrders')}>
        <Text style={styles.buttonText}>View Past Orders</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
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
