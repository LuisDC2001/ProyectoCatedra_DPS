import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Edit from "./EditAccount";
import AsyncStorage from '@react-native-async-storage/async-storage';


const FilterScreen = () => {
  const navigation = useNavigation();


  const [usuarioCorreo, setUsuarioCorreo] = useState("");
  const [nombreU, setNombre] = useState("");
  const [apellido, setapellido] = useState("");
  const [fechanac, setfechanac] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechafila, setfechafila] = useState("");


  const editOnPress = () => {
    navigation.navigate("Edit");
  };
  const getUsuarioCorreoFromStorage = async () => {
    try {
      const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
      if (usuarioCorreo) {
        setUsuarioCorreo(usuarioCorreo);
      }
    } catch (error) {
      console.error('Error al obtener el correo del usuario desde AsyncStorage:', error);
    }
  };
  const UserDataFromApi = async () => {
    const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
    if (usuarioCorreo) {
      setUsuarioCorreo(usuarioCorreo);
    }

    await fetch('http://192.168.1.24:80/ProyectoCatedra_DPS_APIS/api/user/allUserInfo.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "correoElectronico": usuarioCorreo })
    }).then(res => res.json())
      .then(resData => {
        setNombre(resData.usuario[0].nombre);
        setapellido(resData.usuario[0].apellido);
        setfechanac(resData.usuario[0].fechaNacimiento);
        setNacionalidad(resData.usuario[0].nacionalidad);
        setTelefono(resData.usuario[0].telefono);
        setfechafila(resData.usuario[0].fechaFila);

      });
  };

  const logout = async () => {
    try {
      // Elimina la información de la sesión al presionar el botón "Cerrar Sesión"
      await AsyncStorage.setItem('usuarioCorreo', "");
      await AsyncStorage.setItem('usuariosEnSesion',"");
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  };

  useEffect(() => {
    getUsuarioCorreoFromStorage();
    UserDataFromApi();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.cajita}>
        <Text style={styles.cajita_text}>Hola {nombreU}</Text>
        <Text style={styles.reservas}>
          <Text style={styles.cajita_text2}> Usuario desde: </Text>
          <Text style={styles.cajita_fecha}>{fechafila}</Text>
        </Text>
      </View>
      <Text style={styles.detalles_text}>Detalles de perfil</Text>
      <View style={styles.cajita2}>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Nombre: </Text>
          <Text style={styles.detalles_light}>{nombreU}</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Apellido: </Text>
          <Text style={styles.detalles_light}>{apellido}</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Fecha de nacimiento: </Text>
          <Text style={styles.detalles_light}>{fechanac}</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Nacionalidad: </Text>
          <Text style={styles.detalles_light}>{nacionalidad}</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Numero de telefono: </Text>
          <Text style={styles.detalles_light}>{telefono}</Text>
        </Text>
        <Text style={styles.reservas}>
          <Text style={styles.detalles_bold}> Correo Electronico: </Text>
          <Text style={styles.detalles_light}>{usuarioCorreo}</Text>
        </Text>
      </View>
      <View style={styles.botones}>
        <TouchableOpacity onPress={editOnPress}>
          <Text style={styles.edit}>
            <Icon name="pencil" size={24} color="#4D4DFF" alignItems="right" />
            <Text style={styles.text}> Editar perfil</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.edit}>
            <Icon name="close" size={24} color="#4D4DFF" alignItems="center" />
            <Text style={styles.text}> Cerrar Sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>




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
    backgroundColor: "#4D4DFF",
    borderRadius: 10,
    width: 380,
    height: 150,
    marginBottom: 15,
    
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
    textAlign: "center",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  cajita_text2: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cajita_usuario: {
    marginLeft: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  cajita_fecha: {
    marginLeft: 20,
    textAlign:"center",
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
    color: "#4D4DFF",
    marginBottom: 15

  },
  botones: {
    marginLeft: 200,
    marginTop: 20,

  }


});

export default FilterScreen;
