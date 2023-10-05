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
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button'


const GoogleScreen = () => {

  const navigation = useNavigation();

  const goback = () => {
    navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Button
          onPress={goback}
          icononame="chevron-left"
          size={40}
        />
        <Text style={styles.text}>Esta es la página de tu cuenta</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'left',
    justifyContent: 'flex-start', 
    padding: 20,
    height: '100%',
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
    justifyContent:'center',
    marginTop:50
  },
});

export default GoogleScreen;