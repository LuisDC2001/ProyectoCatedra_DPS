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
        $rents = array();
        $query = "
            SELECT r.cantidadDias, 
                   r.precioDia, 
                   r.precioDiaExtra, 
                   r.descripcion, 
                   r.lugarEntrega, 
                   r.fechaEntrega, 
                   r.lugarDevolucion, 
                   ma.nombre AS marca, 
                   mo.nombre AS modelo, 
                   tv.nombre AS tipo, 
                   v.year AS año, 
                   v.color, 
                   v.placa, 
                   v.imagen, 
                   v.transmision, 
                   v.pasajeros, 
                   v.motor, 
                   v.gasolina, 
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
            FROM reserva AS r
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
            WHERE r.disponible = 1 
                  AND r.fechaFila <= NOW()
            ORDER BY r.fechaFila DESC ;";
        $rents = $dbModel->getQuery($query);
        foreach ($rents as $key => $value) {
            $rents[$key]['vehiculo'] = array(
                'marca' => $rents[$key]['marca'],
                'modelo' => $rents[$key]['modelo'],
                'tipo' => $rents[$key]['tipo'],
                'año' => $rents[$key]['año'],
                'color' => $rents[$key]['color'],
                'placa' => $rents[$key]['placa'],
                'imagen' => $rents[$key]['imagen'],
                'transmision' => $rents[$key]['transmision'],
                'pasajeros' =>  $rents[$key]['pasajeros'],
                'motor' => $rents[$key]['motor'],
                'gasolina' =>  $rents[$key]['gasolina']
            );
            $rents[$key]['propietario'] = array(
                'nombre' => $rents[$key]['nombre'],
                'apellido' => $rents[$key]['apellido'],
                'correoElectronico' => $rents[$key]['correoElectronico'],
                'telefono' => $rents[$key]['telefono'],
                'fechaNacimiento' => $rents[$key]['fechaNacimiento']
            );
            unset($rents[$key]['marca']);
            unset($rents[$key]['modelo']);
            unset($rents[$key]['tipo']);
            unset($rents[$key]['año']);
            unset($rents[$key]['color']);
            unset($rents[$key]['placa']);
            unset($rents[$key]['imagen']);
            unset($rents[$key]['transmision']);
            unset($rents[$key]['pasajeros']);
            unset($rents[$key]['motor']);
            unset($rents[$key]['gasolina']);
            unset($rents[$key]['nombre']);
            unset($rents[$key]['apellido']);
            unset($rents[$key]['correoElectronico']);
            unset($rents[$key]['telefono']);
            unset($rents[$key]['fechaNacimiento']);
        }
        return $rents;

        /*$query = "
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
        return $rent;*/
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