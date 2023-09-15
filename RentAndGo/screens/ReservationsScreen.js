import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Asegúrate de importar FontAwesome o la fuente de iconos que desees

const ReservationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la página de reservaciones</Text>
      {/* Add any other content you want for the FavoritesScreen */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReservationsScreen;
