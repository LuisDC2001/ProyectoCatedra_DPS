import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TouchableWithoutFeedback,Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ReservationScreen = () => {

  const navigation = useNavigation();
  const [usuarioCorreo, setUsuarioCorreo] = useState("");
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Función para cargar los datos de la API
 /* const ReservationDataFromApi = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.10:81/ProyectoCatedra_DPS_APIS/api/user/allRent.php"
      );
      const data = await response.json();
      setApiData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ReservationDataFromApi();
  }, []);*/

  const ReservationFromApi = async () => {
    try {
      const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
          if (usuarioCorreo) {
            setUsuarioCorreo(usuarioCorreo);
          }
      const response = await fetch(
        "http://192.168.1.10:81/ProyectoCatedra_DPS_APIS/api/user/allRent.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "correoElectronico": usuarioCorreo }),
        }
      );
      if (response.status === 204) {
        setApiData([]);
      }else{
      const data = await response.json();
      console.log("Data:", data);
      setApiData(data);
      console.log(apiData);
      }
    } catch (error) {
      console.error("Error al encontrar reservas:", error);
    }
  };

  useEffect(() => {
    ReservationFromApi();
  }, []);

  const handleVehiclePress = (Id) => {
    navigation.navigate("DetailsReservation", { Id });
  };

  return (
    <View style={styles.container}>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  goBackButton: {
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 25,
    padding: 10,
  },
  vehicleContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infoLabelBold: {
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default ReservationScreen;
