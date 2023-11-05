<?php 
    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para determinar el estado de la reserva
    function stateRent($startRentDate){
        $dbModel = new Model();
        $startRentDate = date_format(date_create($startRentDate), 'Y-m-d');
        $actualDate = date_format(date_create(), 'Y-m-d');
        if ($startRentDate < $actualDate) {
            $value = false;
        } elseif ($startRentDate > $actualDate) {
            $query = "
                SELECT e.id  
                FROM estado AS e
                WHERE e.nombre = 'Reservada' AND e.fechaFila <= NOW()";
            $idState = $dbModel->getQuery($query)[0]['id'];
            $value = $idState;
        } else {
            $query = "
                SELECT e.id  
                FROM estado AS e
                WHERE e.nombre = 'Activa' AND e.fechaFila <= NOW()";
            $idState = $dbModel->getQuery($query)[0]['id'];
            $value = $idState;
        }
        return $value;
    }

    //Función para validaciones
    function validations($data){
        $dbModel = new Model();
        $value = true;
        $query = "
            SELECT 1 AS verificado
            FROM reserva AS r
            WHERE r.id = '".$data['idReserva']."' AND r.fechaFila <= NOW() AND r.disponible = 1
            LIMIT 1";
        if (empty($dbModel->getQuery($query))) {
            $value = false;
            $valueError = 'La reserva seleccionada ya no se encuentra disponible';
        }
        $idState = stateRent($data['fechaInicio']);
        if (!$idState) {
            $value = false;
            $valueError = 'Las fechas seleccionadas están fuera del rango';
        }
        if (!$value){
            echo showErrors(400, 'BAD REQUEST', $valueError);
        }
        return $value;
    }

    //Función para reservar una oferta
    function rent($data) {
        $dbModel = new Model();
        $data = emptyStringToNull($data);
        $value = validations($data);
        if ($value) {
            $query = "
                SELECT u.id
                FROM usuario AS u
                WHERE u.correoElectronico = '".$data['correoElectronico']."' AND u.fechaFila <= NOW()";
            $idUser = $dbModel->getQuery($query)[0]['id'];
            unset($query);
            $query[0] = "
                INSERT INTO usuario_reserva(fechaReserva, fechaInicio, fechaFin, idEstado, idUsuario, idReserva)
                VALUES (NOW(), :fechaInicio, :fechaFin, :idEstado, :idUsuario, :idReserva)";
            $data['idEstado'] = stateRent($data['fechaInicio']);
            $data['idUsuario'] = $idUser;
            $data['fechaInicio'] = date_format(date_create($data['fechaInicio']), 'Y-m-d');
            $data['fechaFin'] = date_format(date_create($data['fechaFin']), 'Y-m-d');
            unset($data['correoElectronico']);
            $params[0] = $data;
            $query[1] = "
                UPDATE reserva
                SET    disponible = 0
                WHERE  id = :idReserva";
            $params[1] = array('idReserva' => $data['idReserva']);
            return $dbModel->setTransactionQuery($query, $params);
        }
        return $value;
    }

    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            if (!empty(rent($data))) {
                echo showErrors(201, 'CREATED');
            }
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }

?>