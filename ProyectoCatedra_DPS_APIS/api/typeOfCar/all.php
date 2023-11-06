<?php 
    //Archivos requeridos
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\validations.php');
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\db_model.php');
    
    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: GET');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para seleccionar todos las nacionalidades
    function getAllTypesOfCars() {
        $dbModel = new Model();
        $query = "
            SELECT tv.id, tv.nombre
            FROM tipovehiculo AS tv
            WHERE tv.fechaFila <= NOW()
            ORDER BY tv.nombre";
        return $dbModel->getQuery($query);
    }

    //Ejecución de la API
    if (allowedMethod('GET')) {
        if (!empty(getAllTypesOfCars())) {
            echo json_encode(getAllTypesOfCars());
        } else {
            echo showErrors(204, 'NO CONTENT');
        }
    }
?>