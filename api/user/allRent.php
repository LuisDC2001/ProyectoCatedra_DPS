<?php 
    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');
    
    //Función para leer todas las reservas hechas por un usuario
    function allRent($data){
        $dbModel = new Model();
        $data = emptyStringToNull($data);
        $query = "
            SELECT u.id
            FROM usuario AS u
            WHERE u.correoElectronico = '".$data['correoElectronico']."' AND u.fechaFila <= NOW()";
        $idUser = $dbModel->getQuery($query)[0]['id'];
        if (!empty($idUser)) {
            $query = "
                SELECT ur.id,
                    ur.fechaReserva,
                    e.nombre AS estado,
                    ur.fechaInicio,
                    ur.fechaFin,
                    r.cantidadDias, 
                    r.precioDia, 
                    r.precioDiaExtra, 
                    r.lugarEntrega,
                    r.lugarDevolucion, 
                    ma.nombre AS marca, 
                    mo.nombre AS modelo, 
                    tv.nombre AS tipo,
                    v.year AS año, 
                    v.color, 
                    v.placa, 
                    v.imagen, 
                    CASE
                        WHEN p.idTipoPropietario = 1 THEN p.nombre
                        ELSE p.razonSocial
                    END AS nombre,
                    CASE
                        WHEN p.idTipoPropietario = 1 THEN p.apellido
                        ELSE p.nombreComercial
                    END AS apellido,
                    p.correoElectronico, 
                    p.telefono, 
                    p.fechaNacimiento
                FROM usuario_reserva AS ur
                    JOIN usuario AS u 
                        ON ur.idUsuario = u.id
                    JOIN estado AS e
                        ON ur.idEstado = e.id
                    JOIN reserva AS r
                        ON ur.idReserva = r.id
                    JOIN vehiculo AS v
                        ON r.idVehiculo = v.id
                    JOIN modelo AS mo 
                        ON v.idModelo = mo.id
                    JOIN marca AS ma 
                        ON mo.idMarca = ma.id
                    JOIN tipovehiculo AS tv 
                        ON v.idTipoVehiculo = tv.id
                    JOIN propietario AS p
                        ON v.idPropietario = p.id
                    JOIN transmision AS t
                        ON v.idTransmision = t.id
                    JOIN gasolina AS g
                        ON v.idGasolina = g.id
                WHERE ur.idUsuario = '".$idUser."' AND ur.fechaFila <= NOW()";
            $query .= "ORDER BY ur.fechaFila DESC";
            return $dbModel->getQuery($query);
        } else {
            return false;
        }
    }


    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            if (!empty(allRent($data))) {
                echo json_encode(allRent($data));
            }
            else {
                echo showErrors(204, 'NO CONTENT');
            } 
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }
?>