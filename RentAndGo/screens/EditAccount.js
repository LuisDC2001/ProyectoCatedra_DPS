import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import ReadInput from '../components/ReadInput';
import Button from '../components/Button';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";


const Edit = () => {

    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [numero, setnumero] = useState('');
    const [fecha, guardarFecha] = useState("");
    const [isContraVisible, setContraVisible] = useState(false);
    const navigation = useNavigation();


    const RegistroPress = () => {
        console.warn("Guardar Cambios")
    }

    const goback = () => {
        navigation.goBack();
    }

    const cambiarcontra = () => {
        console.warn("Cambiar contraseña")
    }


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
                    value={correo}
                    setValue={setCorreo}
                    readonly={true}
                />
                <Text style={styles.texto3}>Nombre</Text>
                <ReadInput
                    placeholder="Ingresa tu Nombre"
                    value={nombre}
                    setValue={setnombre}
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
                    value={numero}
                    setValue={setnumero}
                    keyboardtype='phone-pad'
                />
                <Text style={styles.texto3}>Contraseña</Text>
                <ReadInput
                    placeholder="Contraseña"
                    value={contra}
                    setValue={setContra}
                    readonly={true}
                />

                <TouchableOpacity  onPress={cambiarcontra} >
                 <Text style={styles.cambiar}>Cambiar contraseña</Text>
                </TouchableOpacity>

                <Button
                    text="Guardar Cambios"
                    onPress={RegistroPress}
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
