<?php
// Importar las bibliotecas y archivos necesarios
require_once '../vendor/autoload.php';

require_once('../inc/validations.php');
require_once('../inc/db_model.php');

// IMportar las clases necesarios de PHPMailer
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

// Función para enviar el email de verificación
function sendVerificationEmail($email, $verificationCode) {
    $verificationLink = "http://localhost/RentAndGo/api/user/verify.php?code=$verificationCode";

    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor (ajusta estos valores según tu configuración)
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@example.com';
        $mail->Password = 'your_password';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port = 587;

        // Configurar remitente y destinatario
        $mail->setFrom('from@example.com', 'Mailer');
        $mail->addAddress($email);

        // Configurar el contenido del correo
        $mail->isHTML(true);
        $mail->Subject = 'Verificación de correo electrónico';
        $mail->Body = "Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: <a href=\"$verificationLink\">$verificationLink</a>";

        $mail->send();
        return true;
    } catch (Exception $e) {
        // Si hay un errro al enviar el correo, devolver el mensaje de error
        return "Error de PHPMailer: " . $mail->ErrorInfo;
    }
}

// Si el método HTTP es POST
if (allowedMethod('POST')) {
    $data = json_decode(file_get_contents("php://input"), true);
    // Si se recibión información
    if (!empty($data)) {
        $email = $data['email'];
        $dbModel = new Model();
        // Buscar el usuario con el email proporcionado
        $query = "SELECT * FROM Usuario WHERE correoElectronico = :email";
        $user = $dbModel->getQuery($query, ["email" => $email]);

        // Si se encontró el usuario
        if (!empty($user)) {
            $verificationCode = bin2hex(random_bytes(50));
            $sendResult = sendVerificationEmail($email, $verificationCode);
            // Si el correo se envió correctamente
            if ($sendResult === true) {
                // Actualizar el código de verificación del usuario en la base de datos
                $query = "UPDATE Usuario SET verification_code = :verificationCode WHERE correoElectronico = :email";
                $params = ["verificationCode" => $verificationCode, "email" => $email];
                $dbModel->setTransactionQuery([$query], [$params]);
                echo json_encode(["message" => "Verification email sent."]);
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
