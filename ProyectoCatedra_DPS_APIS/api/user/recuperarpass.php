<?php

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

    //Archivos requeridos
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\validations.php'); //Cambiar por direccion local
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\db_model.php'); //cambiar por direccion local
    
    //require_once('./inc/db_model.php');
    //require_once('./inc/validations.php.php');
    //require_once('./inc/var_global.php.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');
    
    // Método para validar a un usuario
    function recuperarPass($email){
    $dbModel = new Model();
    $query = "
    SELECT `nombre`,`apellido` FROM `usuario` WHERE `correoElectronico`=:correoElectronico";
        $result= $dbModel->getQuery($query,['correoElectronico'=>$email]);
    if (!empty($result)) {
        $code = rand(999999, 111111);
        $query2[0]=" 
        UPDATE `usuario` SET `codigoVerificacion`= :code WHERE `correoElectronico`=:correoElectronico";
         $data['code']=$code;
         $data['correoElectronico']=$email;
         $params[0]=(array) $data;
         $result2= $dbModel->setTransactionQuery($query2,$params);
         if(!empty($result2)){
            //Create an instance; passing `true` enables exceptions
            $mail = new PHPMailer(true);
                try {
                //Server settings
                $mail->SMTPDebug = 0;                                       //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'luisdelcid248@gmail.com';              //SMTP username
                $mail->Password   = 'kixnmdyhtjawcjue';                     //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                //Recipients
                $mail->setFrom('luisdelcid248@gmail.com', 'Mailer');
                $mail->addAddress($email , 'User');     //Add a recipient

                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = 'PETICION DE CAMBIO DE CONTRASENA';
                $mail->Body    = 'Tu codigo de recuperacion es  <b>'.$code.'</b>';

                $mail->send();
                } catch (Exception $e) {
                    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
            $_SESSION['correoElectronico']=$email;
            return $result2;
         }else{
            //No se actualizo la informacion
            return null;
         }
    } else {
        // No se encontró al usuario
        return null;
    }
}

    // Validación de método
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    if ($requestMethod == 'POST') {
    // Obtener la información
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['correoElectronico'];
    if (!empty($data)) {
        $usuarioValidado = recuperarPass($email);
        if (!empty($usuarioValidado)) {
            echo json_encode(array("message" => "Se ha enviado el codigo a su correo", "usuario" => $usuarioValidado));
        } else {
            echo json_encode(array("message" => "No se ha encontrado registro del usuario"));
        }
    } else {
        echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
    }
} else {
    echo showErrors(405, 'METHOD NOT ALLOWED');
}
?>