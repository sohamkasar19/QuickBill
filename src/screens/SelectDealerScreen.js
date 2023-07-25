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
import auth from '@react-native-firebase/auth';

const SelectDealerScreen = ({navigation}) => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);

  const onSubmit = data => {
    if (selectedDealer === null) {
      Alert.alert(
        'No Dealer Selected',
        'Please select a dealer before proceeding.',
      );
      return;
    }
    navigation.navigate('Add Products', {dealer: selectedDealer});
    // console.log(selectedDealer);
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDealers = async () => {
      const snapshot = await firestore().collection('dealers').get();
      let dealersData = [];
      snapshot.forEach(doc => {
        dealersData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const user = await getRole();
      if (user.role === 'admin') {
        setDealers(dealersData);
      } else {
        const filteredDealers = dealersData.filter(dealer => {
          return dealer.Employee.toLowerCase() === user.name.toLowerCase();
        });
        setDealers(filteredDealers);
      }
    };
    getDealers();
  }, []);

  const getRole = async () => {
    const user = auth().currentUser;
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    return userDoc.data();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dealer</Text>
      <DropDownPicker
        open={open}
        value={selectedDealer}
        items={dealers}
        schema={{
          label: 'DealerName',
          value: 'DealerCode',
        }}
        setOpen={setOpen}
        setValue={setSelectedDealer}
        setItems={setDealers}
        searchable={true}
        placeholder="Select a Dealer"
        loading={loading}
        searchTextInputProps={{
          autoFocus: true,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: '30%',
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
  button: {
    backgroundColor: '#3897f1',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SelectDealerScreen;
