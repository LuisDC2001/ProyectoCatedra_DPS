import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);

  const toggleFavorite = (vehicleId) => {
    const isAlreadyFavorite = favoriteVehicles.includes(vehicleId);
  
    if (isAlreadyFavorite) {
      const updatedFavorites = favoriteVehicles.filter((id) => id !== vehicleId);
      setFavoriteVehicles(updatedFavorites);
    } else {
      setFavoriteVehicles([...favoriteVehicles, vehicleId]);
      console.warn("Agregado a favoritos");
    }
    console.log("favoriteVehicles:", favoriteVehicles);
  };

  return (
    <AppContext.Provider value={{ favoriteVehicles, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
