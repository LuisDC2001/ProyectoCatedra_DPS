import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Logo from '../assets/img/logo.png';
import CustomInput from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';


const SignInScreen = () => {
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [isContraVisible, setContraVisible] = useState(false);
    const navigation = useNavigation();

    const SignInPress = () => {
        navigation.navigate('HomeTab');
    }

    const ForgotPress = () => {
        navigation.navigate('Forgot');
    }

    const LogInPress = () => {
        navigation.navigate('SignUp');
    }

    const Google = () => {
        console.warn("Registrate con Google")
    }

    const ContraVisibility = () => {
        setContraVisible(!isContraVisible);
        console.warn("Se cambia el estado de la contraseña")
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
                    onPress={ContraVisibility}/>
                <Button
                    text="¿Olvidaste tu contraseña?"
                    onPress={ForgotPress}
                    type="TERTIARY" />

                <Button
                    text="Ingresar"
                    onPress={SignInPress}
                    type="PRIMARY"
                    size={350}/>

                <Button
                    text=" ¿Primera vez por aquí? Registrate"
                    onPress={LogInPress} type="TERTIARY" />

                <Text style={styles.texto3}>O ingresa con</Text>

                <Button
                    text="Google"
                    onPress={Google}
                    bgcolor="#e3e3e3"
                    fgcolor="#363636"
                    icononame="google"
                    size={150} />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'flex-start', //la sube
        padding: 20,
        height: '100%',
        marginTop: 200,
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