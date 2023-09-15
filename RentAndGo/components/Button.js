import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ onPress, text, type, bgcolor, fgcolor, icononame,size}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.container,
                styles[`container_${type}`],
                bgcolor ? { backgroundColor: bgcolor } : {},
                size ? {width: size} : {}]}>
                {icononame ? (
                    <Icon name={icononame} style={styles.icon} />
                ) : null}
                <Text
                    style={[styles.text,
                    styles[`text_${type}`],
                    fgcolor ? { color: fgcolor } : {}]}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        marginTop:5
    },
    container_PRIMARY: {
        backgroundColor: '#4D4DFF',
        marginTop:15
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    text_TERTIARY: {
        color: '#4D4DFF',
        fontSize: 16,
        marginTop: 0.1
    },

})
export default Button;