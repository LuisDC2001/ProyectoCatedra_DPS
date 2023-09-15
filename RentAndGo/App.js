import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
//import Icon from "react-native-vector-icons/FontAwesome";
//import { AppProvider } from "./AppContext";


const Stack = createStackNavigator();


const App = () => {
  return (
    //<AppProvider>
      <NavigationContainer>
        {/* Place the ExpoStatusBar component here */}
        <StatusBar style="auto" />

        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
   // </AppProvider>
  );
};

export default App;