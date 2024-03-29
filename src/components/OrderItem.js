import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

function OrderItem({order}) {
  const navigation = useNavigation();

  const createdAt = new Date(order.created_at.seconds * 1000).toLocaleString(
    'en-IN',
    {timeZone: 'Asia/Kolkata'},
  );

  const onItemPress = () => {
    navigation.navigate('Order Details', {order: order});
  };

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View style={styles.container}>
        <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
        <Text style={styles.dealerName}>
          Dealer Name: {order.dealer.DealerName}
        </Text>
        <Text style={styles.date}>Created At: {createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    borderColor: '#c8c8c8',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dealerName: {
    fontSize: 16,
    color: '#444',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#3897f1',
  },
  deleteButton: {
    backgroundColor: '#eb4d4b',
  },
  buttonText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 14,
  },
});

export default OrderItem;
