import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar los datos de la API
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch("http://192.168.0.13:80/ProyectoCatedra_DPS/api/rent/all.php");
      const data = await response.json();
      setApiData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const toggleFavorite = (vehicleId) => {
    setFavoriteVehicles((prevFavorites) => {
      if (prevFavorites.includes(vehicleId)) {
        return prevFavorites.filter((id) => id !== vehicleId);
      } else {
        return [...prevFavorites, vehicleId];
      }
    });
  };

  const saveFavoriteVehiclesToStorage = async () => {
    try {
      await AsyncStorage.setItem('favoriteVehicles', JSON.stringify(favoriteVehicles));
      console.log('Favoritos guardados con éxito');
    } catch (error) {
      console.error('Error al guardar favoritos en AsyncStorage:', error);
    }
  };

  const getFavoriteVehiclesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteVehicles');
      if (storedFavorites) {
        setFavoriteVehicles(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error al obtener favoritos desde AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getFavoriteVehiclesFromStorage();
  }, []);

  useEffect(() => {
    saveFavoriteVehiclesToStorage();
  }, [favoriteVehicles]);

  return (
    <AppContext.Provider value={{ favoriteVehicles, toggleFavorite, apiData, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
