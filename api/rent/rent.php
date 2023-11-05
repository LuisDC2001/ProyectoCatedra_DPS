<?php 

    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para reservar una oferta
    function rent($data) {
        $dbModel = new Model();
        $data = emptyStringToNull($data);
        $value = true;
        //Validar si está disponible la reserva
        $query = "
            SELECT 1 AS verificado
            FROM reserva AS r
            WHERE r.id = '".$data['idReserva']."' AND r.fechaFila <= NOW() AND r.disponible = 1
            LIMIT 1";
        if ($dbModel->getQuery($query)[0]['verificado'] != 1) {
            $value = false;
        }
        if ($value) {
            $query = "
                SELECT e.id
                FROM estado AS e
                WHERE e.fechaFila <= NOW() AND e.nombre = ''";
            $idState = $dbModel->getQuery($query);
            $query = "
                INSERT INTO usuario_reserva()";
        }
        return $value;
    }


    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            rent($data);
             
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }
?>