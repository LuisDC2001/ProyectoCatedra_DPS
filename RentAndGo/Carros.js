const Carros = [
    {
      id: 1,
      brand: "Chevrolet",
      model: "Trax",
      year: "2017",
      price: 60,
      type: "SUV",
      transmission: "Automatico",
      passengers: 5,
      engine:"1.4 litros",
      fuel: "Regular",
      image: require("./assets/img/carro1.png"),
    },
    {
      id: 2,
      brand: "Toyota",
      model: "Corolla",
      year: "2018",
      price: 50,
      type: "hatchback",
      transmission: "Automatico",
      passengers: 4,
      engine:"1.8 litros",
      fuel: "Regular",
      image: require("./assets/img/carro2.png"),
    },
    {
      id: 3,
      brand: "Honda",
      model: "Civic",
      price: 55,
      year: "2020",
      type: "sedan",
      transmission: "Automatico",
      passengers: 5,
      engine:"1.6 litros",
      fuel: "Regular",
      image: require("./assets/img/carro3.png"),
    },
    // Agrega más vehículos según sea necesario
  ];
  
  export default Carros;