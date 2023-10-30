<?php 
    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

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