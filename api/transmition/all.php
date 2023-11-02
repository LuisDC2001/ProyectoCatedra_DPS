<?php 
    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: GET');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para seleccionar todos los tipos de transmisión
    function getAllTransmitions() {
        $dbModel = new Model();
        $query = "
            SELECT t.id, t.nombre
            FROM transmision AS t
            WHERE t.fechaFila <= NOW()
            ORDER BY t.nombre";
        return $dbModel->getQuery($query);
    }

    //Ejecución de la API
    if (allowedMethod('GET')) {
        if (!empty(getAllTransmitions())) {
            echo json_encode(getAllTransmitions());
        } else {
            echo showErrors(204, 'NO CONTENT');
        }
    }
?>