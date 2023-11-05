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
        $actualDate = (new DateTime())->format('Y-m-d');
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
                WHERE e.nombre = 'Activo' AND e.fechaFila <= NOW()";
            $idState = $dbModel->getQuery($query)[0]['id'];
            $value = $idState;
        }
        return $value;
    }

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
            $value = showErrors(400, 'BAD REQUEST', 'La reserva seleccionada ya no se encuentra disponible');
        }
        else {
            $idState = stateRent($data['idReserva'], $data['fechaInicio']);
            if (empty($idState)) {
                $value = showErrors(400, 'BAD REQUEST', 'Las fechas seleccionadas están fuera del rango');
            } else {
                $query = "
                    SELECT u.id
                    FROM usuario AS u
                    WHERE u.correoElectronico = '".$data['correoElectronico']."' AND u.fechaFila <= NOW()";
                $idUser = $dbModel->getQuery($query)[0]['id'];
                $query[0] = "
                    INSERT INTO usuario_reserva(fechaReserva, fechaInicio, fechaFin, idEstado, idUsuario, idReserva)
                    VALUES (NOW(), :fechaInicio, :fechaFin, :idEstado, :idUsuario, :idReserva)";
                $data['idEstado'] = $idState;
                $data['idUsuario'] = $idUser;
                unset($data['correoElectronico']);
                $params[0] = $data;
                $query[1] = "
                    UPDATE reserva
                    SET    disponible = 0
                    WHERE  id = :idReserva";
                $params[1] = (array) $data['idReserva'];
                $dbModel->setTransactionQuery($query, $params);
            }
        }
        return $value;
    }

    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            if (rent($data) == true) {
                echo showErrors(201, 'CREATED');
            } else {
                echo rent($data);
            }
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }

?>