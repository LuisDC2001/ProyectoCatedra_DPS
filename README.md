# RentAndGo APIs

Este archivo README proporciona las instrucciones necesarias para configurar y probar las APIs de RentAndGo en un entorno de desarrollo local.

## Requisitos previos

Asegúrese de tener instalado lo siguiente:

- Postman 
- Node.js y npm 

## Instalación de dependencias

Ejecute los siguientes comandos para instalar las bibliotecas PHP necesarias:

composer require phpmailer/phpmailer
composer require google/apiclient:"^2.0"

## Configuración de MailDev

Para probar el envio de correos, se instalará y ejecutará MailDev:

npm install -g maildev
maildev

MailDev se ejecutará en http://localhost:1080.

## Configuración de APIs en Postman

### google-login.php

Método: POST
URL: http://localhost/google-login.php
Headers: Content-Type (Key) & application/json
body: Seleccionar "raw" y escribir

{
    "email": "ejemplo123@gmail.com"
}

### send-verification.php

Método: POST
URL: http://localhost/send-verification.php
Body: Seleccionar "raw" y escribir

{
    "email": "ejemplo123@gmail.com"
}

### reservaVehiculo.php

Método: PSOT
URL: http://localhost/reservaVehiculo.php
Body: Seleccionar "x-www-form-urlencoded" y escribir (cómo ejemplo) lo siguiente

1. idVehiculo (Key) & 4 (Value)
2. cantidadDias (Key) & 3 (Value)
3. precioDia (Key) & 30.00 (Value)
4. precioDiaExtra (Key) & 35.00 (Value)
5. porcentajeComision (Key) & 10 (Value)
6. descripcion (Key) & reserva de prueba (Value)
7. lugarEntrega (Key) & Sucursal Centro (Value)
8. fechaEntrega (Key) & 2023-12-20 10:00:00 (Value)
9. lugarDevolucion (Key) & Sucursal Centro (Value)

### send-verificationReserva.php

Método: POST
URL: http://localhost/send-verificationReserva.php
Body: Seleccionar "raw" y escribir

{
    "idReserva": 3,
    "email": "cliente@correo.com"
}