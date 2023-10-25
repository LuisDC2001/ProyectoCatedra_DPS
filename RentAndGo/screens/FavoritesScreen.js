import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useAppContext } from "../AppContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = () => {
  const { favoriteVehicles, apiData, isLoading, toggleFavorite } = useAppContext();
  const navigation = useNavigation();
  const [usuarioCorreo, setUsuarioCorreo] = useState("");

  const handleVehiclePress = (vehicleId) => {
    navigation.navigate("Details", { vehicleId });
  };
  const saveFavoriteVehiclesToStorage = async () => {
    try {
      await AsyncStorage.setItem(`favoriteVehicles-${usuarioCorreo}`, JSON.stringify(favoriteVehicles));
      console.log('Favoritos guardados con éxito para el usuario: ' + usuarioCorreo);
      console.log('IDs de carros agregados a favoritos:', favoriteVehicles);
    } catch (error) {
      console.error('Error al guardar favoritos en AsyncStorage:', error);
    }
  };
  useEffect(() => {
    saveFavoriteVehiclesToStorage();
  }, [favoriteVehicles]);

  useEffect(() => {
    getUsuarioCorreoFromStorage();
  }, []);
  const getUsuarioCorreoFromStorage = async () => {
    try {
      const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
      if (usuarioCorreo) {
        setUsuarioCorreo(usuarioCorreo);
      }
    } catch (error) {
      console.error('Error al obtener el correo del usuario desde AsyncStorage:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos Favoritos</Text>
      <Text style={styles.usuarioCorreo}>Correo del Usuario: {usuarioCorreo}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView>
          {apiData
            .filter((rent) => favoriteVehicles.includes(rent.vehiculo[0].id))
            .map((rent) => (
              <TouchableWithoutFeedback
                key={rent.vehiculo[0].id}
                onPress={() => handleVehiclePress(rent.vehiculo[0].id)}
              >
                <View style={styles.vehicleContainer}>
                  <View style={styles.infoRow}>
                    <Text>
                      <Text style={styles.infoLabelBold}>
                        {rent.vehiculo[0].marca}
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {" "}
                        {rent.vehiculo[0].modelo}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text>
                      <Text style={{ color: "blue", fontSize: 26 }}>
                        ${rent.precioDia}
                      </Text>
                      <Text style={{ fontSize: 20 }}>/ día</Text>
                    </Text>
                  </View>
                  <Image
                    style={{ width: "100%", height: 200 }}
                    source={{ uri: rent.vehiculo[0].imagen }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontFamily: "Arial",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  vehicleContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
  vehicleImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default FavoritesScreen;
