import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const InputRead = ({ value, setValue, placeholder, keyboardtype, readonly }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[styles.input, readonly && styles.readonlyInput]}
        keyboardType={keyboardtype}
        editable={!readonly}
        />    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 9,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: 'gray',
    paddingVertical: 12,
   
  },
  readonlyInput: {
    backgroundColor: '#B5B5B5', // Fondo gris cuando es de solo lectura
    color: 'gray', // Texto gris cuando es de solo lectura
  },
});

export default InputRead;