import React from "react";
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
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = () => {
  const { favoriteVehicles, apiData, isLoading } = useAppContext();
  const navigation = useNavigation();

  const handleVehiclePress = (vehicleId) => {
    // Navegación a la pantalla "Details" aquí
    navigation.navigate("Details", { vehicleId }); // Pasar el identificador del vehículo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos Favoritos</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView>
          {apiData
            .filter((rent) => favoriteVehicles.includes(rent.vehiculo[0].id))
            .map((rent) => (
              <TouchableWithoutFeedback
                key={rent.vehiculo[0].id} // Agrega una clave única
                onPress={() => handleVehiclePress(rent.vehiculo[0].id)}
              >
                <View key={rent.vehiculo[0].id} style={styles.vehicleContainer}>
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
