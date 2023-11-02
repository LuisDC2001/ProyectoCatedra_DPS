<?php
// Se importan las bibliotecas y archivos necesarios
require_once(__DIR__ . '/../inc/config.php');
require_once(__DIR__ . '/../inc/db_model.php');
require_once(__DIR__ . '/../inc/validations.php');

class ReservaAPI extends Model
{
    // Método para reservar un vehículo
    public function reserveVehicle($idVehiculo, $cantidadDias, $precioDia, $precioDiaExtra, $porcentajeComision, $descripcion, $lugarEntrega, $fechaEntrega, $lugarDevolucion)
    {
        // Verificamos si el vehículo está disponible para las fechas solicitadas
        $query = "SELECT * FROM reserva WHERE idVehiculo = ? AND fechaEntrega <= ? AND fechaEntrega + INTERVAL cantidadDias DAY >= ? AND disponible = 1";
        $params = array($idVehiculo, $fechaEntrega, $fechaEntrega);
        $result = $this->getQuery($query, $params);

        // Si el vehículo no está disponible, devolvemos un error
        if ($result) {
            return showErrors(400, "El vehículo ya está reservado para las fechas seleccionadas.");
        }

        // Si el vehículo está disponible, insertamos la reserva en la base de datos
        $query = "INSERT INTO reserva (idVehiculo, cantidadDias, precioDia, precioDiaExtra, porcentajeComision, descripcion, lugarEntrega, fechaEntrega, lugarDevolucion, disponible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)";
        $params = array($idVehiculo, $cantidadDias, $precioDia, $precioDiaExtra, $porcentajeComision, $descripcion, $lugarEntrega, $fechaEntrega, $lugarDevolucion);
        $affectedRows = $this->setTransactionQuery(array($query), array($params));

        // Verificamos si la inserción fue exitosa y devolvemos el resultado correspondiente
        if ($affectedRows[0] > 0) {
            return json_encode(array("success" => true, "message" => "Reserva realizada con éxito."));
        } else {
            return showErrors(500, "Error al realizar la reserva.");
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api = new ReservaAPI();
    // Debemos asegurarnos que todos los campos requeridos estén presentes
    if(isset($_POST["idVehiculo"], $_POST["cantidadDias"], $_POST["precioDia"], $_POST["precioDiaExtra"], $_POST["porcentajeComision"], $_POST["descripcion"], $_POST["lugarEntrega"], $_POST["fechaEntrega"], $_POST["lugarDevolucion"])) {
        echo $api->reserveVehicle($_POST["idVehiculo"], $_POST["cantidadDias"], $_POST["precioDia"], $_POST["precioDiaExtra"], $_POST["porcentajeComision"], $_POST["descripcion"], $_POST["lugarEntrega"], $_POST["fechaEntrega"], $_POST["lugarDevolucion"]);
    } else {
        echo showErrors(400, "Faltan datos para realizar la reserva.");
    }
}

?>
