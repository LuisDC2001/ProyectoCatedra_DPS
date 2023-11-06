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
            SELECT r.id AS idReserva,
                   r.cantidadDias, 
                   r.precioDia, 
                   r.precioDiaExtra, 
                   r.descripcion, 
                   r.lugarEntrega, 
                   r.lugarDevolucion,
                   v.id,  
                   ma.nombre AS marca, 
                   mo.nombre AS modelo, 
                   tv.nombre AS tipo,
                   v.year AS año, 
                   v.color, 
                   v.placa, 
                   v.imagen, 
                   t.nombre AS transmision, 
                   v.pasajeros, 
                   v.motor, 
                   g.nombre AS gasolina, 
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
                 JOIN transmision AS t
                    ON v.idTransmision = t.id
                 JOIN gasolina AS g
                    ON v.idGasolina = g.id
            WHERE r.disponible = 1 
                  AND r.fechaFila <= NOW()
            ORDER BY r.fechaFila DESC ;";
        $rents = $dbModel->getQuery($query);
        foreach ($rents as $key => $value) {
            $rents[$key]['vehiculo'] = array(
                'id' => $rents[$key]['id'],
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
            unset($rents[$key]['id']);
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