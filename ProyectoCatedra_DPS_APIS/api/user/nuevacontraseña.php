<?php
session_start();
    //Archivos requeridos
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\validations.php'); //Cambiar por direccion local
    require_once('C:\wamp64\www\ProyectoCatedra_DPS_APIS\inc\db_model.php'); //Cambiar por direccion local
    
    //require_once('./inc/db_model.php');
    //require_once('./inc/validations.php.php');
    //require_once('./inc/var_global.php.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');
    
    //Función para añadir usuario
    function nuevaPass($pass,$confpass){
        $dbModel = new Model();
        if($pass !== $confpass){
            return null;
        }else{
        $email=$_SESSION['correoElectronico'];
        $query[0]="
        UPDATE `usuario` SET `contrasena`=:contrasena  WHERE `correoElectronico`=:correoElectronico";
        $data['contrasena']=hash('sha256',$pass);
        $data['correoElectronico']=$email;
        $params[0]=(array) $data;
        $result= $dbModel->setTransactionQuery($query,$params);
        if (!empty($result)) {
            // Usuario actualizado
            return $result;
        } else {
            // Credenciales incorrectas
            return null;
        }
        }
    }
   // Validación de método
   $requestMethod = $_SERVER["REQUEST_METHOD"];
   if ($requestMethod == 'POST') {
   // Obtener la información
   $data = json_decode(file_get_contents("php://input"), true);
   $pass = $data['contrasena'];
   $confpass = $data['confcontrasena'];
   if (!empty($data)) {
       $nuevaContrasena = nuevaPass($pass,$confpass);
       if (!empty($nuevaContrasena)) {
           echo json_encode(array("message" => "Se ha actualizado la contraseña"));
       } else {
           echo json_encode(array("message" => "Las contraseñas no coinciden"));
       }
   } else {
       echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
   }
} else {
   echo showErrors(405, 'METHOD NOT ALLOWED');
}
?>