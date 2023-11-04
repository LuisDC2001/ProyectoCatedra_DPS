import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
const FilterScreen = () => {
  const navigation = useNavigation();
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


  const minAñoInt = parseInt(minAño);
  const maxAñoInt = parseInt(maxAño);
  const minPasajerosInt = parseInt(minPasajeros);
  const maxPasajerosInt = parseInt(maxPasajeros);
  const minPriceInt = parseInt(minPrice);
  const maxPriceInt = parseInt(maxPrice);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const aplicarPress = async () => {  
    try {
      const response = await fetch('http://192.168.1.14:8080/ProyectoCatedra_DPS/api/rent/filter.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "tipoVehiculo": selectedCarType,
          "marca": selectedMarcaType,
          "transmision": selectedTransmisionType,
          "añoMinimo": minAñoInt,
          "añoMaximo": maxAñoInt,
          "pasajerosMinimo": minPasajerosInt,
          "pasajerosMaximo": maxPasajerosInt,
          "precioMinimo": minPriceInt,
          "precioMaximo": maxPriceInt,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error al consultar la API de filtros');
      }
      
      const data = await response.json();
      console.log('Data:', data);
      // Pasa el arreglo de carros filtrados como parámetro al volver a HomeScreen
      navigation.navigate('HomeTab', { filteredCars: data });
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
      // Maneja el error, por ejemplo, mostrando un mensaje de error al usuario
    }
  }
  

  useEffect(() => {
    const apiUrl = "http://192.168.1.14:8080/ProyectoCatedra_DPS/api/brand/all.php";
  
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
      "http://192.168.1.14:8080/ProyectoCatedra_DPS/api/typeOfCar/all.php";
     

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
      "http://192.168.1.14:8080/ProyectoCatedra_DPS/api/transmition/all.php";
     

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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Icon name="close" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Filtros</Text>

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
          onChangeText={text => setMinAño(text)}
        />
        <Text style={styles.separator}>-</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="Máximo"
          value={maxAño}
          onChangeText={text => setMaxAño(text)}
        />
      </View>
      <Text style={styles.text}>Pasajeros</Text>
      <View style={styles.priceInputContainer}>
      <TextInput
          style={styles.priceInput}
          placeholder="Mínimo"
          value={minPasajeros}
          onChangeText={text => setMinPasajeros(text)}
        />
        <Text style={styles.separator}>-</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="Máximo"
          value={maxPasajeros}
          onChangeText={text => setMaxPasajeros(text)}
        />
      </View>
      <Text style={styles.text}>Rango de Precio</Text>
      
      <View style={styles.priceInputContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="Mínimo"
          value={minPrice}
          onChangeText={text => setMinPrice(text)}
        />
        <Text style={styles.separator}>-</Text>
        <TextInput
          style={styles.priceInput}
          placeholder="Máximo"
          value={maxPrice}
          onChangeText={text => setMaxPrice(text)}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={aplicarPress}>
          <Text style={styles.buttonText}>Aplicar Filtros</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Cambiado a 'flex-start' para alinear arriba
    alignItems: "center",
    paddingTop: 20, // Agregado para espacio en la parte superior
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 25,
  },
  goBackButton: {
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 25,
    padding: 10,
  },
  pickerContainer: {
    height: "6%",
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
    backgroundColor: '#4D4DFF',
    borderRadius: 8, // Agrega bordes redondeados al botón
    marginTop: 25,
    width: 200,
    height: 50,
  },
  buttonText: {
    color: 'white', // Cambia el color del texto del botón según tus necesidades
    fontSize: 20, // Aumenta el tamaño del texto del botón
    textAlign: "center",
    marginTop: 2,
  },
});

export default FilterScreen;