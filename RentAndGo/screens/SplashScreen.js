import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';

const SplashScreen = ({ navigation }) => {
  const lottieAnim = useRef(null);
  const textAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Iniciar la animación de la animación Lottie
    lottieAnim.current.play();

    // Animación de entrada del texto (fade in)
    Animated.timing(textAnim, {
      toValue: 1,
      duration: 3000, // Duración de la animación de fade in
      useNativeDriver: true,
    }).start();

    // Navegar a la siguiente pantalla después de 4 segundos
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 4000);
  }, [navigation, textAnim]);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <LottieView
        ref={lottieAnim}
        source={require('../assets/splash.json')}
        autoPlay
        loop
        style={tw`w-[100] h-[100]`}
      />
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
    bottom: 200, // Ajusta el valor según tus necesidades para la distancia vertical
  },
  text: {
    fontSize: 32,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SplashScreen;
