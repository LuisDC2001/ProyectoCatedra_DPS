import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = () => {
  const { favoriteVehicles, toggleFavorite } = useAppContext();
  const [searchText, setSearchText] = useState("");
  const [apiData, setApiData] = useState([]); 
  const [searchResults, setSearchResults] = useState([]); 
  const navigation = useNavigation();

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.13:80/ProyectoCatedra_DPS/api/rent/all.php"
      );
      setApiData(response.data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };
  const handleSearch = () => {
    const filteredVehicles = apiData.filter((rent) =>
      rent.vehiculo[0].marca.toLowerCase().includes(searchText.toLowerCase()) ||
      rent.vehiculo[0].modelo.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredVehicles);
  };


  const handleFilterButtonPress = () => {
    navigation.navigate("Filter");
  };

  const handleVehiclePress = (vehicleId) => {
    navigation.navigate("Details", { vehicleId });
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar vehiculo"
            value={searchText}
            onChangeText={(text) => setSearchText(text)} 
            onEndEditing={handleSearch} 
          />
          <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterButtonPress}
        >
          <Icon name="sliders" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Vehiculos Disponibles</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {searchText
          ? searchResults.map((rent) => (
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
                    <TouchableOpacity
                      // Utiliza toggleFavoriteById para gestionar los favoritos individualmente
                      onPress={() => toggleFavorite(rent.vehiculo[0].id)}
                    >
                      <Icon
                        name={
                          favoriteVehicles.includes(rent.vehiculo[0].id)
                            ? "heart"
                            : "heart-o"
                        }
                        size={24}
                        color={
                          favoriteVehicles.includes(rent.vehiculo[0].id)
                            ? "blue"
                            : "black"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.infoRow}>
                    <Text>
                      <Text style={{ color: "blue", fontSize: 26 }}>
                        {rent.precioDia}
                      </Text>
                      <Text style={{ fontSize: 20 }}>/ dia</Text>
                    </Text>
                  </View>
                  <Image
                    style={{ width: "100%", height: 200 }}
                    source={{ uri: rent.vehiculo[0].imagen }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))
          : apiData.map((rent) => (
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
                    <TouchableOpacity
                      onPress={() => toggleFavorite(rent.vehiculo[0].id)}
                    >
                      <Icon
                        name={
                          favoriteVehicles.includes(rent.vehiculo[0].id)
                            ? "heart"
                            : "heart-o"
                        }
                        size={24}
                        color={
                          favoriteVehicles.includes(rent.vehiculo[0].id)
                            ? "blue"
                            : "black"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.infoRow}>
                    <Text>
                      <Text style={{ color: "blue", fontSize: 26 }}>
                        {rent.precioDia}
                      </Text>
                      <Text style={{ fontSize: 20 }}>/ dia</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
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
});

export default HomeScreen;  