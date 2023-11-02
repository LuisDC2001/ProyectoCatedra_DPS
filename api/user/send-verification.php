<?php
// Importar las bibliotecas y archivos necesarios
require_once '../vendor/autoload.php';
require_once('../inc/config.php'); 
require_once('../inc/validations.php');
require_once('../inc/db_model.php');

// Importar las clases necesarios de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Función para verificar si el método HTTP es el esperado
function allowedMethod($method) {
    return $_SERVER["REQUEST_METHOD"] === $method;
}

// Configuración de encabezados
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

// Función para enviar el email de creación exitosa
function sendSuccessEmail($email) {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor para MailDev
        $mail->isSMTP();
        $mail->Host = 'localhost';  // Para MailDev, el host es 'localhost'
        $mail->SMTPAuth = false;   // MailDev no requiere autenticación
        $mail->Port = 1025;        // Puerto de MailDev

        // Configurar remitente y destinatario
        $mail->setFrom('no-reply@rentandgo.com', 'RentAndGo');
        $mail->addAddress($email);

        // Configurar el contenido del correo
        $mail->isHTML(true);
        $mail->Subject = 'Bienvenido a RentAndGo';
        $mail->Body = '<h2>Bienvenido a RentAndGo</h2><p>Tu cuenta ha sido creada exitosamente. Gracias por unirte a nosotros.</p>';

        $mail->send();
        return true;
    } catch (Exception $e) {
        // Si hay un error al enviar el correo, devolverá el mensaje de error
        return "Error de PHPMailer: " . $mail->ErrorInfo;
    }
}

// Si el método HTTP es POST
if (allowedMethod('POST')) {
    $data = json_decode(file_get_contents("php://input"), true);
    // Si se recibió información
    if (!empty($data)) {
        $email = $data['email'];
        $dbModel = new Model();
        // Buscar el usuario con el email proporcionado
        $query = "SELECT * FROM Usuario WHERE correoElectronico = :email";
        $user = $dbModel->getQuery($query, ["email" => $email]);

        // Si se encontró el usuario
        if (!empty($user)) {
            $sendResult = sendSuccessEmail($email);
            // Si el correo se envió correctamente
            if ($sendResult === true) {
                echo json_encode(["message" => "Welcome email sent."]);
            } else {
                // Si hubo un error al enviar el correo
                echo showErrors(500, 'INTERNAL SERVER ERROR', $sendResult);
            }
        } else {
            // Si no se encontró el usuario con el correo proporcionado
            echo showErrors(404, 'NOT FOUND', 'No se encontró el usuario con el correo especificado.');
        }
    } else {
        // Si no se recibió información o el formato es incorrecto
        echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
    }
}
?>
