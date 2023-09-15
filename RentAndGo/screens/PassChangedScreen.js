import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';



const PassChanged = () => {

    const navigation = useNavigation();
    const lottieAnim = useRef(null);

    useEffect(() => {
        // Iniciar la animación de la animación Lottie
        lottieAnim.current.play();

        // Animación de entrada del texto (fade in)
    })

   

    const SignIn = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView>
            <View style={styles.root}>

                <LottieView
                    ref={lottieAnim}
                    source={require('../assets/check.json')}
                    autoPlay
                    loop
                    style={[tw`w-[70] h-[70] mx-auto`]}
                />

                <Text style={styles.texto}>¡Tu Contraseña ha cambiado!</Text>
                <Text style={styles.texto2}>Ya puedes volver e iniciar Sesión</Text>

                <Button
                    text="Iniciar Sesión"
                    onPress={SignIn}
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    texto2: {
        fontSize: 15,
        color: 'gray',
        marginTop: 8,
        textAlign: 'center',
        paddingBottom: 5,
        marginBottom: 15
    },


});


export default PassChanged;
