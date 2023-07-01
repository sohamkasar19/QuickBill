import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Icon, SearchBar} from 'react-native-elements';

const DealersScreen = () => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore().collection('dealers').get();
      setDealers(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    };

    fetchData();
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      setDealers(dealers.filter(dealer => dealer.name.includes(query)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search Dealers"
          onChangeText={handleSearch}
          value={searchQuery}
          containerStyle={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>
      {/* {dealers.map(dealer => (
        <TouchableOpacity
          key={dealer.id}
          style={styles.dealerButton}
          onPress={() => setSelectedDealer(dealer)}>
          <Text style={styles.dealerButtonText}>{dealer.name}</Text>
        </TouchableOpacity>
      ))} */}
      {selectedDealer && (
        <View style={styles.actionsContainer}>
          <TextInput style={styles.input} value={selectedDealer.name} />
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              /* Handle edit */
            }}>
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              /* Handle delete */
            }}>
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    color: 'black',
  },
  dealerButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dealerButtonText: {
    color: 'black',
    fontSize: 16,
  },
  actionsContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  actionButton: {
    backgroundColor: '#999',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DealersScreen;
