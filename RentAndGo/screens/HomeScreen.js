import React, { useState, useEffect} from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Asegúrate de importar FontAwesome o la fuente de iconos que desees
import Carros from "../Carros";
import { useAppContext } from '../AppContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { favoriteVehicles, toggleFavorite } = useAppContext();
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const navigation = useNavigation();
  
  // Función para filtrar los vehículos según el texto de búsqueda
  const filteredVehicles = Carros.filter((vehicle) =>
  vehicle.brand.toLowerCase().includes(searchText.toLowerCase()) ||
  vehicle.model.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = () => {
    // Aquí colocas la lógica de búsqueda
    const filteredVehicles = Carros.filter((vehicle) =>
    vehicle.brand.toLowerCase().includes(searchText.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredVehicles);
  };

  const handleFilterButtonPress = () => {
    navigation.navigate('Filter'); // Asegúrate de navegar a la pantalla 'Filter'
  };
  
  return (
    <View style={styles.container}>
      {/* Barra de búsqueda con icono de lupa */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar carro"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchIcon}>
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


      {/* Título "Vehículos disponibles" */}
      <Text style={styles.title}>Vehículos disponibles</Text>

      {/* ScrollView que contiene todos los vehicle containers */}
      <ScrollView>
        {filteredVehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleContainer}>
            <View style={styles.infoRow}>
              <Text>
                <Text style={styles.infoLabelBold}>{vehicle.brand}</Text>
                <Text style={{ fontSize: 20 }}> {vehicle.model}</Text>
              </Text>
              <TouchableOpacity onPress={() => toggleFavorite(vehicle.id)}>
                <Icon
                  name={favoriteVehicles.includes(vehicle.id) ? "heart" : "heart-o"}
                  size={24}
                  color={favoriteVehicles.includes(vehicle.id) ? "blue" : "black"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
              <Text>
                <Text style={{ color: "blue", fontSize: 26 }}>${vehicle.price}</Text>
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
    marginRight: 10, // Espacio entre la barra de búsqueda y el botón de filtro
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginRight: 10, // Espacio entre el campo de búsqueda y el ícono de lupa
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
    backgroundColor: "white", // Color de fondo del container
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
    fontSize: 36, // Tamaño de fuente más grande
    fontWeight: "bold", // Texto en negrita
  },
  favoriteButton: {
    padding: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pricePerDay: {
    fontSize: 16,
  },
  vehicleImage: {
    width: "100%",
    height: 200, // Altura de la imagen
    borderRadius: 10,
  },
});

export default HomeScreen;
