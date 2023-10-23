import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const DateRangePicker = ({ route }) => {

    const { vehicleDetails } = route.params;

    const navigation = useNavigation();

    const goback = () => {
        navigation.goBack();
    }
    const reservar = () => {

        navigation.navigate('Confirm', {
            reservationData: {
              vehicleDetails: vehicleDetails, // Asegúrate de tener esta propiedad
              fechaInicio: selectedStartDate, // Agrega la fecha de inicio
              fechaFin: selectedEndDate, // Agrega la fecha de fin
              precioTotal: vehicleDetails.precioDia * calculateDateDifference(), // Calcula el precio total
            }
          });
          
    }


    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const onDayPress = (day) => {
        if (!selectedStartDate || selectedEndDate) {
            setSelectedStartDate(day.dateString);
            setSelectedEndDate(null);
        } else {
            setSelectedEndDate(day.dateString);
        }
    };

    const calculateDateDifference = () => {
        if (selectedStartDate && selectedEndDate) {
            const startDate = new Date(selectedStartDate);
            const endDate = new Date(selectedEndDate);
            const differenceInTime = endDate - startDate;
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            return differenceInDays;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button
                    onPress={goback}
                    icononame="chevron-left"
                    size={60}
                />
            </View>
            <Text style={styles.texto}>Selecciona tus fechas</Text>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={{
                        [selectedStartDate]: { selected: true, startingDay: true, color: 'green' },
                        [selectedEndDate]: { selected: true, endingDay: true, color: 'green' },
                    }}
                />
            </View>
            
    
           <Text>
           <Text style={{ color: "gray", fontSize: 28 }}>     Precio:  </Text>
            <Text style={{ color: "blue", fontSize: 32 }}>${vehicleDetails.precioDia * calculateDateDifference()}</Text>
           </Text>
            
            <TouchableOpacity style={styles.reserveButton} onPress={reservar}>
                <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    calendarContainer: {
        width: 400,
        backgroundColor: 'white',
        marginTop: 25,
        marginBottom: 25,
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reservar: {
        color: '#4D4DFF',
        textAlign: 'center',
        marginTop: 5
    },
    reserveButton: {
        padding: 5, // Aumenta el espacio alrededor del botón
        backgroundColor: '#4D4DFF',
        borderRadius: 8, // Agrega bordes redondeados al botón
        marginTop: 25,
        width: 200,
        height: 65,
        justifyContent:'center',
        marginLeft:100
      },
      buttonText: {
        color: 'white', // Cambia el color del texto del botón según tus necesidades
        fontSize: 24, // Aumenta el tamaño del texto del botón
        textAlign: "center",
        marginTop: 2,
      },
});

export default DateRangePicker;
