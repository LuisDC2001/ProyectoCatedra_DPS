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

    const send = async() => {

        await fetch('http://192.168.1.14:8080/ProyectoCatedra_DPS/api/user/recuperarpass.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"correoElectronico": correo})  
        }).then(res=>res.json())
        .then(resData=>{
                alert(resData.message);
                if(resData.message === "Se ha enviado el codigo a su correo"){
                    navigation.navigate('Verification');
                }
        });
    }

    const sendcode=()=>{
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