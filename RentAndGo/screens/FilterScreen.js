import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const FilterScreen = () => {
  const navigation = useNavigation();
  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedMarcaType, setSelectedMarcaType] = useState("");
  const [selectedTransmisionType, setSelectedTransmisionType] = useState("");
  const [selectedAñoType, setSelectedAñoType] = useState(""); 
  const [selectedPasajerosType, setSelectedPasajerosType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const aplicarPress = () => {  
    //navigation.navigate('HomeTab', { selectedCarType, selectedMarcaType, selectedTransmisionType, selectedAñoType, selectedPasajerosType, minPrice, maxPrice });
    navigation.navigate('HomeTab');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Icon name="close" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Filtros</Text>

      <Text style={styles.text}>Tipo de carro</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ width: "100%" }} // Ancho del Picker al 100% del contenedor
          selectedValue={selectedCarType}
          onValueChange={(itemValue, itemIndex) => setSelectedCarType(itemValue)}
        >
          <Picker.Item label="Seleccionar tipo de carro" value="" /> 
          <Picker.Item label="Sedan" value="Sedan" />
          <Picker.Item label="SUV" value="SUV" />
          <Picker.Item label="Pick Up" value="Pick Up" />
          <Picker.Item label="Hatchback" value="Hatchback" />
        </Picker>
      </View>
      <Text style={styles.text}>Marca</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ width: "100%" }} 
          selectedValue={selectedMarcaType}
          onValueChange={(itemValue, itemIndex) => setSelectedMarcaType(itemValue)}
        >
          <Picker.Item label="Seleccionar marca" value="" /> 
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Kia" value="Kia" />
          <Picker.Item label="Honda" value="Honda" />
          
        </Picker>
      </View>
      <Text style={styles.text}>Transmisión</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ width: "100%" }} 
          selectedValue={selectedTransmisionType}
          onValueChange={(itemValue, itemIndex) => setSelectedTransmisionType(itemValue)}
        >
          <Picker.Item label="Seleccionar transmisión" value="" /> 
          <Picker.Item label="Automático" value="Automático" />
          <Picker.Item label="Estándar" value="Estándar" />
          
        </Picker>
      </View>
      <Text style={styles.text}>Año</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ width: "100%" }} 
          selectedValue={selectedAñoType}
          onValueChange={(itemValue, itemIndex) => setSelectedAñoType(itemValue)}
        >
          <Picker.Item label="Seleccionar año" value="" /> 
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2022" value="2022" />
          <Picker.Item label="2021" value="2021" />
          <Picker.Item label="2020" value="2020" />
        </Picker>
      </View>
      <Text style={styles.text}>Pasajeros</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ width: "100%" }} 
          selectedValue={selectedPasajerosType}
          onValueChange={(itemValue, itemIndex) => setSelectedPasajerosType(itemValue)}
        >
          <Picker.Item label="Seleccionar cant.pasajeros" value="" /> 
          <Picker.Item label="2" value="2" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
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

export default FilterScreen;
