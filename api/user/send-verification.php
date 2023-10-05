<?php
    require_once('C:\xampp\htdocs\ProyectoCatedra_DPS\inc\var_global.php');
    require_once('C:\xampp\htdocs\ProyectoCatedra_DPS\inc\validations.php');
    require_once('C:\xampp\htdocs\ProyectoCatedra_DPS\inc\db_model.php');

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require_once 'path/to/PHPMailer/src/Exception.php';
    require_once 'path/to/PHPMailer/src/PHPMailer.php';
    require_once 'path/to/PHPMailer/src/SMTP.php';

    require_once 'config.php';

    function sendVerificationEmail($email) {
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor
            $mail->SMTPDebug = 2;                                 
            $mail->isSMTP();                                      
            $mail->Host       = SMTP_SERVER;             
            $mail->SMTPAuth   = true;                             
            $mail->Username   = SMTP_USER;         
            $mail->Password   = SMTP_PASS;                     
            $mail->SMTPSecure = 'tls';                            
            $mail->Port       = 587;                              

            // Recipientes
            $mail->setFrom(SMTP_USER, 'Nombre de la aplicación');
            $mail->addAddress($email);

            // Contenido
            $mail->isHTML(true);                                  
            $mail->Subject = 'Verificación de correo electrónico';
            $verificationCode = bin2hex(random_bytes(50)); // Genera un código de verificación.
            $verificationLink = "https://tudominio.com/verify.php?code=$verificationCode"; 
            $mail->Body    = "Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: <a href=\"$verificationLink\">$verificationLink</a>";
            $mail->AltBody = "Por favor, copia y pega el siguiente enlace en tu navegador para verificar tu correo electrónico: $verificationLink";

            $mail->send();
    
            // Después de generar el código de verificación
            $verificationCode = bin2hex(random_bytes(50));

            // Guardar el código en la base de datos
            $query = "UPDATE Usuario SET verification_code = :verificationCode WHERE correoElectronico = :email";
            $params = [
                "verificationCode" => $verificationCode,
                "email" => $email
            ];
            $result = $dbModel->executeQuery($query, $params);

            if (!$result) {
                // Manejar error
                echo "Hubo un error al guardar el código de verificación en la base de datos.";
            }

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    if (allowedMethod('POST')) {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            $email = $data['email'];
            $dbModel = new Model();
            $query = "SELECT * FROM usuario WHERE correoElectronico = :email";
            $user = $dbModel->getQuery($query, ["email" => $email]);

            if (!empty($user)) {
                if (!sendVerificationEmail($email)) {
                    echo showErrors(500, 'INTERNAL SERVER ERROR', "No se pudo enviar el correo.");
                } else {
                    echo json_encode(["message" => "Verification email sent."]);
                }
            } else {
                echo showErrors(404, 'NOT FOUND', 'No se encontró el usuario con el correo especificado.');
            }
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }
?>
