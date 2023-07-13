import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddProductsScreen = ({route, navigation}) => {
  const [order, setOrder] = useState({
    dealer: '',
    products: [],
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [freeItems, setFreeItems] = useState(false);
  const [freeSample, setFreeSample] = useState(false);
  const [dealerData, setDealerData] = useState(null);

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
          setDealerData(dealerDoc.data());
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

    const productType = freeItems
      ? 'Free Item'
      : freeSample
      ? 'Free Sample'
      : 'Regular';

    setOrder(prevOrder => {
      const existingProductIndex = prevOrder.products.findIndex(product => {
        product.name === selectedProduct && product.type === productType;
      });

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
            {name: selectedProduct, quantity: quantity, type: productType},
          ],
        };
      }
    });
    setSelectedProduct(null);
    setQuantity();
    console.log(selectedProduct, quantity);
  };

  const onDeleteProduct = (productName, productType) => {
    setOrder(prevOrder => {
      const updatedProducts = prevOrder.products.filter(
        product =>
          !(product.name === productName && product.type === productType),
      );
      return {...prevOrder, products: updatedProducts};
    });
  };

  const onOrderSubmit = async () => {
    if (order.products.length === 0) {
      Alert.alert(
        'No Products',
        'Please add at least one product to the order before reviewing.',
      );
      return;
    }
    let updatedProductList = order.products.map(prod => {
      let productObject = products.find(obj => obj.ItemName === prod.name);
      if (productObject) {
        return {
          product: productObject,
          quantity: prod.quantity,
          type: prod.type,
        };
      } else {
        return prod;
      }
    });
    navigation.navigate('Review Order', {
      order: {
        dealer: dealerData,
        productList: updatedProductList,
      },
    });
  };

  const onChangeQuantity = text => {
    setQuantity(text.replace(/[^0-9.]/g, ''));
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.dealerText}>Dealer: {order.dealer}</Text> */}
      <View style={styles.topContainer}>
        <Text style={styles.dealerText}>Dealer: {order.dealer}</Text>
        <TouchableOpacity style={styles.submitButton} onPress={onOrderSubmit}>
          <Text style={styles.buttonText}>Review</Text>
          <MaterialIcons name="navigate-next" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

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
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={freeItems}
          onValueChange={newValue => {
            setFreeItems(newValue);
            if (newValue) {
              setFreeSample(false);
            }
          }}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxlabel}>Free Items</Text>
        {/* </View>
      <View style={styles.checkboxContainer}> */}
        <CheckBox
          value={freeSample}
          onValueChange={newValue => {
            setFreeSample(newValue);
            if (newValue) {
              setFreeItems(false);
            }
          }}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxlabel}>Free Sample Not for Sale</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={onOrderSubmit}>
        <Text style={styles.buttonText}>Submit Order</Text>
      </TouchableOpacity> */}
      {order.products.length === 0 ? (
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
                    data={
                      product.type === 'Regular' ? mrp.toString() : product.type
                    }
                    textStyle={styles.text}
                  />
                  <Cell
                    flex={0.5}
                    data={
                      <TouchableOpacity
                        style={styles.deleteIcon}
                        onPress={() =>
                          onDeleteProduct(product.name, product.type)
                        }>
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealerText: {
    fontSize: 16,
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
  submitButton: {
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#3897f1',
    padding: 8,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center',
    color: '#3897f1',
  },
  checkboxlabel: {
    margin: 8,
    fontSize: 15,
  },
});

export default AddProductsScreen;
