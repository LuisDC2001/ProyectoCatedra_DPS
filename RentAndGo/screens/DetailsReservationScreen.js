import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useAppContext } from "../AppContext";
import Button from '../components/Button';

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { Id } = route.params;
  const { ReservationData, isLoading } = useAppContext();

  const goback = () => {
    navigation.goBack();
  };

  const reserveDetails = ReservationData.find((reserve) => reserve.id === Id);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!reserveDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.brandModel}>Vehículo no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={goback}
          icononame="chevron-left"
          size={60}
        />
      </View>

      <Text style={styles.brandModel}>
        {`${reserveDetails.marca} ${reserveDetails.modelo}`}
      </Text>

      <View style={styles.imageContainer}>
        <Image
          style={{ width: "100%", height: 200 }}
          source={{ uri: reserveDetails.imagen }}
        />
      </View>
      <ScrollView>
        <Text style={styles.specs}>Información de reserva</Text>

        <View style={styles.detailsContainer}>
        <Text style={styles.title}>Info reserva </Text>
          <Text style={styles.info}>
            <Text style={styles.title}>Fecha inicio: </Text>
            <Text style={styles.detalle}>{reserveDetails.fechaInicio}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.title}>Fecha fin: </Text>
            <Text style={styles.detalle}>{reserveDetails.fechaFin}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.title}>modelo: </Text>
            <Text style={styles.detalle}>{reserveDetails.modelo}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.title}>modelo: </Text>
            <Text style={styles.detalle}>{reserveDetails.modelo}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.title}>modelo: </Text>
            <Text style={styles.detalle}>{reserveDetails.modelo}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.title}>modelo: </Text>
            <Text style={styles.detalle}>{reserveDetails.modelo}</Text>
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    marginTop: 10,
  },
  specs: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    paddingBottom: 15,
  },
  brandModel: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
    paddingBottom: 9,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 9,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  detalle: {
    color: "gray",
    fontSize: 18,
  },
  preciotext: {
    marginTop: 15,
    fontSize: 28,
    color: "gray",
  },
  reserveButton: {
    padding: 10,
    backgroundColor: "#4D4DFF",
    borderRadius: 8,
    marginTop: 25,
    marginRight: 30,
    width: 200,
    height: 65,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 2,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  middleContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    bottom: 100,
  },
});

export default Details;
