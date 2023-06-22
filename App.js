// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "./screens/Home";
import {ProductInfor} from "./screens/ProductInfor";
import {Cart} from "./screens/Cart";

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='MyCart' component={Cart} />
          <Stack.Screen name='ProductInfor' component={ProductInfor} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

