import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationScreen = () => {
  const navigation = useNavigation();
  const [usuarioCorreo, setUsuarioCorreo] = useState("");
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleReservePress = (Id) => {
    navigation.navigate("DetailsReservations", { Id });
  };

  const ReservationFromApi = async () => {
    try {
      const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
      if (usuarioCorreo) {
        setUsuarioCorreo(usuarioCorreo);
      }
      const response = await fetch(
        "http://172.16.101.194:80/ProyectoCatedra_DPS_APIS/api/user/allRent.php",
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
      } else {
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

  return (
    <View style={styles.container}>
      <Text style={styles.infoBold2}>Mis reservas</Text>
      <ScrollView>
      
        {apiData.map((reservation, index) => (
          
          <TouchableWithoutFeedback
                key={reservation.id}
                onPress={() => handleReservePress(reservation.id)}
              >
          <View style={styles.vehicleContainer} key={index}>
            <Text>
              <Text style={styles.infoLabelBold}>{reservation.marca}</Text>
              <Text style={{ fontSize: 26 }}> {reservation.modelo}</Text>
            </Text>
            <Text style={styles.infoLabel}>Estado: {reservation.estado}</Text>
            <Image
              style={{ width: "100%", height: 200 }}
              source={{ uri: reservation.imagen }}
            />
          </View>
        
        </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  infoBold2: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 100,
    marginBottom: 50,
  },
  infoLabel: {
    fontSize: 18,
  },
  vehicleContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginLeft: 30,
    resizeMode : "contain",
    width: 350,
    height: 300
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  infoLabelBold: {
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default ReservationScreen;
