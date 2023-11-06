<?php 
    //Archivos requeridos
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\validations.php');
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\db_model.php');

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