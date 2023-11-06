import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [ReservationData, setReservationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usuarioCorreo, setUsuarioCorreo] = useState("");

  useEffect(() => {
    getUsuarioCorreoFromStorage();
  }, []);

  const getUsuarioCorreoFromStorage = async () => {
    try {
      const usuarioCorreo = await AsyncStorage.getItem("usuarioCorreo");
      if (usuarioCorreo) {
        setUsuarioCorreo(usuarioCorreo);
        // Cargar favoritos del usuario actual
        getFavoriteVehiclesFromStorage(usuarioCorreo);
      }
    } catch (error) {
      console.error(
        "Error al obtener el correo del usuario desde AsyncStorage:",
        error
      );
    }
  };

  // Función para cargar los datos de la API
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        "http://172.16.101.194:80/ProyectoCatedra_DPS_APIS/api/rent/all.php"
      );
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

   
  // Función para cargar los datos de la API
  const ReservationFromApi = async () => {
    try {
      const usuarioCorreo = await AsyncStorage.getItem('usuarioCorreo');
      if (usuarioCorreo) {
        setUsuarioCorreo(usuarioCorreo);
      }
      const response = await fetch(
        "http://172.16.101.194:80/ProyectoCatedra_DPS_APIS/api/user/allRent.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "correoElectronico": usuarioCorreo }),
        }
      );
      if (response.status === 204) {
        setApiData([]);
      } else {
        const data = await response.json();
        console.log("Data:", data);
        setReservationData(data);
        console.log(apiData);
      }
    } catch (error) {
      console.error("Error al encontrar reservas:", error);
    }
  };

  useEffect(() => {
    ReservationFromApi();
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
    if (usuarioCorreo && favoriteVehicles.length > 0) {
      try {
        await AsyncStorage.setItem(
          `favoriteVehicles_${usuarioCorreo}`,
          JSON.stringify(favoriteVehicles)
        );
        console.log("Favoritos guardados con éxito");
      } catch (error) {
        console.error("Error al guardar favoritos en AsyncStorage:", error);
      }
    }
  };

  const getFavoriteVehiclesFromStorage = async (userCorreo) => {
    try {
      const storedFavorites = await AsyncStorage.getItem(
        `favoriteVehicles_${userCorreo}`
      );
      if (storedFavorites) {
        setFavoriteVehicles(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error al obtener favoritos desde AsyncStorage:", error);
    }
  };

  useEffect(() => {
    saveFavoriteVehiclesToStorage();
  }, [favoriteVehicles, usuarioCorreo]);

  return (
    <AppContext.Provider
      value={{ favoriteVehicles, toggleFavorite, apiData, isLoading, ReservationData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
