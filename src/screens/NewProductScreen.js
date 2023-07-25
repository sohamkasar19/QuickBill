import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';

const NewProductScreen = ({navigation}) => {
  const [itemName, setItemName] = useState('');
  const [mrp, setMrp] = useState('');
  const [uom, setUom] = useState('');
  const [unit, setUnit] = useState('');
  const [gst, setGst] = useState('');
  const [mrpIncludesGst, setMrpIncludesGst] = useState(false);

  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (itemName === '' || mrp === '' || uom === '' || unit === '') {
      Alert.alert('Error', 'Please fill in all the fields before submitting');
    } else {
      // Check if product name already exists
      const snapshot = await firestore()
        .collection('products')
        .where('ItemName', '==', itemName)
        .get();
      if (!snapshot.empty) {
        Alert.alert('Error', 'A product with this name already exists.');
        return;
      }
      if (mrpIncludesGst && (gst === '' || gst === '0')) {
        Alert.alert('Error', 'Please enter GST value when MRP includes GST');
        return;
      }

      const newProduct = {
        ItemName: itemName,
        MRP: parseFloat(mrp),
        UOM: uom,
        Unit: parseFloat(unit),
        GST: parseFloat(gst ? gst : 0),
        mrpIncludesGst,
      };

      // Add the new product to the Firestore database
      try {
        await firestore().collection('products').add(newProduct);
        Alert.alert(
          'Product Added',
          'The new product has been successfully added.',
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

      <View style={styles.checkboxContainer}>
        <CheckBox value={mrpIncludesGst} onValueChange={setMrpIncludesGst} />
        <Text style={styles.checkboxLabel}>MRP includes GST</Text>
      </View>

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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 18,
  },
});

export default NewProductScreen;
