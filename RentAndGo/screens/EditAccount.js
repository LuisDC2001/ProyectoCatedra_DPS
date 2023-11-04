import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, { useState,useEffect } from 'react';
import ReadInput from '../components/ReadInput';
import CustomInput from '../components/Input';
import Button from '../components/Button';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';




const Edit = () => {

    const [usuarioCorreo, setUsuarioCorreo] = useState("");
    const [nombreU, setNombre] = useState("");
    const [apellido, setapellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const navigation = useNavigation();

    const DataFromApi=async()=>{
        const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
          if (usuarioCorreo) {
            setUsuarioCorreo(usuarioCorreo);
          }
    
        await fetch('http://192.168.1.14:8080/ProyectoCatedra_DPS/api/user/allUserInfo.php',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({"correoElectronico": usuarioCorreo})  
            }).then(res=>res.json())
            .then(Data=>{
                console.log(Data.usuario);
              setNombre(Data.usuario[0].nombre);
              setapellido(Data.usuario[0].apellido);
              setTelefono(Data.usuario[0].telefono);          
            });
      };

    useEffect(() => {
        DataFromApi();
      }, []);

    const goback = () => {
        navigation.goBack();
    }

    const cambiarcontra = () => {
        navigation.navigate('Forgot2');
    }

    const ActualizarPress = async () => {
        // Validación de campos
      if (!usuarioCorreo || !nombreU || !apellido || !telefono) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      const telefonoValido = /^[0-9]{8}$/.test(telefono);
      if (!telefonoValido) {
        alert("Por favor, ingresa un número de teléfono válido (8 dígitos numéricos).");
        return;
      }
      if(!/^[a-zA-Z]+$/.test(nombreU)){
        alert("Por favor ingrese solamente valores de texto")
        return;
      }
      if(!/^[a-zA-Z]+$/.test(apellido)){
        alert("Por favor ingrese solamente valores de texto")
        return;
      }
    
        await fetch('http://192.168.1.14:8080/ProyectoCatedra_DPS/api/user/updateUserInfo.php',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body: JSON.stringify({"correoElectronico": usuarioCorreo,
          "nombre": nombreU,
          "apellido": apellido,
          "telefono": telefono,})  
      }).then(res=>res.json())
      .then(resData=>{
              alert(resData.message);
              if(resData.message==="Se ha actualizado la informacion del usuario"){
                  navigation.navigate('Cuenta');
              }
      });
    };


    return (
        <ScrollView>
            <View style={styles.root}>
                <View style={styles.header}>
                    <Button
                        onPress={goback}
                        icononame="chevron-left"
                        size={40}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.texto}>Editar Cuenta</Text>
                    </View>
                </View>
                <Text style={styles.texto2}>Actualiza o cambia tus datos</Text>
                <Text style={styles.texto3}>Correo Electrónico</Text>
                <ReadInput
                    placeholder="Ingresa tu correo electrónico"
                    value={usuarioCorreo}
                    setValue={setUsuarioCorreo}
                    readonly={true}
                />
                <Text style={styles.texto3}>Nombre</Text>
                <ReadInput
                    placeholder="Ingresa tu Nombre"
                    value={nombreU}
                    setValue={setNombre}
                />
                <Text style={styles.texto3}>Apellido</Text>
                <ReadInput
                    placeholder="Ingresa tu Apellido"
                    value={apellido}
                    setValue={setapellido}
                />

                <Text style={styles.texto3}>Número de teléfono</Text>
                <ReadInput
                    placeholder="+503 | Ingresa tu número de teléfono"
                    value={telefono}
                    onChangeText={(text) => setTelefono(text)}
                    keyboardtype='phone-pad'
                />
                <Text style={styles.texto3}>Contraseña</Text>
                <ReadInput
                    placeholder="******"
                    value=""
                    setValue=""
                    readonly={true}
                />

                <TouchableOpacity  onPress={cambiarcontra} >
                 <Text style={styles.cambiar}>Cambiar contraseña</Text>
                </TouchableOpacity>

                <Button
                    text="Guardar Cambios"
                    onPress={ActualizarPress}
                    type="PRIMARY"
                    
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'flex-start',
        padding: 20,
        height: '100%',
        marginTop: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    titleContainer: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 60,
        alignContent: 'center'
    },
    texto2: {
        fontSize: 15,
        color: 'gray',
        textAlign: 'left',
        marginBottom: 15
    },
    texto3: {
        color: '#4D4DFF',
        fontSize: 13,
        marginTop: 10
    },
    cambiar:{
        color:'#4D4DFF',
        textAlign:'right',
        marginTop:5
    }
});

export default Edit;
