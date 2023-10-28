<?php

    //Archivos requeridos
    require_once('../../inc/db_model.php');
    require_once('../../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    //Función para filtrar ofertas de alquileres o reservas
    function filterRents($search){
        $dbModel = new Model();
        $filterRents = array();
        $search = emptyStringToNull($search);
        $filterTypeOfCar = "
            SELECT tv.nombre
            FROM tipovehiculo AS tv
            WHERE tv.fechaFila <= NOW() AND tv.nombre LIKE '".$search['tipoVehiculo']."'";
        $filterBrand = "
            SELECT m.nombre
            FROM marca AS m
            WHERE m.fechaFila <= NOW() AND m.nombre LIKE '".$search['marca']."'";
        $filterTransmition = "
            SELECT v.transmision
            FROM vehiculo AS v
            WHERE v.fechaFila <= NOW() AND v.transmision LIKE '".$search['transmision']."'";
        $filterYear = "
            SELECT v.year
            FROM vehiculo AS v
            WHERE v.fechaFila <= NOW() AND v.year = '".$search['año']."'";
        $filterPassengers = "
            SELECT v.pasajeros
            FROM vehiculo AS v
            WHERE v.fechaFila <= NOW() AND v.pasajeros = '".$search['pasajeros']."'"; 
        $filterPrices = "
            SELECT r.precioDia
            FROM reserva AS r
            WHERE r.fechaFila <= NOW() AND (r.precioDia BETWEEN '".$search['precioMinimo']."' AND '".$search['precioMaximo']."')";  
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
                  AND r.fechaFila <= NOW()";
        if (isset($search['tipoVehiculo'])) {
            $query .= "AND tv.nombre IN ($filterTypeOfCar)";
        }
        if (isset($search['marca'])) {
            $query .= "AND ma.nombre IN ($filterBrand)";
        }
        if (isset($search['transmision'])) {
            $query .= "AND v.transmision IN ($filterTransmition)";
        }
        if (isset($search['año'])) {
            $query .= "AND v.year IN ($filterYear)";
        }
        if (isset($search['pasajeros'])) {
            $query .= "AND v.pasajeros IN ($filterPassengers)";
        }
        if (isset($search['precioMinimo'])) {
            $query .= "AND r.precioDia IN ($filterPrices)";
        }
        $query .= "ORDER BY r.fechaFila DESC ;";
        $filterRents = $dbModel->getQuery($query);
        foreach ($filterRents as $key => $value) {
            $filterRents[$key]['vehiculo'] = array(
                'marca' => $filterRents[$key]['marca'],
                'modelo' => $filterRents[$key]['modelo'],
                'tipo' => $filterRents[$key]['tipo'],
                'año' => $filterRents[$key]['año'],
                'color' => $filterRents[$key]['color'],
                'placa' => $filterRents[$key]['placa'],
                'imagen' => $filterRents[$key]['imagen'],
                'transmision' => $filterRents[$key]['transmision'],
                'pasajeros' =>  $filterRents[$key]['pasajeros'],
                'motor' => $filterRents[$key]['motor'],
                'gasolina' =>  $filterRents[$key]['gasolina']
            );
            $filterRents[$key]['propietario'] = array(
                'nombre' => $filterRents[$key]['nombre'],
                'apellido' => $filterRents[$key]['apellido'],
                'correoElectronico' => $filterRents[$key]['correoElectronico'],
                'telefono' => $filterRents[$key]['telefono'],
                'fechaNacimiento' => $filterRents[$key]['fechaNacimiento']
            );
            unset($filterRents[$key]['marca']);
            unset($filterRents[$key]['modelo']);
            unset($filterRents[$key]['tipo']);
            unset($filterRents[$key]['año']);
            unset($filterRents[$key]['color']);
            unset($filterRents[$key]['placa']);
            unset($filterRents[$key]['imagen']);
            unset($filterRents[$key]['transmision']);
            unset($filterRents[$key]['pasajeros']);
            unset($filterRents[$key]['motor']);
            unset($filterRents[$key]['gasolina']);
            unset($filterRents[$key]['nombre']);
            unset($filterRents[$key]['apellido']);
            unset($filterRents[$key]['correoElectronico']);
            unset($filterRents[$key]['telefono']);
            unset($filterRents[$key]['fechaNacimiento']);
        }
        return $filterRents;     
    }

    //Ejecución de la API
    if (allowedMethod()) {
        //Obtener la información
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            if (!empty(filterRents($data))) {
                echo json_encode(filterRents($data));
            }
            else {
                echo showErrors(204, 'NO CONTENT');
            } 
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }

?>