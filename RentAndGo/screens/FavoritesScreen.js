import React, { useState, useEffect } from "react";
import { View,ScrollView,Text,Image,StyleSheet,TouchableWithoutFeedback,ActivityIndicator,
} from "react-native";
import { useAppContext } from "../AppContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = () => {
  const { favoriteVehicles, apiData, isLoading, toggleFavorite } = useAppContext();
  const navigation = useNavigation();

  const handleVehiclePress = (vehicleId) => {
    navigation.navigate("Details", { vehicleId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos Favoritos</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView>
          {apiData
            .filter((rent) => favoriteVehicles.includes(rent.vehiculo.id))
            .map((rent) => (
              <TouchableWithoutFeedback
                key={rent.vehiculo.id}
                onPress={() => handleVehiclePress(rent.vehiculo.id)}
              >
                <View style={styles.vehicleContainer}>
                  <View style={styles.infoRow}>
                    <Text>
                      <Text style={styles.infoLabelBold}>
                        {rent.vehiculo.marca}
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {" "}
                        {rent.vehiculo.modelo}
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
                    source={{ uri: rent.vehiculo.imagen }}
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
