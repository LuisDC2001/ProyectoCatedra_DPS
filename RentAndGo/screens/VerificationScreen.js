import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react';
import CustomInput from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';


const Verification = () => {

    const [codigo, setCodigo] = useState('');

    const navigation = useNavigation();

    const goback = () => {
        navigation.goBack();
    
    }

    const check = () => {
        navigation.navigate('NewPass');
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Button
                    onPress={goback}
                    icononame="chevron-left"
                    size={40}
                />
                <Text style={styles.texto}>Código de Verificación</Text>
                <Text style={styles.texto2}>Te hemos enviado un código, revisa tu correo</Text>

                <CustomInput
                    placeholder="Ingresa tu código"
                    value={codigo}
                    setValue={setCodigo}
                />

                <Button 
                    text="Verificar"
                    onPress={check}
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
        marginBottom:15
    },
   

});


export default Verification;