import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

const AddProductsScreen = ({route, navigation}) => {
  const {control, handleSubmit, reset} = useForm();
  const [order, setOrder] = useState({
    party: route.params.party,
    products: [],
  });

  const onSubmit = data => {
    setOrder(prevOrder => ({
      ...prevOrder,
      products: [...prevOrder.products, data],
    }));

    reset();
  };

  const onOrderSubmit = async () => {
    // try {
    //   await firestore().collection('orders').add(order);
    //   console.log('Order added!');
    //   setOrder({party: '', products: []});
    //   navigation.navigate('Home');
    // } catch (error) {
    //   console.error('Failed to add order: ', error);
    // }
  };

  return (
    <ScrollView style={styles.container}>
      {order.products.map((product, index) => (
        <View key={index} style={styles.productContainer}>
          <Text style={styles.text}>Product: {product.product}</Text>
          <Text style={styles.text}>Quantity: {product.quantity}</Text>
        </View>
      ))}
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Product"
          />
        )}
        name="product"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Quantity"
            keyboardType="numeric"
          />
        )}
        name="quantity"
        defaultValue=""
      />
      <Button title="Add Product" onPress={handleSubmit(onSubmit)} />
      <Button title="Submit Order" onPress={onOrderSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default AddProductsScreen;
