import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppContext } from '../AppContext';
import { useNavigation } from '@react-navigation/native';
import ReservationsConfirm from "./ReservationsConfirmScreen";

const Confirm = ({ route }) => {

  const navigation = useNavigation();

  const { vehicleDetails, fechaInicio, fechaFin, precioTotal } = route.params.reservationData;
  

  const ReservationsConfirm = () => {
    navigation.navigate('ReservationsConfirm');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.confirm}>Confirma tu reserva</Text>

      <Text style={styles.specs}>Confirma que todo este correcto:</Text>
      <View style={styles.detailsContainer}>
      <Text style={styles.info}>
          <Text style={styles.title}>Marca: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.modelo}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Modelo: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.año}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Año: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.año}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Transmisión: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.transmision}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Tipo de carro: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.tipo}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Pasajeros: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.pasajeros}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Motor: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.motor}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Tipo de gasolina: </Text>
          <Text style={styles.detalle}>{vehicleDetails.vehiculo.gasolina}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Fecha de inicio: </Text>
          <Text style={styles.detalle}>{fechaInicio}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Fecha de fin: </Text>
          <Text style={styles.detalle}>{fechaFin}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Precio por dia:</Text>
          <Text style={styles.detalle}> ${vehicleDetails.precioDia}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={styles.title}>Precio total:</Text>
          <Text style={styles.detalle}> ${precioTotal}</Text>
        </Text>
      </View>

      <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.reserveButton} onPress={ReservationsConfirm}>
      <Text style={styles.buttonText}>Confirmar Reserva</Text>
    </TouchableOpacity>
  </View>

    </View>
  );
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
    fontSize: 18,
  },
  info: {
    paddingBottom: 15,
  },
  confirm: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  brandModel: {
    fontSize: 22,
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserveButton: {
    padding: 10, // Aumenta el espacio alrededor del botón
    backgroundColor: '#4D4DFF',
    borderRadius: 8, // Agrega bordes redondeados al botón
    width: 200,
    height: 55,
  },
  buttonText: {
    color: 'white', // Cambia el color del texto del botón según tus necesidades
    fontSize: 20, // Aumenta el tamaño del texto del botón
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

export default Confirm;
