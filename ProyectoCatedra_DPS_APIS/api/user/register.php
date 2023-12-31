<?php
    //Archivos requeridos
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\validations.php'); //Cambiar por direccion local
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\db_model.php'); //Cambiar por direccion local
    
    //require_once('./inc/db_model.php');
    //require_once('./inc/validations.php.php');
    //require_once('./inc/var_global.php.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');
    
    //Función para validaciones
    function validations($data){
        $value = true;
        if (!validateEmail($data["correoElectronico"])) {
            $value = false;
        }
        if (!validatePassword($data["contrasena"])) {
            $value = false;
        }
        return $value;    
    }

    //Función para añadir usuario
    function insertUser($dataUser){
        $dbModel = new Model();
        $query[0] = "
            INSERT INTO usuario(correoElectronico, contrasena, nombre, apellido, fechaNacimiento, telefono, imagenPerfil, idNacionalidad, idRol) 
            VALUES (:correoElectronico, :contrasena, :nombre, :apellido, :fechaNacimiento, :telefono, :imagenPerfil, :idNacionalidad, :idRol)";
        $value = (validations($dataUser)) ? true : false ;
        $dataUser['contrasena'] = hash('sha256', $dataUser['contrasena']); //Contraseña cifrada
        $dataUser['fechaNacimiento'] = date_format(date_create($dataUser['fechaNacimiento']), 'Y-m-d'); //Formato de fecha de nacimiento
        $params[0] = (array) emptyStringToNull($dataUser);
        if ($value){
            return $dbModel->setTransactionQuery($query, $params);
        }
        return $value;
    }

    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            if (!empty(insertUser($data))) {
                echo showErrors(201, 'CREATED');
            } 
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }
?>