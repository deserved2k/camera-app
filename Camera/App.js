//   import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import { MediaScreen } from "./MediaScreen";
// import {CameraScreen} from "./Camera"
// import { NavigationContainer} from "@react-navigation/native";
// import {createNativeStackNavigator} from "@react-navigation/native-stack"

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//           <NavigationContainer>
//           <Stack.Navigator initialRouteName="MediaScreen">
//         {/* <Stack.Screen name="CameraScreen" component={CameraScreen}/> */}
//         <Stack.Screen name="MediaScreen" component={MediaScreen} />
//          </Stack.Navigator>
//           </NavigationContainer>
//   );
// }


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import CameraScreen from "./Camera";
import MediaScreen from "./MediaScreen";


const Stack = createNativeStackNavigator();





export default function App() {
  return (
          <NavigationContainer>
          <Stack.Navigator initialRouteName="CameraScreen">
           <Stack.Screen
          name="Drawer"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Media" component={MediaScreen} />
         </Stack.Navigator>
          </NavigationContainer>
  );
}




