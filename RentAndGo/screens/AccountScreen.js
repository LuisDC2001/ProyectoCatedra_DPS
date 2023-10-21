import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Edit from "./EditAccount";

const FilterScreen = () => {
  const navigation = useNavigation();

  const editOnPress = () => {
    navigation.navigate("Edit");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cajita}>
        <Text style={styles.cajita_text}>Hola</Text>
        <Text style={styles.cajita_usuario}>Usuario!</Text>
        <Text style={styles.reservas}>
          <Text style={styles.cajita_text2}> Usuario desde: </Text>
          <Text style={styles.cajita_fecha}>Insertar fecha aqui</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.cajita_text2}> Reservas realizadas: </Text>
          <Text style={styles.cajita_fecha}>Insertar cantidad aqui</Text>
        </Text>
      </View>
      <Text style={styles.detalles_text}>Detalles de perfil                                             </Text>
      <View style={styles.cajita2}>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Nombre: </Text>
          <Text style={styles.detalles_light}>Insertar nombre aqui</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Apellido: </Text>
          <Text style={styles.detalles_light}>Insertar apellido aqui</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Fecha de nacimiento: </Text>
          <Text style={styles.detalles_light}>Insertar fecha aqui</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Nacionalidad: </Text>
          <Text style={styles.detalles_light}>Insertar nacionalidad aqui</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Numero de telefono: </Text>
          <Text style={styles.detalles_light}>Insertar numero aqui</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Correo Electronico: </Text>
          <Text style={styles.detalles_light}>Insertar correo aqui</Text>
        </Text>
      </View>

      <TouchableOpacity onPress={editOnPress}>
        <Text style={styles.edit}>
          <Icon name="pencil" size={24} color="#4D4DFF" alignItems="right"/>
          <Text style={styles.text}> Editar perfil</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cajita: {
    marginTop: 80,
    backgroundColor: "#4D4DFF",
    borderRadius: 10,
    width: 380,
    height: 250,
  },
  cajita2: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 380,
    height: 250,
    marginBottom: 10,
    //boxShadow: "0px 20px 20px rgba(0, 0, 0, 1)",
  },
  cajita_text: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: "left",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  cajita_text2: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: "left",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cajita_usuario: {
    marginLeft: 20,
    marginBottom: 10,
    textAlign: "left",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  cajita_fecha: {
    marginLeft: 20,
    textAlign: "left",
    color: "white",
    fontSize: 16,
  },
  reservas: {
    marginTop: 10,
  },
  detalles_text: {
    textAlign: "left",
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  detalles_bold: {
    textAlign: "left",
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  detalles_light: {
    color: "gray",
  },
  edit: {
    marginLeft: 240,
    marginBottom: 150,
    color: "#4D4DFF",
  },
});

export default FilterScreen;
