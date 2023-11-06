import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';



const ReservationsConfirm = () => {

    const navigation = useNavigation();
    const lottieAnim = useRef(null);

    useEffect(() => {
        // Iniciar la animación de la animación Lottie
        lottieAnim.current.play();

       
    })

   

    const Reservations = () => {
        navigation.navigate('Reservas');
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                
                <Text style={styles.texto}>¡Reserva exitosa!</Text>
                <LottieView
                    ref={lottieAnim}
                    source={require('../assets/check.json')}
                    autoPlay
                    loop
                    style={[tw`w-[70] h-[70] mx-auto`]}
                />

                <Text style={styles.texto}>¡Que comience la aventura!</Text>
                <Text style={styles.texto2}>Ya puedes ir a observar los detalles de tu reserva en el apartado de tus reservas</Text>

                <Button
                    text="Ir a mis reservas"
                    onPress={Reservations}
                    type="PRIMARY"
                     />
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    root: {
        alignItems: 'left',
        justifyContent: 'flex-start', 
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


export default ReservationsConfirm;
