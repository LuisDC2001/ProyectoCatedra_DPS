import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import LottieView from 'lottie-react-native';
import tw from 'twrnc';



const FilterScreen = () => {

  const lottieAnim = useRef(null);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // Iniciar la animación de la animación Lottie
    lottieAnim.current.play();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Icon name="close" size={24} />
      </TouchableOpacity>
      <LottieView
        ref={lottieAnim}
        source={require('../assets/under.json')}
        autoPlay
        loop
        style={tw`w-[80] h-[80]`}
      />
      <Text style={styles.text}>Página de Reservas en construcción</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  goBackButton: {
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 25,
    padding: 10,
  },
});

export default FilterScreen;
