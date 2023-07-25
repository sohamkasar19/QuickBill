import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {generateHTMLWhenMRPWithoutGST} from '../util/GenerateHTMLWhenMRPWithoutGST';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {generateOrderId} from '../util/GenerateOrderId';
import RNFS from 'react-native-fs';
import {generateHTMLWhenMRPWithGST} from '../util/GenerateHTMLWhenMRPWithGST';

const OrderReviewScreen = ({route, navigation}) => {
  const {order} = route.params;

  const submitOrder = async () => {
    try {
      const orderId = order.orderId ? order.orderId : generateOrderId();

      const orderRef = firestore().collection('orders').doc(orderId);

      orderRef.set(
        {
          orderId: orderId,
          dealer: order.dealer,
          products: order.productList,
          created_by: auth().currentUser.uid,
          created_at: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );

      // createPDF(orderId);
      const [productsWithGST, productsWithoutGST] = splitProducts(
        order.productList,
      );
      let destination1 = 'NA',
        destination2 = 'NA';
      if (productsWithGST.length > 0) {
        destination1 = await createPDF(orderId, productsWithGST, 'WithGST');
      }
      if (productsWithoutGST.length > 0) {
        destination2 = await createPDF(
          orderId,
          productsWithoutGST,
          'WithoutGST',
        );
      }

      Alert.alert(
        'Success',
        `PDF saved to \n${destination1 === 'NA' ? '' : destination1} \n${
          destination2 === 'NA' ? '' : destination2
        }`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ],
      );
    } catch (error) {
      console.error('Failed to save order with error: ', error);
      Alert.alert('Error', 'Failed to save order');
    }
  };

  const splitProducts = products => {
    const productsWithGST = [];
    const productsWithoutGST = [];

    for (let product of products) {
      if (product.product.mrpIncludesGst) {
        productsWithGST.push(product);
      } else {
        productsWithoutGST.push(product);
      }
    }

    return [productsWithGST, productsWithoutGST];
  };

  const createPDF = async (orderId, products, gstFlag) => {
    try {
      let html = '';
      if (gstFlag === 'WithoutGST') {
        html = await generateHTMLWhenMRPWithoutGST(orderId, {
          ...order,
          productList: products,
        });
      }
      if (gstFlag === 'WithGST') {
        html = await generateHTMLWhenMRPWithGST(orderId, {
          ...order,
          productList: products,
        });
      }

      const currentDate = new Date();
      const dateStr = currentDate.toISOString().replace(/[:.]/g, '-');
      const FileName = `order_${order.dealer.DealerName}_${dateStr}_${gstFlag}`;

      const options = {
        html,
        fileName: FileName,
        directory: 'Orders',
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      const destinationPath = RNFS.DownloadDirectoryPath;

      const destinationFile = destinationPath + '/' + FileName + '.pdf';
      RNFS.copyFile(pdf.filePath, destinationFile)
        .then(result => {
          // Delete a file on the project path using RNFS.unlink
          return (
            RNFS.unlink(pdf.filePath)
              .then(() => {
                console.log('FILE DELETED');
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch(err => {
                console.log(err.message);
              })
          );
        })
        .catch(err => {
          console.log('err', err);
        });
      // Alert.alert('Success', `PDF saved to ${destinationFile}`, [
      //   {
      //     text: 'OK',
      //     onPress: () => {
      //       navigation.navigate('Home');
      //     },
      //   },
      // ]);
      console.log(pdf.filePath);

      return destinationFile;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.dealerText}>Dealer: {order.dealer.DealerName}</Text>
      {order.productList.length === 0 ? (
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
            {order.productList.map((productData, index) => {
              const mrp = productData.product ? productData.product.MRP : 'N/A';
              return (
                <TableWrapper key={index} style={styles.tableWrapper}>
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

      <TouchableOpacity style={styles.button} onPress={submitOrder}>
        <Text style={styles.buttonText}>Create Order</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#3897f1',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  tableWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OrderReviewScreen;
