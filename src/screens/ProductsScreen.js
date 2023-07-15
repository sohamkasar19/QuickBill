import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductsScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

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

  const onEditPress = () => {};

  const onDeletePress = () => {};

  const onAddPress = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Icon name="add-outline" size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Product</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Existing Products</Text>
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
      {selectedProduct ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={onEditPress}>
            <Icon name="pencil-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onDeletePress}>
            <Icon name="trash-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: '20%',
    backgroundColor: '#ecf0f1',
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'white',
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
  addButton: {
    backgroundColor: '#27ae60',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 50,
    marginTop: 20,
    flexDirection: 'row',
  },
  addButtonText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 16,
  },
  buttonText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 14,
  },
});

export default ProductsScreen;
