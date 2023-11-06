# ProyectoCatedra_DPS
Creación de una aplicación enfocada en la renta de carros, a presentar en la materia Diseño y Programación de Software Multiplataforma
# Prerrequisitos de instalación 📋
Para poder utilizar esta aplicación, se debe contar con el IDE Android Studio además de tener las instalaciones pertinentes para el uso de React Native
# Herramientas 🛠️
  •	Node JS: https://nodejs.org/en/download
  
  •	React Native: https://reactnative.dev/docs/environment-setup
  
  •	PHP: https://www.php.net/downloads.php
  
  •	Expo: https://expo.dev/accounts/ortega02
  
  •	Android Studio: https://developer.android.com/studio?gclid=CjwKCAjw3dCnBhBCEiwAVvLcu5ppXNkn6NE6RO-uDZg624xgJq-6Nc7LXugFbvKSAe2Tp_1x6QAjVhoCcYcQAvD_BwE&gclsrc=aw.ds
  
  •	Visual Studio Code: https://code.visualstudio.com/download
  
  •	GitHub: https://github.com/
  
  •	Trello: https://trello.com/
  
  •	Figma: https://www.figma.com/
  
  •	Canva: https://www.canva.com/es_mx/
  
# Guía de instalación 💻
  •	Primero se debe cumplir con todos los prerrequisitos de instalación
  
  •	Seleccionar una carpeta de su equipo local donde clonará y almacenará el repositorio
  
  •	Ya dentro de esta carpeta, hacer clic derecho y  abrir "Git Bash" , luego ejecute el comando git clone https://github.com/LuisDC2001/ProyectoCatedra_DPS esto le permitirá conectarse al repositorio del proyecto.
  
  •	Una vez esté conectado al repositorio y haya creado su rama, puede proceder a realizar pruebas de la aplicación desde su equipo local, para lo que será necesario abrir el proyecto desde su Android Studio.
  
# Autores ✒️
  •	Anthony Eduardo Ortega Cruz -programador frontend 
  
  •	Fernando Ernesto Bonilla Orellana -analista de calidad y programador backend 
  
  •	Erika Abigail Acuña Melara -programador frontend 
  
  •	Luis Alberto Del Cid Rivera -programador backend 
  
  •	Cristian Enrique Pineda Muñoz -programador backend 
  
# Licencia 📄
El proyecto se encuentra bajo la licencia Creative Commons, la forma en la que la licencia será incluida en el proyecto es usando el icono correspondiente de la licencia, el cual es facilitado en la página oficial de Creative Commons, en un apartado del proyecto incluyendo el ícono y cualquier otra información relevante y correspondiente a ello

# Enlaces de interés 👀
  •	Link diseños Mock Ups: https://www.figma.com/file/ey8PkUxrZRnxbpSEUHKMeA/DPS-Proyect?type=design&node-id=11%3A19&mode=design&t=17Z3wNtyLCKI04Pt-1

  •	Link documento Mock Ups: https://drive.google.com/file/d/1dL8liVXH36wzZBL3QBRfbCETNMjd9mmo/view?usp=sharing

  •	Link Trello: https://trello.com/b/4XxUg6AV/proyecto-de-cátedra-dps104-g01t-grupo-04
  
  •	Link de drive con las manuales de usuario y tecnicos : https://drive.google.com/drive/folders/16T3UvJ2C6CRczAn_w3q-oUZRY8fhddgi

  •	Link video demostración segunda entrega: https://drive.google.com/file/d/193eHiR-UfOyaXyFRYT4epXYS0UhVKboH/view?usp=sharing

# Estructura del proyecto


  El presente repositorio, consta de dos carpetas, la carpeta RentAndGo la cual contiene lo referente a la aplicación, y la carpeta ProyectoDPS_APIS que contiene lo referentes a las apis desarrolladas en el backend

  

  - RentAndGo (a continuación se desglosan las carpetas y archivos más relevantes)

  
      - android: todo lo referente a react native para android

      
      - assets: contiene archivos multimedia tales como imagenes o animaciones utilizadas en la aplicación

      
      - components: carpeta que contiene componentes necesarios a utilizar para la creación de algunas pantallas

      
      - screens: contiene todas las pantallas desarrolladas
          - AccountScreen.js
          - CalendarScreen.js
          - ConfirmScreen.js
          - DetailsScreen.js
          - EditAccount.js
          - FavoritesScreen.js
          - FilterScreen.js
          - ForgotPassScreen.js
          - ForgotPassScreen2.js
          - HomeScreen.js
          - NewPassScreen.js
          - PassChangedScreen.js
          - ReservationsConfirmScreen.js
          - ReservationsScreen.js
          - SignInScreen.js
          - SignUpScreen.js
          - SplashScreen.js
          - VerificationScreen.js
            
      - App.js: En este archivo se definen las distintas pantallas disponibles y las rutas para la navegación hacia las mismas, también se establece un contexto de aplicación mediante un AppProvider para compartir estados entre pantallas
        
      - AppContext.js: Define el manejo de estados e información para el manejo de funcionalidades como Favoritos y Detalles
   
        
  - ProyectoDPS_APIS: Se dividen carpeta de api y inc, donde api es donde están los archivos .php que sirven para interpretar las solicitudes

    
      - api: Se divide a su vez en carpetas según la tabla en la base de datos a la que hace referencia
        
        - brand:
          
          - all.php: API para obtener marcas de carros
            
        - nationality:
          
          - all.php: API para obtener listado de nacionalidades
            
        - rent:
          
          - all.php: API para obtener listado de carros
            
          - filter.php: API para manejo de filtros desde la aplicación
            
        - transimision:
          
          - all.php: API para obtener listado de tipos de transmisión de los carros
            
        - typeOfCar:
          
          - all.php: API para obtener listado de tipos de carro
            
        - user:
          
          - PHPMailer: Carpeta que contiene las librerias necesarias para el envio de correos
            
          - allUserInfo.php: API para obtener la información del usuario
            
          - codigoVerificacion.php: API para validar codigo de verificación en el apartado de cambio de contraseñas
            
          - login.php: API para el manejo del inicio de sesión
            
          - nuevaContraseña.php: API para el manejo de cambio de contraseña
            
          - recuperarPass.php: API para la recuperación de contraseña
            
          - register.php: API para el registro de usuarios
            
          - updateUserInfo: API para el manejo de actualización de datos del usuario
            
      - inc:  Los archivos o carpetas necesarias para correr las distintas apis
        
        - dbmodel.php: Contiene la lógica de conexión a la base de datos
          
        - validations.php: Contiene las distintas validaciones para las apis
           
      - rent_go.sql: Script referente a la base de datos utilizada
          
