import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Logo from '../assets/img/logo.png';
import CustomInput from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = () => {
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [isContraVisible, setContraVisible] = useState(false);
    const navigation = useNavigation();



    const SignInPress = async () => {
        await fetch('http://192.168.1.14:8080/ProyectoCatedra_DPS/api/user/login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "correoElectronico": correo, "contrasena": contra })
        })
            .then(async (res) => {
                const resData = await res.json();
                alert(resData.message);
                if (resData.message === "Inicio de sesión exitoso") {
                    // Obtenemos la lista de usuarios en sesión actual
                    const usuariosEnSesion = await AsyncStorage.getItem('usuariosEnSesion');
                    const usuarios = usuariosEnSesion ? JSON.parse(usuariosEnSesion) : [];

                    // Verificamos si el usuario ya está en la lista
                    if (!usuarios.includes(correo)) {
                        // Agregamos al usuario a la lista
                        usuarios.push(correo);

                        // Actualizamos la lista de usuarios en sesión
                        await AsyncStorage.setItem('usuariosEnSesion', JSON.stringify(usuarios));
                    }

                   
                    await AsyncStorage.setItem('usuarioCorreo', correo);
                    console.log('Usuario almacenado en sesión:', correo);

                    navigation.navigate('HomeTab');
                    setCorreo("");
                    setContra("");
                }
            });
    }



    const ForgotPress = () => {
        navigation.navigate('Forgot');
    }

    const LogInPress = () => {
        navigation.navigate('SignUp');
    }

    const Google = () => {
        navigation.navigate('Google');
    }

    const ContraVisibility = () => {
        setContraVisible(!isContraVisible);
     
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Image source={Logo} style={styles.logo} resizeMode='contain' />
                <Text style={styles.texto}>Bienvenido de nuevo</Text>
                <Text style={styles.texto2}>Ingresa a tu cuenta utilizando tu correo electrónico registrado</Text>
                <CustomInput
                    placeholder="Correo electrónico"
                    value={correo}
                    setValue={setCorreo}
                    icononame="envelope"
                />

                <CustomInput
                    placeholder="Contraseña"
                    value={contra}
                    setValue={setContra}
                    secureTextEntry={!isContraVisible}
                    icononame="lock"
                    iconpassword={isContraVisible ? 'eye' : 'eye-slash'}
                    onPress={ContraVisibility} />
                <Button
                    text="¿Olvidaste tu contraseña?"
                    onPress={ForgotPress}
                    type="TERTIARY" />

                <Button
                    text="Ingresar"
                    onPress={SignInPress}
                    type="PRIMARY"
                    size={350} />

                <Button
                    text=" ¿Primera vez por aquí? Registrate"
                    onPress={LogInPress} type="TERTIARY" />

                <Text style={styles.texto3}>O ingresa con</Text>

                <Button
                    text="Google"
                    type="TWO"
                    onPress={Google}
                    bgcolor="#e3e3e3"
                    fgcolor="#4285F4"
                    icononame="google"
                    iconColor="#4285F4"
                    size={100} />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        height: '100%',
        marginTop: 100,
    },
    logo: {
        width: 300,
        height: 100,
        maxWidth: 300,

    },
    texto: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    texto2: {
        fontSize: 11,
        color: 'gray',
        flexWrap: 'wrap',
        maxWidth: '50%',
        marginTop: 8,
        textAlign: 'center',
    },
    texto3: {
        color: '#2C2B2D',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 20,

    },

});

export default SignInScreen;