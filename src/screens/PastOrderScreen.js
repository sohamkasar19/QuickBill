import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OrderItem from '../components/OrderItem';

function PastOrdersScreen({navigation}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const ordersLimit = 10;

  const fetchOrders = async () => {
    setLoading(true);

    const user = auth().currentUser;
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    const role = userDoc.data().role;

    let query = firestore()
      .collection('orders')
      .orderBy('created_at', 'desc')
      .limit(ordersLimit);

    if (role !== 'admin') {
      query = query.where('created_by', '==', user.uid);
    }

    const querySnapshot = await query.get();
    const ordersData = querySnapshot.docs.map(doc => doc.data());
    setOrders(ordersData);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  const fetchMoreOrders = async () => {
    if (lastVisible && !isMoreLoading) {
      setIsMoreLoading(true);

      const user = auth().currentUser;
      let query = firestore()
        .collection('orders')
        .orderBy('created_at', 'desc')
        .startAfter(lastVisible)
        .limit(ordersLimit);

      if (user.role !== 'admin') {
        query = query.where('created_by', '==', user.uid);
      }

      const querySnapshot = await query.get();
      if (!querySnapshot.empty) {
        const newOrders = querySnapshot.docs.map(doc => doc.data());
        setOrders([...orders, ...newOrders]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setLastVisible(null);
      }
      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchOrders);
    return unsubscribe;
  }, [navigation]);

  const renderFooter = () => {
    if (!isMoreLoading) return true;
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{marginVertical: 20}}
      />
    );
  };

  const handleLoadMore = () => {
    if (lastVisible) {
      fetchMoreOrders();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}>
        {orders.map(order => (
          <OrderItem
            key={order.orderId}
            order={order}
            navigation={navigation}
          />
        ))}
        {renderFooter()}
      </ScrollView>
      {isMoreLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
