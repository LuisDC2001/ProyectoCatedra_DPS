import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react';
import CustomInput from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';

const NewPass = () => {

    const [contra, setContra] = useState('');
    const [contranueva, setContranueva] = useState('');
    const [isContraVisible, setContraVisible] = useState(false);
    const [isContraVisible2, setContraVisible2] = useState(false);

    const navigation = useNavigation();

    const goback = () => {
        navigation.goBack();
    }

    const change = async() => {
        await fetch('http://192.168.0.13:80/ProyectoCatedra_DPS/api/user/nuevacontraseña.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"contrasena":contra,"confcontrasena":contranueva})  
        }).then(res=>res.json())
        .then(resData=>{
                //alert(resData.message);
                if(resData.message==="Se ha actualizado la contraseña"){
                    navigation.navigate('PassChanged');
                }
        });
    }

    const ContraVisibility = () => {
        setContraVisible(!isContraVisible);
       
    }

    const ContraVisibility2 = () => {
        setContraVisible2(!isContraVisible2);
        
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Button
                    onPress={goback}
                    icononame="chevron-left"
                    size={40}
                />
                <Text style={styles.texto}>Nueva Contraseña</Text>
                <Text style={styles.texto2}>Escribe a continuación tu nueva contraseña</Text>

                <Text style={styles.texto3}>Nueva Contraseña</Text>
                <CustomInput
                    placeholder="Ingrese su nueva contraseña"
                    value={contra}
                    setValue={setContra}
                    secureTextEntry={!isContraVisible}
                    iconpassword={isContraVisible ? 'eye' : 'eye-slash'}
                    onPress={ContraVisibility} />

                <Text style={styles.texto3}>Vuelva a ingresar su contraseña</Text>
                <CustomInput
                    placeholder="Ingrese su nueva contraseña"
                    value={contranueva}
                    setValue={setContranueva}
                    secureTextEntry={!isContraVisible2}
                    iconpassword={isContraVisible2 ? 'eye' : 'eye-slash'}
                    onPress={ContraVisibility2} />

                <Button
                    text="Cambiar Contraseña"
                    onPress={change}
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
        marginBottom: 15
    },
    texto3: {
        color: '#4D4DFF',
        fontSize: 13,
        marginTop: 10
    },

});


export default NewPass;