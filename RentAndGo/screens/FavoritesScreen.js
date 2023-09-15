import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Carros from "../Carros";
import { useAppContext } from '../AppContext';

const FavoritesScreen = () => {
  const { favoriteVehicles } = useAppContext();

  // Filtrar los vehículos favoritos
  const favoriteCars = Carros.filter((vehicle) => favoriteVehicles.includes(vehicle.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos Favoritos</Text>
      <ScrollView>
        {favoriteCars.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleContainer}>
            <View style={styles.infoRow}>
              <Text>
                <Text style={styles.infoLabelBold}>{vehicle.brand}</Text>
                <Text style={{ fontSize: 20 }}> {vehicle.model}</Text>
              </Text>
              {/* Agrega aquí el código del corazón para manejar favoritos si es necesario */}
            </View>
            <View style={styles.infoRow}>
              <Text>
                <Text style={{ color: "blue", fontSize: 26 }}>
                  ${vehicle.price}
                </Text>
                <Text style={{ fontSize: 20 }}>/ día</Text>
              </Text>
            </View>
            <Image
              source={vehicle.image}
              style={styles.vehicleImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
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
