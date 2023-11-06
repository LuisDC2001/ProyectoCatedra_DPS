import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./screens/SplashScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ReservationsScreen from "./screens/ReservationsScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";
import AccountScreen from "./screens/AccountScreen";
import FilterScreen from "./screens/FilterScreen";
import VerificationScreen from "./screens/VerificationScreen";
import NewPassScreen from "./screens/NewPassScreen";
import PassChangedScreen from './screens/PassChangedScreen'
import EditAccount from './screens/EditAccount';
import ReservationsConfirm from "./screens/ReservationsConfirmScreen";
import ForgotPassScreen2 from "./screens/ForgotPassScreen2";
import DateRangePicker from './screens/CalendarScreen';
import Confirm from "./screens/ConfirmScreen";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AppProvider } from "./AppContext";




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <AppProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = "home";
            } else if (route.name === "Favoritos") {
              iconName = "heart-o";
            } else if (route.name === "Reservas") {
              iconName = "calendar";
            } else if (route.name === "Cuenta") {
              iconName = "user";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },

          activeTintColor: "blue", // Color del ícono activo
          inactiveTintColor: "gray", // Color del ícono inactivo
          style: {
            backgroundColor: "white", // Fondo de la barra de pestañas
          },
          labelStyle: {
            fontSize: 12, // Tamaño del nombre del botón
          },
        })}
      
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Favoritos" component={FavoritesScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Reservas" component={ReservationsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Cuenta" component={AccountScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </AppProvider>
  );
};

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="auto" />

        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Forgot" 
            component={ForgotPassScreen} 
            options={{ headerShown: false }}
          />
           <Stack.Screen 
            name="Forgot2" 
            component={ForgotPassScreen2} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Verification" 
            component={VerificationScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="NewPass" 
            component={NewPassScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PassChanged" 
            component={PassChangedScreen} 
            options={{ headerShown: false }}
          />
            <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />

          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Filter" 
            component={FilterScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Edit" 
            component={EditAccount} 
            options={{ headerShown: false }}
          />
           <Stack.Screen 
            name="DateRangePicker" 
            component={DateRangePicker} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ReservationsConfirm" 
            component={ReservationsConfirm} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Confirm" 
            component={Confirm} 
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
