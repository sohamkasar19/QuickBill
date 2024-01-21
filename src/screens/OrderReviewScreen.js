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
import storage from '@react-native-firebase/storage';

const OrderReviewScreen = ({route, navigation}) => {
  const {order} = route.params;

  const submitOrder = async () => {
    try {
      const orderId = order.orderId ? order.orderId : generateOrderId();

      await deleteOldPDFs(orderId);

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
      let pdfDetailsWithGST = null,
        pdfDetailsWithoutGST = null;

      if (productsWithGST.length > 0) {
        pdfDetailsWithGST = await createPDF(
          orderId,
          productsWithGST,
          'WithGST',
        );
        const pdfDetails = await uploadPDF(pdfDetailsWithGST.originalFilePath);
        await savePDFReferenceInFirestore(pdfDetails, orderId, 'WithGST');
        await RNFS.unlink(pdfDetailsWithGST.originalFilePath);
      }
      if (productsWithoutGST.length > 0) {
        pdfDetailsWithoutGST = await createPDF(
          orderId,
          productsWithoutGST,
          'WithoutGST',
        );
        const pdfDetails = await uploadPDF(
          pdfDetailsWithoutGST.originalFilePath,
        );
        await savePDFReferenceInFirestore(pdfDetails, orderId, 'WithoutGST');
        await RNFS.unlink(pdfDetailsWithoutGST.originalFilePath);
      }

      Alert.alert(
        'Success',
        `PDF saved to \n${
          pdfDetailsWithGST ? pdfDetailsWithGST.destinationFile : ''
        } \n${
          pdfDetailsWithoutGST ? pdfDetailsWithoutGST.destinationFile : ''
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

  async function deleteOldPDFs(orderId) {
    try {
      const orderRef = firestore().collection('orders').doc(orderId);

      const orderDoc = await orderRef.get();
      console.log(orderId);
      if (orderDoc.exists) {
        const orderData = orderDoc.data();

        if (orderData.pdfs) {
          // Loop through each key in the pdfs map
          for (const key in orderData.pdfs) {
            const pdf = orderData.pdfs[key];
            if (pdf && pdf.storagePath) {
              await storage().ref(pdf.storagePath).delete();
            }
          }

          // Optionally, update the Firestore document to remove the PDF references
          await orderRef.update({pdfs: firestore.FieldValue.delete()});

          console.log('Old PDFs deleted');
        }
      }
    } catch (error) {
      console.error('Error deleting old PDFs:', error);
      throw new Error('Failed to delete old PDFs');
    }
  }

  async function savePDFReferenceInFirestore(pdfDetails, orderId, gstFlag) {
    try {
      const orderRef = firestore().collection('orders').doc(orderId);

      // PDF entry
      const pdfEntry = {
        url: pdfDetails.downloadURL,
        storagePath: pdfDetails.storagePath,
      };

      // Prepare the update object
      let updateData = {};
      updateData[`${gstFlag}`] = pdfEntry;

      // Update the order with the new PDF entry
      await orderRef.set({pdfs: updateData}, {merge: true});
    } catch (error) {
      console.error('Error saving PDF reference in Firestore:', error);
      throw new Error('Failed to save PDF reference in Firestore');
    }
  }

  async function uploadPDF(filePath) {
    // Get the current UTC date and time
    const now = new Date();

    // Convert to IST (UTC + 5:30)
    const istTime = new Date(now.getTime() + 330 * 60 * 1000); // 330 minutes for UTC+5:30

    // Format the date
    const formattedDate = `${istTime.getFullYear()}-${
      istTime.getMonth() + 1
    }-${istTime.getDate()}`;

    // Extract the filename
    const filename = filePath.substring(filePath.lastIndexOf('/') + 1);

    // Set the path with date-based folder
    const storagePath = `pdfs/${formattedDate}/${filename}`;

    // Upload file to Firebase Storage
    const uploadTask = storage().ref(storagePath).putFile(filePath);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {
          // snapshot to show upload progress
        },
        error => {
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve({downloadURL, storagePath});
          });
        },
      );
    });
  }

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

  // async function savePDFReferenceInFirestore(downloadURL, orderId, gstFlag) {
  //   try {
  //     const orderRef = firestore().collection('orders').doc(orderId);

  //     // New PDF entry
  //     const newPDFEntry = {
  //       url: downloadURL,
  //       gstFlag: gstFlag,
  //     };

  //     // Atomically add a new PDF entry to the 'pdfs' array field
  //     await orderRef.update({
  //       pdfs: firestore.FieldValue.arrayUnion(newPDFEntry),
  //     });
  //   } catch (error) {
  //     console.error('Error saving PDF reference in Firestore:', error);
  //     throw new Error('Failed to save PDF reference in Firestore');
  //   }
  // }

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
      // Convert to IST (UTC + 5:30)
      const istTime = new Date(currentDate.getTime() + 330 * 60 * 1000); // 330 minutes for UTC+5:30

      // Format the date to YYYY-MM-DD
      const dateStr = `${istTime.getFullYear()}-${(
        '0' +
        (istTime.getMonth() + 1)
      ).slice(-2)}-${('0' + istTime.getDate()).slice(-2)}`;
      const FileName = `order_${order.dealer.DealerName}_${dateStr}_${gstFlag}`;

      const options = {
        html,
        fileName: FileName,
        directory: 'Orders',
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      const destinationPath = RNFS.DownloadDirectoryPath;

      const destinationFile = destinationPath + '/' + FileName + '.pdf';

      await RNFS.copyFile(pdf.filePath, destinationFile);

      // After the file has been successfully copied, delete the original file
      // await RNFS.unlink(pdf.filePath);

      console.log('PDF saved to', destinationFile);

      // Return the paths
      return {
        destinationFile: destinationFile,
        originalFilePath: pdf.filePath,
      };
    } catch (error) {
      console.error(error);
      throw error; // Throw the error so that the caller knows something went wrong
    }
  };

  async function handleOrderPDF(orderId, htmlContent) {
    const {destinationFile, originalFilePath} = await createPDF(htmlContent); // Step 1: Generate PDF

    const downloadURL = await uploadPDF(originalFilePath); // Step 2: Upload PDF to Firebase

    await savePDFReferenceInFirestore(downloadURL, orderId); // Step 3: Save reference in Firestore

    await RNFS.unlink(originalFilePath); // Step 4: Delete the original PDF file
  }

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
