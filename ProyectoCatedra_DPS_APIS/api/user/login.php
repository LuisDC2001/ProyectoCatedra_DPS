<?php
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
    function validarUser($email, $pass){
    $dbModel = new Model();
    $pass_hash = hash('sha256', $pass);
    $query = "
    SELECT `nombre`,`apellido`,`fechaNacimiento`,`telefono` FROM `usuario` WHERE `correoElectronico`=:correoElectronico AND `contrasena`=:contrasena ";
        $result= $dbModel->getQuery($query,['correoElectronico'=>$email,'contrasena'=>$pass_hash]);
    if (!empty($result)) {
        // Contraseña válida
        return $result;
    } else {
        // Credenciales incorrectas
        return null;
    }
}

    // Validación de método
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    if ($requestMethod == 'POST') {
    // Obtener la información
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['correoElectronico'];
    $pass = $data['contrasena'];
    if (!empty($data)) {
        $usuarioValidado = validarUser($email,$pass);
        if (!empty($usuarioValidado)) {
            echo json_encode(array("message" => "Inicio de sesión exitoso", "usuario" => $usuarioValidado));
        } else {
            echo json_encode(array("message" => "Credenciales incorrectas"));
        }
    } else {
        echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
    }
} else {
    echo showErrors(405, 'METHOD NOT ALLOWED');
}
?>