<?php
// Importar las bibliotecas y archivos necesarios
require_once '../vendor/autoload.php';
require_once '../inc/config.php'; 
require_once '../inc/validations.php';
require_once '../inc/db_model.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Establecer la zona horaria predeterminada
date_default_timezone_set('America/El_Salvador');

// Clase para manejar el envío de correos de confirmación de reservas
class ReservaConfirmacion
{
    protected $dbModel;

    public function __construct()
    {
        $this->dbModel = new Model();
    }

    public function enviarConfirmacion($idReserva, $email)
    {
        // Obtener la reserva especificada por ID
        $query = "SELECT id, fechaEntrega, lugarDevolucion
                  FROM reserva
                  WHERE id = ? AND disponible = 1";

        $reserva = $this->dbModel->getQuery($query, [$idReserva]);

        if (!empty($reserva)) {
            // Enviar correo electrónico de confirmación
            $mail = new PHPMailer(true);
            $mail->CharSet = 'UTF-8';

            try {
                // Configuración del servidor de correo
                $mail->isSMTP();
                $mail->Host = MAILER_HOST;
                $mail->SMTPAuth = MAILER_SMTP_AUTH;
                $mail->Port = MAILER_PORT;

                // Remitente
                $mail->setFrom(MAILER_FROM_EMAIL, MAILER_FROM_NAME);

                // Destinatario
                $mail->addAddress($email);

                // Contenido del correo
                $mail->isHTML(true);
                $mail->Subject = 'Confirmación de Reserva';
                $mail->Body = "Su reserva para el vehículo con ID " . $reserva[0]['id'] . " ha sido realizada con éxito. La recogida está programada para el " . $reserva[0]['fechaEntrega'] . " y la devolución en " . $reserva[0]['lugarDevolucion'] . ".";

                $mail->send();
                echo json_encode(array("message" => "Correo de confirmación enviado con éxito."));
            } catch (Exception $e) {
                echo json_encode(array("error" => "Error al enviar correo: " . $mail->ErrorInfo));
            }
        } else {
            echo json_encode(array("error" => "No hay reservas pendientes de confirmación o la reserva no existe."));
        }
    }
}

// Recibir el ID de la reserva y el correo electrónico desde el cuerpo de la petición
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['idReserva']) && !empty($data['email'])) {
    $confirmacion = new ReservaConfirmacion();
    $confirmacion->enviarConfirmacion($data['idReserva'], $data['email']);
} else {
    echo json_encode(array("error" => "Faltan el ID de la reserva o el correo electrónico."));
}
?>
