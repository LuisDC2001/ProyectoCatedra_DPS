<?php
    //Archivos requeridos
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\validations.php');
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\db_model.php');


    //require_once('./inc/db_model.php');
    //require_once('./inc/validations.php.php');
    //require_once('./inc/var_global.php.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para validaciones
    function validations($data){
        $value = true;
        emptyStringToNull($data);
        if (empty($data['id']) || is_nan(intval($data['id']))) {
            $value = false;
            echo showErrors(400, 'BAD REQUEST', 'El id está vacío o no es un número entero');
        }
        return $value;
    }

    //Función para seleccionar una oferta específica de alquileres o reservas
    function getRentbyId($dataRent){
        if (validations($dataRent)) {
            $id = $dataRent['id'];
            $dbModel = new Model();
            $query = "
                SELECT r.cantidadDias, r.precioDia, r.precioDiaExtra, r.descripcion, r.lugarEntrega, r.fechaEntrega, r.lugarDevolucion, r.idVehiculo
                FROM reserva AS r
                WHERE r.disponible = 1 AND r.id = $id AND r.fechaFila <= NOW()
                ORDER BY r.fechaFila DESC
                LIMIT 1";
            $rent = $dbModel->getQuery($query);
            $idVehiculo = $rent[0]['idVehiculo'];
            $query = "
                SELECT ma.nombre AS marca, mo.nombre AS modelo, tv.nombre AS tipo, v.year AS año, v.color, v.placa, v.imagen, v.idPropietario
                FROM vehiculo AS v
                     JOIN modelo mo ON v.idModelo = mo.id
                     JOIN marca ma ON mo.idMarca = ma.id
                     JOIN tipovehiculo tv ON v.idTipoVehiculo = tv.id
                WHERE v.id = $idVehiculo AND v.fechaFila <= NOW()
                LIMIT 1";
            $car = $dbModel->getQuery($query);
            $idPropietario = $car[0]['idPropietario'];
            $query = "
                SELECT CASE
                        WHEN p.idTipoPropietario = 1 THEN p.nombre
                        ELSE p.razonSocial
                       END AS nombre,
                       CASE
                        WHEN p.idTipoPropietario = 1 THEN p.apellido
                        ELSE p.nombreComercial
                       END AS apellido,
                       p.correoElectronico, p.telefono, p.fechaNacimiento
                FROM propietario AS p
                WHERE p.id = $idPropietario AND p.fechaFila <= NOW()
                LIMIT 1";
            $owner = $dbModel->getQuery($query);
            unset($car[0]['idPropietario']);
            $rent[0]['vehiculo'] = $car;
            $rent[0]['propietario'] = $owner;
            unset($rent[0]['idVehiculo']);
            return $rent;
        }
        return false;
    }

    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            if (!empty(getRentbyId($data))) {
                echo json_encode(getRentbyId($data));
            } else {
                echo showErrors(204, 'NO CONTENT');
            }
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }
?>