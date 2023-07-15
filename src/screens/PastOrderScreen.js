import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OrderItem from '../components/OrderItem';

function PastOrdersScreen({navigation}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);

    const user = auth().currentUser;
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    const role = userDoc.data().role;

    if (role === 'admin') {
      const querySnapshot = await firestore()
        .collection('orders')
        .orderBy('created_at', 'desc')
        .get();
      const ordersData = querySnapshot.docs.map(doc => doc.data());
      setOrders(ordersData);
    } else {
      const querySnapshot = await firestore()
        .collection('orders')
        .where('created_by', '==', user.uid)
        .orderBy('created_at', 'desc')
        .get();
      if (querySnapshot) {
        const ordersData = querySnapshot.docs.map(doc => doc.data());
        setOrders(ordersData);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchOrders);

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {orders.length > 0 ? (
        orders.map(order => <OrderItem key={order.orderId} order={order} />)
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>No past orders found.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: '40%',
  },
  messageText: {
    fontSize: 25,
    color: '#333',
    textAlign: 'center',
  },
});

export default PastOrdersScreen;
