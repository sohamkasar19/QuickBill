import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OrderItem from '../components/OrderItem';

function PastOrdersScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth().currentUser;
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const role = userDoc.data().role;

      if (role === 'admin') {
        const querySnapshot = await firestore().collection('orders').get();
        const ordersData = querySnapshot.docs.map(doc => doc.data());
        setOrders(ordersData);
      } else {
        const querySnapshot = await firestore()
          .collection('orders')
          .where('created_by', '==', user.uid)
          .get();
        const ordersData = querySnapshot.docs.map(doc => doc.data());
        setOrders(ordersData);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView>
      <Text>Past Orders</Text>
      {orders.map(order => (
        <OrderItem key={order.orderId} order={order} />
      ))}
    </ScrollView>
  );
}

export default PastOrdersScreen;
