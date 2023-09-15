import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react';
import CustomInput from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';

const ForgotPass = () => {

    const [correo, setCorreo] = useState('');

    const navigation = useNavigation();

    const goback = () => {
        navigation.goBack();
    
    }

    const send = () => {
        navigation.navigate('Verification');
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Button
                    onPress={goback}                
                    icononame="chevron-left"
                    size={40}
                />
                <Text style={styles.texto}>¿Olvidaste tu Contraseña?</Text>
                <Text style={styles.texto2}>Ingresa tu correo electrónico para poder enviarte un código verificación</Text>

                <CustomInput
                    placeholder="Correo electrónico"
                    value={correo}
                    setValue={setCorreo}
                    icononame="envelope"
                />

                <Button 
                    text="Enviar Código"
                    onPress={send}
                    type="PRIMARY"
                    size={350} />
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    root: {
        alignItems: 'left',
        justifyContent: 'flex-start', //la sube
        padding: 20,
        height: '100%',
        marginTop: 30,
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    texto2: {
        fontSize: 15,
        color: 'gray',
        marginTop: 8,
        textAlign: 'center',
        paddingBottom: 5,
        marginBottom:15,
        flexWrap: 'wrap',
    },
   

});


export default ForgotPass;