<?php 
    //Archivos requeridos
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\validations.php');
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\db_model.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para determinar el estado de la reserva
    function stateRent(){
        $dbModel = new Model();
        $query = "
            SELECT e.id  
            FROM estado AS e
            WHERE e.nombre = 'Finalizada' AND e.fechaFila <= NOW()";
        $idState = $dbModel->getQuery($query)[0]['id'];
        $value = (empty($idState)) ? false : $idState;
        return $value;
    }

    //Función para cancelar la reserva hecha
    function cancelRent($data) {
        $dbModel = new Model();
        $data = emptyStringToNull($data);
        $query = "
            SELECT u.id
            FROM usuario AS u
            WHERE u.correoElectronico = '".$data['correoElectronico']."' AND u.fechaFila <= NOW()";
        $idUser = $dbModel->getQuery($query)[0]['id'];
        $idState = stateRent();
        unset($query);
        $queryIdRent = "
            SELECT ur.id
            FROM usuario_reserva AS ur
            WHERE ur.idUsuario = '".$idUser."' AND ur.idReserva = '".intval($data['idReserva'])."' AND ur.fechaFila <= NOW()
            LIMIT 1";
        $query[0] = "
            UPDATE usuario_reserva
            SET    resena = :resena ,
                   idEstado = $idState
            WHERE  id = ($queryIdRent)";
        $params[0] = array('resena' => $data['reseña']);
        return $dbModel->setTransactionQuery($query, $params);
    }

    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            if (!empty(cancelRent($data))) {
                echo showErrors(200, 'OK', 'Reserva cancelada exitosamente');
            } 
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    } 
?>