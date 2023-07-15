import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const EditDealerScreen = ({route, navigation}) => {
  const {dealer} = route.params;

  const [address1, setAddress1] = useState(
    dealer.Address1 ? dealer.Address1 : '',
  );
  const [address2, setAddress2] = useState(
    dealer.Address2 ? dealer.Address2 : '',
  );
  const [address3, setAddress3] = useState(
    dealer.Address3 ? dealer.Address3 : '',
  );
  const [cashDiscount, setCashDiscount] = useState(
    dealer.CashDiscount ? dealer.CashDiscount.toString() : '',
  );
  const [dealerCode, setDealerCode] = useState(
    dealer.DealerCode ? dealer.DealerCode : '',
  );
  const [dealerName, setDealerName] = useState(dealer.DealerName);
  const [discount, setDiscount] = useState(dealer.Discount.toString());
  const [employee, setEmployee] = useState(dealer.Employee);
  const [hq, setHQ] = useState(dealer.HQ);

  const handleSubmit = async () => {
    if (dealerName === '' || employee === '' || discount === '' || hq === '') {
      Alert.alert(
        'Error',
        'Please fill in all the mandatory fields before submitting',
      );
    } else {
      // Check if dealer name already exists
      if (dealerName !== dealer.DealerName) {
        const snapshot = await firestore()
          .collection('dealers')
          .where('DealerName', '==', dealerName)
          .get();
        if (!snapshot.empty) {
          Alert.alert('Error', 'A dealer with this name already exists.');
          return;
        }
      }
      const newDealer = {
        DealerName: dealerName,
        DealerCode: dealerCode ? dealerCode : '',
        Address1: address1 ? address1 : '',
        Address2: address2 ? address2 : '',
        Address3: address3 ? address3 : '',
        CashDiscount: parseFloat(cashDiscount ? cashDiscount : 0),
        Discount: parseFloat(discount),
        Employee: employee,
        HQ: hq,
      };

      const dealerId = await getDealerIdByName(dealer.DealerName);

      if (!dealerId) {
        console.log(`Product: ${dealer.DealerName} not found.`);
        return;
      }
      // Add the new dealer to the Firestore database
      try {
        await firestore().collection('dealers').doc(dealerId).update(newDealer);
        Alert.alert(
          'Dealer Updated',
          'The dealer details has been successfully updated.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Dealers');
              },
            },
          ],
        );
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Error',
          'Something went wrong while updating the new dealer. Please try again later.',
        );
      }
    }
  };

  const getDealerIdByName = async name => {
    let dealerId = null;
    const snapshot = await firestore()
      .collection('dealers')
      .where('DealerName', '==', name)
      .get();

    if (!snapshot.empty) {
      dealerId = snapshot.docs[0].id;
    }

    return dealerId;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Dealer Name</Text>
      <TextInput
        style={styles.input}
        value={dealerName}
        onChangeText={setDealerName}
        placeholder="Enter Dealer Name"
      />

      <Text style={styles.label}>Dealer Code(optional)</Text>
      <TextInput
        style={styles.input}
        value={dealerCode}
        onChangeText={setDealerCode}
        placeholder="Enter Dealer Code"
      />

      <Text style={styles.label}>Employee</Text>
      <TextInput
        style={styles.input}
        value={employee}
        onChangeText={setEmployee}
        placeholder="Enter Employee"
      />

      <Text style={styles.label}>Discount</Text>
      <TextInput
        style={styles.input}
        value={discount}
        onChangeText={setDiscount}
        placeholder="Enter Discount %"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cash Discount(optional)</Text>
      <TextInput
        style={styles.input}
        value={cashDiscount}
        onChangeText={setCashDiscount}
        placeholder="Enter Cash Discount %"
        keyboardType="numeric"
      />

      <Text style={styles.label}>HQ</Text>
      <TextInput
        style={styles.input}
        value={hq}
        onChangeText={setHQ}
        placeholder="Enter HQ"
      />

      <Text style={styles.label}>Address Line 1(optional)</Text>
      <TextInput
        style={styles.input}
        value={address1}
        onChangeText={setAddress1}
        placeholder="Enter Address Line 1"
      />

      <Text style={styles.label}>Address Line 2(optional)</Text>
      <TextInput
        style={styles.input}
        value={address2}
        onChangeText={setAddress2}
        placeholder="Enter Address Line 2"
      />

      <Text style={styles.label}>Address Line 3(optional)</Text>
      <TextInput
        style={styles.input}
        value={address3}
        onChangeText={setAddress3}
        placeholder="Enter Address Line 3"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 200,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EditDealerScreen;
