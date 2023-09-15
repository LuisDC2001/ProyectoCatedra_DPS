import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react';
import CustomInput from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';


const Login = () => {
    {/*capturando valores*/ }
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [numero, setnumero] = useState('');
    const [DUI, setDUI] = useState('');

    const [isContraVisible, setContraVisible] = useState(false);

    const navigation = useNavigation();

    {/*eventos botones */ }
    const RegistroPress = () => {
        navigation.navigate('SignIn');
    }

    const SingInPress = () => {
        navigation.navigate('SignIn');
    }

    const ContraVisibility = () => {
        setContraVisible(!isContraVisible);
        console.warn("Se cambia el estado de la contraseña")
    }

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
                <Text style={styles.texto3}>DUI</Text>
                <CustomInput
                    placeholder="Ingresa tu DUI"
                    value={DUI}
                    setValue={setDUI}
                    //teclado de numeros
                    keyboardtype='phone-pad'

                />
                <Text style={styles.texto3}>Número de teléfono</Text>
                <CustomInput
                    placeholder="+503 | Ingresa tu número de teléfono"
                    value={numero}
                    setValue={setnumero}
                    //teclado de numeros
                    keyboardtype='phone-pad'
                    />
               
                <Text style={styles.texto3}>Contraseña</Text>

                <CustomInput
                    placeholder="Contraseña"
                    value={contra}
                    setValue={setContra}
                    secureTextEntry={!isContraVisible}
                    iconpassword={isContraVisible ? 'eye' : 'eye-slash'}
                    onPress={ContraVisibility} />
                <Button
                    text="Registrarse"
                    onPress={RegistroPress}
                    type="PRIMARY"
                    size={350} />

                <Button
                    text=" ¿Ya tienes una cuenta? Ingresar"
                    onPress={SingInPress} type="TERTIARY" />




                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'flex-start', //la sube
        padding: 20,
        height: '100%',
        marginTop: 25,
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    texto2: {
        fontSize: 15,
        color: 'gray',
        marginTop: 8,
        textAlign: 'left',
        paddingBottom: 5,
    },
    texto3: {
        color: '#4D4DFF',
        fontSize: 13,
        marginTop: 10
    },
    
});

export default Login;