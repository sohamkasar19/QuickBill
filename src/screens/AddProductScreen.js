import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddProductsScreen = ({route, navigation}) => {
  const [order, setOrder] = useState({
    dealer: '',
    products: [],
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDealerName = async DealerCode => {
      try {
        const querySnapshot = await firestore()
          .collection('dealers')
          .where('DealerCode', '==', DealerCode)
          .get();
        let dealerName = '';
        if (!querySnapshot.empty) {
          const dealerDoc = querySnapshot.docs[0];
          dealerName = dealerDoc.data().DealerName;
          setOrder(prevOrder => ({
            ...prevOrder,
            dealer: dealerName,
          }));
        } else {
          console.log('No such dealer!');
        }
      } catch (error) {
        console.error('Failed to get dealer: ', error);
      }
    };
    const getProducts = async () => {
      const snapshot = await firestore().collection('products').get();
      let productsData = [];
      snapshot.forEach(doc => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProducts(productsData);
    };
    getDealerName(route.params.dealer);
    getProducts();
  }, []);

  const onAddProduct = () => {
    if (!selectedProduct) {
      Alert.alert(
        'No Product Selected',
        'Please select a product before adding.',
      );
      return;
    }
    if (quantity <= 0 || !quantity) {
      Alert.alert(
        'Invalid Quantity',
        'Please enter a valid quantity before adding.',
      );
      return;
    }
    setOrder(prevOrder => {
      const existingProductIndex = prevOrder.products.findIndex(
        product => product.name === selectedProduct,
      );

      if (existingProductIndex >= 0) {
        // Product already exists, so update its quantity
        const updatedProducts = [...prevOrder.products];
        updatedProducts[existingProductIndex].quantity = quantity;
        return {...prevOrder, products: updatedProducts};
      } else {
        // Product does not exist, so add a new one
        return {
          ...prevOrder,
          products: [
            ...prevOrder.products,
            {name: selectedProduct, quantity: quantity},
          ],
        };
      }
    });
    setSelectedProduct(null);
    setQuantity(0);
    console.log(selectedProduct, quantity);
  };

  const onDeleteProduct = productName => {
    setOrder(prevOrder => {
      const updatedProducts = prevOrder.products.filter(
        product => product.name !== productName,
      );
      return {...prevOrder, products: updatedProducts};
    });
  };

  const onOrderSubmit = async () => {
    // your order submit code...
  };

  const onChangeQuantity = text => {
    setQuantity(text.replace(/[^0-9.]/g, ''));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.dealerText}>Dealer: {order.dealer}</Text>
      <DropDownPicker
        open={open}
        value={selectedProduct}
        items={products}
        schema={{
          label: 'ItemName',
          value: 'ItemName',
        }}
        setOpen={setOpen}
        setValue={setSelectedProduct}
        setItems={setProducts}
        searchable={true}
        placeholder="Select a Product"
        loading={loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Quantity Kg/L"
        onChangeText={onChangeQuantity}
        value={quantity}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={onAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onOrderSubmit}>
        <Text style={styles.buttonText}>Submit Order</Text>
      </TouchableOpacity>
      {order.products.length == 0 ? (
        <></>
      ) : (
        <>
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={['Product', 'Qty(Kg/L)', 'MRP', '']}
              style={styles.head}
              textStyle={styles.text}
              flexArr={[2, 1.2, 1, 0.5]} // Adjust this as needed
            />
            {order.products.map((product, index) => {
              const productData = products.find(
                p => p.ItemName === product.name,
              );
              const mrp = productData ? productData.MRP : 'N/A';
              return (
                <TableWrapper
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Cell flex={2} data={product.name} textStyle={styles.text} />
                  <Cell
                    flex={1.2}
                    data={product.quantity.toString()}
                    textStyle={styles.text}
                  />
                  <Cell
                    flex={1}
                    data={mrp.toString()}
                    textStyle={styles.text}
                  />
                  <Cell
                    flex={0.5}
                    data={
                      <TouchableOpacity
                        style={styles.deleteIcon}
                        onPress={() => onDeleteProduct(product.name)}>
                        <FontAwesome name="trash-o" size={24} />
                      </TouchableOpacity>
                    }
                  />
                </TableWrapper>
              );
            })}
          </Table>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dealerText: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  tableBorder: {borderWidth: 2, borderColor: '#c8e1ff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, fontSize: 15},
  deleteIcon: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    backgroundColor: '#3897f1',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default AddProductsScreen;
