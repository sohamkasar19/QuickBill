import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const OrderDetailsScreen = ({route, navigation}) => {
  const {order} = route.params;

  const onEditPress = () => {
    navigation.navigate('Add Products', {order: order});
  };

  const onDeletePress = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await firestore()
                .collection('orders')
                .doc(order.orderId)
                .delete();

              Alert.alert('Success', 'Order has been deleted successfully');
              navigation.navigate('Past Orders');
            } catch (error) {
              console.error('Failed to delete order: ', error);
              Alert.alert('Error', 'Failed to delete order');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.dealerText}>Dealer: {order.dealer.DealerName}</Text>
      {order.products.length === 0 ? (
        <></>
      ) : (
        <>
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={['Product', 'Qty(Kg/L)', 'MRP']}
              style={styles.head}
              textStyle={styles.text}
              flexArr={[2.5, 1.1, 1]}
            />
            {order.products.map((productData, index) => {
              const mrp = productData.product ? productData.product.MRP : 'N/A';
              return (
                <TableWrapper
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Cell
                    flex={2.5}
                    data={productData.product.ItemName}
                    textStyle={styles.text}
                  />
                  <Cell
                    flex={1.1}
                    data={productData.quantity.toString()}
                    textStyle={styles.text}
                  />
                  <Cell
                    flex={1}
                    data={
                      productData.type === 'Regular'
                        ? mrp.toString()
                        : productData.type
                    }
                    textStyle={styles.text}
                  />
                </TableWrapper>
              );
            })}
          </Table>
        </>
      )}

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dealerText: {
    fontSize: 16,
    marginBottom: 20,
  },
  tableBorder: {borderWidth: 2, borderColor: '#c8e1ff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, fontSize: 15},
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
  buttonText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 14,
  },
});

export default OrderDetailsScreen;
