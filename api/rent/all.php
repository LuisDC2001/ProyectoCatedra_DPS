<?php 
    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: GET');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para seleccionar todos las ofertas de alquileres o reservas
    function getAllRents() {
        $dbModel = new Model();
        //$date = new DateTime('now', new DateTimeZone('America/El_Salvador'));
        //$actualDateTime = $date->format('Y-m-d H:i:s');
        //echo $actualDateTime;
        $query = "
            SELECT r.cantidadDias, r.precioDia, r.precioDiaExtra, r.descripcion, r.lugarEntrega, r.fechaEntrega, r.lugarDevolucion, r.idVehiculo
            FROM reserva AS r
            WHERE r.disponible = 1 AND r.fechaFila <= NOW()
            ORDER BY r.fechaFila DESC";
        $rent = $dbModel->getQuery($query);
        foreach ($rent as $key => $value) {
            $idVehiculo = $rent[$key]['idVehiculo'];
            $query = "
                SELECT ma.nombre AS marca, mo.nombre AS modelo, tv.nombre AS tipo, v.year AS año, v.color, v.placa, v.imagen, v.transmision, v.pasajeros, v.motor, v.gasolina, v.idPropietario
                FROM vehiculo AS v
                     JOIN modelo mo ON v.idModelo = mo.id
                     JOIN marca ma ON mo.idMarca = ma.id
                     JOIN tipovehiculo tv ON v.idTipoVehiculo = tv.id
                WHERE v.id = ".$idVehiculo. " AND v.fechaFila <= NOW()
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
                WHERE p.id = ".$idPropietario. " AND p.fechaFila <= NOW()
                LIMIT 1";
            $owner = $dbModel->getQuery($query);
            unset($car[0]['idPropietario']);
            $rent[$key]['vehiculo'] = $car;
            $rent[$key]['propietario'] = $owner;
            unset($rent[$key]['idVehiculo']);
        }
        return $rent;
    }

    //Ejecución de la API
    if (allowedMethod('GET')) {
        if (!empty(getAllRents())) {
            echo json_encode(getAllRents());
        } else {
            echo showErrors(204, 'NO CONTENT');
        }
    }
?>