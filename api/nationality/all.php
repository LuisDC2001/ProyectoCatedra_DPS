<?php 
    //Archivos requeridos
    require_once('C:\xampp\htdocs\ProyectoCatedra_DPS\inc\var_global.php');
    require_once('C:\xampp\htdocs\ProyectoCatedra_DPS\inc\validations.php');
    require_once('C:\xampp\htdocs\ProyectoCatedra_DPS\inc\db_model.php');

    //require_once('./inc/db_model.php');
    //require_once('./inc/validations.php.php');
    //require_once('./inc/var_global.php.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: GET');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para seleccionar todos las nacionalidades
    function getAllNationalities() {
        $dbModel = new Model();
        $query = "
            SELECT n.id, n.nombre
            FROM nacionalidad AS n
            ORDER BY nombre";
        return $dbModel->getQuery($query);
    }

    //Ejecución de la API
    if (allowedMethod('GET')) {
        if (!empty(getAllNationalities())) {
            echo json_encode(getAllNationalities());
        } else {
            echo showErrors(204, 'NO CONTENT');
        }
    }
?>