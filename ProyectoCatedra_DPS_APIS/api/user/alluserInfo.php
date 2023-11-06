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
    function allUserInfo($email){
    $dbModel = new Model();
    $query = "
    SELECT u.nombre,u.apellido,u.fechaNacimiento,u.telefono,u.correoElectronico,u.fechaFila,n.nombre as nacionalidad FROM `usuario` as u INNER JOIN `nacionalidad`as n ON u.idNacionalidad=n.id WHERE u.correoElectronico =:correoElectronico;";
        $result= $dbModel->getQuery($query,['correoElectronico'=>$email]);
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
    if (!empty($data)) {
        $usuarioEncontrado = allUserInfo($email);
        if (!empty($usuarioEncontrado)) {
            echo json_encode(array("message" => "Usuario Encontrado", "usuario" => $usuarioEncontrado));
        } else {
            echo json_encode(array("message" => "El usuario no ha sido encontrado"));
        }
    } else {
        echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
    }
} else {
    echo showErrors(405, 'METHOD NOT ALLOWED');
}
?>