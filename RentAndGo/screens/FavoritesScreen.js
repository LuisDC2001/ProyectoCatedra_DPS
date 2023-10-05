import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Carros from "../Carros";
import { useAppContext } from '../AppContext';
import { useNavigation } from '@react-navigation/native';


const FavoritesScreen = () => {
  const { favoriteVehicles } = useAppContext();

  // Filtrar los vehículos favoritos
  const favoriteCars = Carros.filter((vehicle) => favoriteVehicles.includes(vehicle.id));

  const handleVehiclePress = (vehicleId) => {
    // navegación a la pantalla "Details" aquí
    navigation.navigate('Details', { vehicleId }); // pasar el identificador del vehículo
  };

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos Favoritos</Text>
      <ScrollView>
        {favoriteCars.map((vehicle) => (
          <TouchableWithoutFeedback
          key={vehicle.id}
          onPress={() => handleVehiclePress(vehicle.id)}
        >
          <View key={vehicle.id} style={styles.vehicleContainer}>
            <View style={styles.infoRow}>
              <Text>
                <Text style={styles.infoLabelBold}>{vehicle.brand}</Text>
                <Text style={{ fontSize: 20 }}> {vehicle.model}</Text>
              </Text>
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
          </TouchableWithoutFeedback>
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
