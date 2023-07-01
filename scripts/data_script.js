const admin = require('firebase-admin');
const serviceAccount = require('../../../Downloads/quickbill-8d2f2-firebase-adminsdk-4zlh0-d03d2d651f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const data = require('./dealers.json');
const data = require('./products.json');
const firestore = admin.firestore();

const uploadData = async () => {
  const batch = firestore.batch();

  data.forEach((item, i) => {
    // const docRef = firestore.collection('dealers').doc();
    const docRef = firestore.collection('products').doc();
    batch.set(docRef, item);
  });

  await batch.commit();
  console.log('Batch write completed.');
};

uploadData();
