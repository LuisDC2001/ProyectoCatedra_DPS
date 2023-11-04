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
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const HomeScreen = () => {
  const { favoriteVehicles, toggleFavorite } = useAppContext();
  const [searchText, setSearchText] = useState("");
  const [apiData, setApiData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const [showFilters, setShowFilters] = useState(false);
  const filterHeight = new Animated.Value(0); // Altura inicial en 0

  const [tipo, setTipo] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState("");
  const [marca, setMarca] = useState([]);
  const [selectedMarcaType, setSelectedMarcaType] = useState("");
  const [transmision, setTransmision] = useState([]);
  const [selectedTransmisionType, setSelectedTransmisionType] = useState("");
  const [minAño, setMinAño] = useState("");
  const [maxAño, setMaxAño] = useState("");
  const [minPasajeros, setMinPasajeros] = useState("");
  const [maxPasajeros, setMaxPasajeros] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const aplicarPress = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.13:80/ProyectoCatedra_DPS/api/rent/filter.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipoVehiculo: selectedCarType,
            marca: selectedMarcaType,
            transmision: selectedTransmisionType,
            añoMinimo: minAño,
            añoMaximo: maxAño,
            pasajerosMinimo: minPasajeros,
            pasajerosMaximo: maxPasajeros,
            precioMinimo: minPrice,
            precioMaximo: maxPrice,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al consultar la API de filtros");
      }

      const data = await response.json();
      console.log("Data:", data);
      setApiData(data);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
      // Maneja el error, por ejemplo, mostrando un mensaje de error al usuario
    }
  };
  const clearFilters = () => {
    setSelectedCarType(""); // Limpia el valor seleccionado en el picker de tipo de carro
    setSelectedMarcaType(""); // Limpia el valor seleccionado en el picker de marca
    setSelectedTransmisionType(""); // Limpia el valor seleccionado en el picker de transmisión
    setMinAño(""); // Limpia el valor del año mínimo
    setMaxAño(""); // Limpia el valor del año máximo
    setMinPasajeros(""); // Limpia el valor de pasajeros mínimo
    setMaxPasajeros(""); // Limpia el valor de pasajeros máximo
    setMinPrice(""); // Limpia el valor del precio mínimo
    setMaxPrice(""); // Limpia el valor del precio máximo
    fetchDataFromApi();
  };
  
  useEffect(() => {
    const apiUrl =
      "http://192.168.0.13:80/ProyectoCatedra_DPS/api/brand/all.php";

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Response data:", response.data); // Log the response data
        setMarca(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de marcas:", error);
      });
  }, []);

  useEffect(() => {
    // URL de tu API que devuelve la lista de tipos
    const apiUrl =
      "http://192.168.0.13:80/ProyectoCatedra_DPS/api/typeOfCar/all.php";

    axios
      .get(apiUrl)
      .then((response) => {
        // Almacena la lista de tipo en el estado
        setTipo(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de tipos:", error);
      });
  }, []);

  useEffect(() => {
    // URL de tu API que devuelve la lista de transmisiones
    const apiUrl =
      "http://192.168.0.13:80/ProyectoCatedra_DPS/api/transmition/all.php";

    axios
      .get(apiUrl)
      .then((response) => {
        // Almacena la lista de transmisiones en el estado
        setTransmision(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de transmisiones:", error);
      });
  }, []);

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
    const filteredVehicles = apiData.filter(
      (rent) =>
        rent.vehiculo.marca.toLowerCase().includes(searchText.toLowerCase()) ||
        rent.vehiculo.modelo.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredVehicles);
  };

  const toggleFilterMenu = () => {
    if (showFilters) {
      // Si el menú de filtros está abierto, lo cerramos
      Animated.timing(filterHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowFilters(false));
    } else {
      // Si el menú de filtros está cerrado, lo abrimos
      Animated.timing(filterHeight, {
        toValue: 650, // Altura final del menú de filtros
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowFilters(true));
    }
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
        <TouchableOpacity onPress={toggleFilterMenu}>
          <Text>
            <Icon name="sliders" size={24} color="black" />
            <Icon
              name={showFilters ? "caret-up" : "caret-down"}
              size={24}
              color="black"
            />
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={{
          height: filterHeight,
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Tipo de carro</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCarType}
            onValueChange={(itemValue) => setSelectedCarType(itemValue)}
          >
            <Picker.Item label="Selecciona un tipo" value="" />
            {tipo.map((tipo) => (
              <Picker.Item
                key={tipo.id}
                label={tipo.nombre}
                value={tipo.nombre}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.text}>Marca</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMarcaType}
            onValueChange={(itemValue) => setSelectedMarcaType(itemValue)}
          >
            <Picker.Item label="Selecciona una marca" value="" />
            {marca.map((brand) => (
              <Picker.Item
                key={brand.id}
                label={brand.nombre}
                value={brand.nombre}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.text}>Transmisión</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTransmisionType}
            onValueChange={(itemValue) => setSelectedTransmisionType(itemValue)}
          >
            <Picker.Item label="Selecciona una transmision" value="" />
            {transmision.map((transmision) => (
              <Picker.Item
                key={transmision.id}
                label={transmision.nombre}
                value={transmision.nombre}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.text}>Año</Text>
        <View style={styles.priceInputContainer}>
          <TextInput
            style={styles.priceInput}
            placeholder="Mínimo"
            value={minAño}
            onChangeText={(text) => setMinAño(text)}
          />
          <Text style={styles.separator}>-</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="Máximo"
            value={maxAño}
            onChangeText={(text) => setMaxAño(text)}
          />
        </View>
        <Text style={styles.text}>Pasajeros</Text>
        <View style={styles.priceInputContainer}>
          <TextInput
            style={styles.priceInput}
            placeholder="Mínimo"
            value={minPasajeros}
            onChangeText={(text) => setMinPasajeros(text)}
          />
          <Text style={styles.separator}>-</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="Máximo"
            value={maxPasajeros}
            onChangeText={(text) => setMaxPasajeros(text)}
          />
        </View>
        <Text style={styles.text}>Rango de Precio</Text>

        <View style={styles.priceInputContainer}>
          <TextInput
            style={styles.priceInput}
            placeholder="Mínimo"
            value={minPrice}
            onChangeText={(text) => setMinPrice(text)}
          />
          <Text style={styles.separator}>-</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="Máximo"
            value={maxPrice}
            onChangeText={(text) => setMaxPrice(text)}
          />
        </View>

          <TouchableOpacity style={styles.filterButton} onPress={aplicarPress}>
            <Text style={styles.buttonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={clearFilters}>
            <Text style={styles.buttonText}>Limpiar Filtros</Text>
          </TouchableOpacity>

      </Animated.View>

      <Text style={styles.title}>Vehiculos Disponibles</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {searchText
          ? searchResults.map((rent) => (
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
                    <TouchableOpacity
                      // Utiliza toggleFavoriteById para gestionar los favoritos individualmente
                      onPress={() => toggleFavorite(rent.vehiculo.id)}
                    >
                      <Icon
                        name={
                          favoriteVehicles.includes(rent.vehiculo.id)
                            ? "heart"
                            : "heart-o"
                        }
                        size={24}
                        color={
                          favoriteVehicles.includes(rent.vehiculo.id)
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
                    source={{ uri: rent.vehiculo.imagen }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))
          : apiData.map((rent) => (
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
                    <TouchableOpacity
                      onPress={() => toggleFavorite(rent.vehiculo.id)}
                    >
                      <Icon
                        name={
                          favoriteVehicles.includes(rent.vehiculo.id)
                            ? "heart"
                            : "heart-o"
                        }
                        size={24}
                        color={
                          favoriteVehicles.includes(rent.vehiculo.id)
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
                    source={{ uri: rent.vehiculo.imagen }}
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
    marginTop: 10,
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
  pickerContainer: {
    height: "8%",
    width: "70%",
    borderWidth: 1,
    borderColor: "#C8C5C5",
    backgroundColor: "#C8C5C5",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#C8C5C5",
    backgroundColor: "#C8C5C5",
    borderRadius: 20,
    marginTop: 10,
  },
  separator: {
    paddingHorizontal: 10,
    color: "gray",
  },
  filterButton: {
    padding: 10, // Aumenta el espacio alrededor del botón
    backgroundColor: "#4D4DFF",
    borderRadius: 8, // Agrega bordes redondeados al botón
    marginTop: 25,
    width: 200,
    height: 50,
  },
  buttonText: {
    color: "white", // Cambia el color del texto del botón según tus necesidades
    fontSize: 20, // Aumenta el tamaño del texto del botón
    textAlign: "center",
    marginTop: 2,
  },
});

export default HomeScreen;
