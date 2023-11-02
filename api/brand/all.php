<?php 
    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: GET');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para seleccionar todos las marcas
    function getAllBrands() {
        $dbModel = new Model();
        $query = "
            SELECT m.id, m.nombre
            FROM marca AS m
            WHERE m.fechaFila <= NOW()
            ORDER BY m.nombre";
        return $dbModel->getQuery($query);
    }

    //Ejecución de la API
    if (allowedMethod('GET')) {
        if (!empty(getAllBrands())) {
            echo json_encode(getAllBrands());
        } else {
            echo showErrors(204, 'NO CONTENT');
        }
    }
?>