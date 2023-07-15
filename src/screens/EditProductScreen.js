import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';

const EditProductScreen = ({route, navigation}) => {
  const {product} = route.params;

  const [itemName, setItemName] = useState(product.ItemName);
  const [mrp, setMrp] = useState(product.MRP.toString());
  const [uom, setUom] = useState(product.UOM);
  const [unit, setUnit] = useState(product.Unit.toString());
  const [gst, setGst] = useState(product.GST ? product.GST.toString() : '0');

  const [open, setOpen] = useState(false);

  console.log(product);

  const handleSubmit = async () => {
    if (itemName === '' || mrp === '' || uom === '' || unit === '') {
      Alert.alert('Error', 'Please fill in all the fields before submitting');
    } else {
      // Check if product name already exists
      if (itemName !== product.ItemName) {
        const snapshot = await firestore()
          .collection('products')
          .where('ItemName', '==', itemName)
          .get();
        if (!snapshot.empty) {
          Alert.alert('Error', 'A product with this name already exists.');
          return;
        }
      }

      const newProduct = {
        ItemName: itemName,
        MRP: parseFloat(mrp),
        UOM: uom,
        Unit: parseFloat(unit),
        GST: parseFloat(gst ? gst : 0),
      };

      const productId = await getProductIdByName(product.ItemName);

      if (!productId) {
        console.log(`Product: ${product.ItemName} not found.`);
        return;
      }

      try {
        await firestore()
          .collection('products')
          .doc(productId)
          .update(newProduct);
        Alert.alert(
          'Product Edited',
          'The product details has been successfully edited.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Products');
              },
            },
          ],
        );
        // Clear the form
        setItemName('');
        setMrp('');
        setUom(null);
        setUnit('');
        setGst('');
      } catch (error) {
        Alert.alert(
          'Error',
          'Something went wrong while adding the new product. Please try again later.',
        );
      }
    }
  };

  const getProductIdByName = async productName => {
    let productId = null;
    const snapshot = await firestore()
      .collection('products')
      .where('ItemName', '==', productName)
      .get();

    if (!snapshot.empty) {
      productId = snapshot.docs[0].id;
    }

    return productId;
  };

  const updateProductDetails = async (originalProductName, newProductData) => {
    // Get the product ID by product name
    const productId = await getProductIdByName(originalProductName);

    if (!productId) {
      console.log(`Product: ${originalProductName} not found.`);
      return;
    }

    // Define a reference to the document you want to update
    const productRef = firestore().collection('products').doc(productId);

    // Use the update method on the document reference to update the document
    await productRef
      .update(newProductData)
      .then(() => console.log('Product updated successfully.'))
      .catch(error => console.log(`Error updating product: ${error}`));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter Item Name"
      />

      <Text style={styles.label}>MRP</Text>
      <TextInput
        style={styles.input}
        value={mrp}
        onChangeText={setMrp}
        placeholder="Enter MRP"
        keyboardType="numeric"
      />

      <Text style={styles.label}>UOM</Text>
      <DropDownPicker
        open={open}
        items={[
          {label: 'KGS', value: 'KGS'},
          {label: 'LTR', value: 'LTR'},
        ]}
        // defaultValue={uom}
        value={uom}
        // containerStyle={{height: 40}}
        style={styles.input}
        // itemStyle={{
        //   justifyContent: 'flex-start',
        // }}
        setOpen={setOpen}
        // dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => setUom(item.value)}
        setValue={setUom}
      />

      <Text style={styles.label}>Unit</Text>
      <TextInput
        style={styles.input}
        value={unit}
        onChangeText={setUnit}
        placeholder="Enter Unit"
        keyboardType="numeric"
      />

      <Text style={styles.label}>GST(optional)</Text>
      <TextInput
        style={styles.input}
        value={gst}
        onChangeText={setGst}
        placeholder="Enter GST"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  label: {
    fontSize: 18,
    // fontWeight: 'bold',
    // marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#3897f1',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EditProductScreen;
