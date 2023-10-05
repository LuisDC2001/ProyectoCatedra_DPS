import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Carros from "../Carros";

const Details = ({ route }) => {
  // Obteniendo el identificador del vehículo de los parámetros de navegación
  const { vehicleId } = route.params;

  // Simula obtener los detalles del vehículo basados en el vehicleId
  const vehicleDetails = obtenerDetallesDelVehiculoPorId(vehicleId);

  return (
    <View style={styles.container}>
      <Text
        style={styles.brandModel}
      >{`${vehicleDetails.brand} ${vehicleDetails.model}`}</Text>

      <View style={styles.imageContainer}>
        <Image
          source={vehicleDetails.image}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.specs}>Especificaciones</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.info}>
          <Text style={styles.title}>Año: </Text>
          <Text style={styles.detalle}>{vehicleDetails.year}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Transmisión: </Text>
          <Text style={styles.detalle}>{vehicleDetails.transmission}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Tipo de carro: </Text>
          <Text style={styles.detalle}>{vehicleDetails.type}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Pasajeros: </Text>
          <Text style={styles.detalle}>{vehicleDetails.passengers}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Motor: </Text>
          <Text style={styles.detalle}>{vehicleDetails.engine}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Tipo de gasolina: </Text>
          <Text style={styles.detalle}>{vehicleDetails.fuel}</Text>
        </Text>
      </View>

      <View style={styles.leftContainer}>
    <Text style={styles.preciotext}>Precio:</Text>
  </View>
  <View style={styles.middleContainer}>
    
    <Text>
                <Text style={{ color: "blue", fontSize: 32,  }}>${vehicleDetails.price}</Text>
                <Text style={{ fontSize: 28 }}>/ día</Text>
              </Text>
  </View>
  <View style={styles.rightContainer}>
    <TouchableOpacity style={styles.reserveButton}>
      <Text style={styles.buttonText}>Reservar</Text>
    </TouchableOpacity>
  </View>

    </View>
  );
};

// Función para obtener los detalles del vehículo por su identificador
const obtenerDetallesDelVehiculoPorId = (vehicleId) => {
  // Simula la obtención de datos de algún lugar (por ejemplo, una base de datos)
  const vehicleDetails = Carros.find((vehicle) => vehicle.id === vehicleId);
  return vehicleDetails || {}; // Retorna un objeto vacío si no se encuentra el vehículo
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    marginTop: 10,
  },
  specs: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    paddingBottom: 15,
  },
  brandModel: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
  vehicleImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
    paddingBottom: 9,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 9,
    marginBottom:30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  detalle: {
    color: "gray",
    fontSize: 18,
  },
  preciotext:
  {
    marginTop:15,
    fontSize:28,
    color:"gray",
  },
  reserveButton: {
    padding: 10, // Aumenta el espacio alrededor del botón
    backgroundColor: '#4D4DFF',
    borderRadius: 8, // Agrega bordes redondeados al botón
    marginTop: 25,
    marginRight:30,
    width: 200,
    height: 65,
  },
  buttonText: {
    color: 'white', // Cambia el color del texto del botón según tus necesidades
    fontSize: 24, // Aumenta el tamaño del texto del botón
    textAlign: "center",
    marginTop: 2,
  },
  leftContainer: {
    flex: 1, // Ocupa 1/3 del espacio disponible
    alignItems: 'flex-start', // Alinea el texto a la izquierda
  },
  middleContainer: {
    flex: 1, // Ocupa 1/3 del espacio disponible
    alignItems: 'flex-start', // Alinea el texto a la izquierda
  },
  rightContainer: {
    flex: 1, // Ocupa 1/3 del espacio disponible
    alignItems: 'flex-end', // Alinea el botón a la derecha
    bottom: 100,
  },
});

export default Details;
