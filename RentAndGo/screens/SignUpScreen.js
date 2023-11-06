import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../components/Input";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
const Login = () => {
  {
    /*capturando valores*/
  }
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [nombre, setnombre] = useState("");
  const [apellido, setapellido] = useState("");
  const [numero, setnumero] = useState("");
  const [fecha, guardarFecha] = useState("");
  const [nacionalidad, setNacionalidad] = useState([]);
  const [nacionalidadseleccionada, setNacionalidadseleccionada] = useState("");
  const [imagenPerfil, setimagenPerfil] = useState("");
  const [rol, setRol] = useState("1");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isContraVisible, setContraVisible] = useState(false);

  const navigation = useNavigation();


  {
    /*eventos botones */
  }
  const RegistroPress = async () => {

    // Validación de campos
  if (!correo || !contra || !nombre || !apellido || !fecha || !numero || !nacionalidadseleccionada) {
    alert("Por favor, completa todos los campos.");
    return;
  }
  const telefonoValido = /^[0-9]{8}$/.test(numero);
  if (!telefonoValido) {
    alert("Por favor, ingresa un número de teléfono válido (8 dígitos numéricos).");
    return;
  }
  if(!/^[a-zA-Z]+$/.test(nombre)){
    alert("Por favor ingrese solamente valores de texto")
    return;
  }
  if(!/^[a-zA-Z]+$/.test(apellido)){
    alert("Por favor ingrese solamente valores de texto")
    return;
  }


    await fetch('http://192.168.1.10:81/ProyectoCatedra_DPS_APIS/api/user/register.php',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify({"correoElectronico": correo,
      "contrasena": contra,
      "nombre": nombre,
      "apellido": apellido,
      "fechaNacimiento": fecha,
      "telefono": numero,
      "imagenPerfil": imagenPerfil,
      "idNacionalidad": nacionalidadseleccionada,
      "idRol": rol,})  
  }).then(res=>res.json())
  .then(resData=>{
          //alert(resData.mensaje);
          if(resData.mensaje==="CREATED"){
              navigation.navigate('SignIn');
          }
          else
          {
            alert(resData.mensajeReal);
          }
  });
};


  const SingInPress = () => {
    navigation.navigate("SignIn");
  };

  const ContraVisibility = () => {
    setContraVisible(!isContraVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const año = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = date.getDate();
  
    // Formatea la fecha en "yyyy-MM-dd"
    const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    guardarFecha(fechaFormateada);
    hideDatePicker();
  };
  
  

  useEffect(() => {
    // URL de API que devuelve la lista de países
    const apiUrl =
      "http://192.168.1.10:81/ProyectoCatedra_DPS_APIS/api/nationality/all.php";
     

    axios
      .get(apiUrl)
      .then((response) => {
        // Almacena la lista de países en el estado
        setNacionalidad(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de países:", error);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.texto}>Crea tu cuenta</Text>
        <Text style={styles.texto2}>¡Registrate y comienza el viaje!</Text>

        <Text style={styles.texto3}>Correo Electrónico</Text>
        <CustomInput
          placeholder="Ingresa tu correo electrónico"
          value={correo}
          setValue={setCorreo}
        />
        <Text style={styles.texto3}>Nombre</Text>
        <CustomInput
          placeholder="Ingresa tu Nombre"
          value={nombre}
          setValue={setnombre}
        />
        <Text style={styles.texto3}>Apellido</Text>
        <CustomInput
          placeholder="Ingresa tu Apellido"
          value={apellido}
          setValue={setapellido}
        />

        <Text style={styles.texto3}>Número de teléfono</Text>
        <CustomInput
          placeholder="+503 | Ingresa tu número de teléfono"
          value={numero}
          setValue={setnumero}
          //teclado de numeros
          keyboardtype="phone-pad"
         
        />

        <Text style={styles.texto3}>Fecha de Nacimiento</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.fechaButton}>
          <Text>
            <Icon name="calendar" size={20} color="gray" />
            <Text> </Text>
            <Text style={styles.buttonText}>{fecha}</Text>
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={hideDatePicker}
          locale="es_ES"
          headerTextIOS="Elige la fecha"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          display="spinner" 
          displayFormat="YYYY-MM-DD"
        />

        <Text style={styles.texto3}>Nacionalidad</Text>
        <Picker
          selectedValue={nacionalidadseleccionada}
          onValueChange={(itemValue) => setNacionalidadseleccionada(itemValue)}
        >
          <Picker.Item label="Selecciona un país" value="" />
          {nacionalidad.map((country) => (
            <Picker.Item
              key={country.id}
              label={country.nombre}
              value={country.id}
            />
          ))}
        </Picker>

        <Text style={styles.texto3}>Contraseña</Text>

        <CustomInput
          placeholder="Contraseña"
          value={contra}
          setValue={setContra}
          secureTextEntry={!isContraVisible}
          iconpassword={isContraVisible ? "eye" : "eye-slash"}
          onPress={ContraVisibility}
        />

        <Button
          text="Registrarse"
          onPress={RegistroPress}
          type="PRIMARY"
          size={350}
        />

        <Button
          text=" ¿Ya tienes una cuenta? Ingresar"
          onPress={SingInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-start", //la sube
    padding: 20,
    height: "100%",
    marginTop: 25,
  },
  fechaButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    width: 370,
    height: 45,
  },
  texto: {
    fontSize: 25,
    fontWeight: "bold",
  },
  texto2: {
    fontSize: 15,
    color: "gray",
    marginTop: 8,
    textAlign: "left",
    paddingBottom: 5,
  },
  texto3: {
    color: "#4D4DFF",
    fontSize: 13,
    marginTop: 10,
  },
  rol: {
    display: "none",
  },
});

export default Login;
