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
import {useIsFocused} from '@react-navigation/native';

const DealersScreen = ({navigation}) => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSelectedDealer(null);
      getDealers();
    }
  }, [isFocused]);

  const getDealers = async () => {
    const snapshot = await firestore().collection('dealers').get();
    let dealersData = [];
    snapshot.forEach(doc => {
      dealersData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setDealers(dealersData);
  };

  const onEditPress = () => {
    const selectedDealerObj = dealers.find(
      deal => deal.DealerName === selectedDealer,
    );
    setSelectedDealer(null);
    navigation.navigate('Edit Dealer', {dealer: selectedDealerObj});
  };

  const onDeletePress = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this dealer?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteDealer(selectedDealer);
            } catch (error) {
              console.error('Failed to delete product: ', error);
              Alert.alert('Error', 'Failed to delete product');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const deleteDealer = async dealerName => {
    // Query the collection to find the document id of the product with itemName
    const snapshot = await firestore()
      .collection('dealers')
      .where('DealerName', '==', dealerName)
      .get();

    if (snapshot.empty) {
      Alert.alert('Error', 'No matching dealer found.');
      return;
    }

    // Get the document id of the matching product
    const docId = snapshot.docs[0].id;

    // Delete the document from Firestore
    firestore()
      .collection('dealers')
      .doc(docId)
      .delete()
      .then(() => {
        // Remove the product from the state
        setDealers(dealerList => {
          const index = dealerList.findIndex(
            dealer => dealer.DealerName === dealerName,
          );
          if (index !== -1) {
            dealerList.splice(index, 1);
            return [...dealerList];
          }
          return dealerList;
        });
        setSelectedDealer(null);
        Alert.alert(
          'Dealer Deleted',
          'The dealer has been successfully deleted.',
        );
      })
      .catch(error => {
        Alert.alert(
          'Error',
          'Something went wrong while deleting the dealer. Please try again later.',
        );
      });
  };

  const onAddPress = () => {
    navigation.navigate('New Dealer');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Icon name="add-outline" size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Dealer</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Existing Dealers</Text>
      <DropDownPicker
        open={open}
        value={selectedDealer}
        items={dealers}
        schema={{
          label: 'DealerName',
          value: 'DealerName',
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
      {selectedDealer ? (
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

export default DealersScreen;
