import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const lottieAnim = useRef(null);
  const textAnim = useRef(new Animated.Value(0)).current;
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Iniciar la animación de la animación Lottie
    lottieAnim.current.play();

    // Animación de entrada del texto (fade in)
    Animated.timing(textAnim, {
      toValue: 1,
      duration: 3000, // Duración de la animación de fade in
      useNativeDriver: true,
    }).start();

    // Verificar si hay un usuario en sesión en el AsyncStorage
    checkSesion();
  }, [textAnim]);

  const checkSesion = async () => {
    try {
      const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
      if (usuarioCorreo) {
        // Si hay un usuario en sesión, redirigir al Home
        setTimeout(() => {
          setShowAnimation(false); // Ocultar la animación
          navigation.replace('HomeTab');
        }, 4000);
      } else {
        // Si no hay un usuario en sesión, redirigir al SignIn
        setTimeout(() => {
          setShowAnimation(false); // Ocultar la animación
          navigation.replace('SignIn');
        }, 4000);
      }
    } catch (error) {
      console.error('Error al verificar la sesión del usuario:', error);
      // Redirigir al SignIn en caso de error
      setTimeout(() => {
        setShowAnimation(false); // Ocultar la animación
        navigation.replace('SignIn');
      }, 4000);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {showAnimation && (
        <LottieView
          ref={lottieAnim}
          source={require('../assets/splash.json')}
          autoPlay
          loop
          style={tw`w-[100] h-[100]`}
        />
      )}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textAnim,
          },
        ]}
      >
        <Text style={styles.text}>Rent & Go</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 200,
  },
  text: {
    fontSize: 32,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SplashScreen;
