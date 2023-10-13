import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [apiData, setApiData] = useState([]); // Agrega el estado para los datos de la API
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga de datos

  // Función para cargar los datos de la API
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch("http://192.168.1.14:80/ProyectoCatedra_DPS/api/rent/all.php");
      const data = await response.json();
      setApiData(data);
      setIsLoading(false); // Cuando los datos se carguen, establece isLoading en false
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      setIsLoading(false); // En caso de error, establece isLoading en false
    }
  };

  useEffect(() => {
    fetchDataFromApi(); // Carga los datos de la API al montar la aplicación
  }, []);

  const toggleFavorite = (vehicleId) => {
    const isAlreadyFavorite = favoriteVehicles.includes(vehicleId);

    if (isAlreadyFavorite) {
      const updatedFavorites = favoriteVehicles.filter((id) => id !== vehicleId);
      setFavoriteVehicles(updatedFavorites);
    } else {
      setFavoriteVehicles([...favoriteVehicles, vehicleId]);
    }
  };

  return (
    <AppContext.Provider value={{ favoriteVehicles, toggleFavorite, apiData, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
