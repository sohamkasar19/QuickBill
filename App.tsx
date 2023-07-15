import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen.js';
import DetailsScreen from './src/screens/DetailsScreen.js';
import Login from './src/components/Login.js';
import Register from './src/components/Register.js';
import {ActivityIndicator, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import SelectDealerScreen from './src/screens/SelectDealerScreen.js';
import AddProductsScreen from './src/screens/AddProductScreen.js';
import DealersScreen from './src/screens/DealersScreen.js';
import OrderReviewScreen from './src/screens/OrderReviewScreen.js';
import PastOrdersScreen from './src/screens/PastOrderScreen.js';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen.js';
import ProductsScreen from './src/screens/ProductsScreen.js';
import NewProductScreen from './src/screens/NewProductScreen.js';

const Stack = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerLeft: () => <View></View>,
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Select Dealer" component={SelectDealerScreen} />
        <Stack.Screen name="Add Products" component={AddProductsScreen} />
        <Stack.Screen name="Review Order" component={OrderReviewScreen} />
        <Stack.Screen name="Past Orders" component={PastOrdersScreen} />
        <Stack.Screen name="Order Details" component={OrderDetailsScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="New Product" component={NewProductScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Dealers" component={DealersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
