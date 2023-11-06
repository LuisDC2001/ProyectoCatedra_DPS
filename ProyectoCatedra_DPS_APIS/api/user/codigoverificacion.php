<?php
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
    function validarCodigo($code){
        $dbModel = new Model();
        $query = "
        SELECT `nombre`,`apellido` FROM `usuario` WHERE `codigoVerificacion`=:code";
        $result= $dbModel->getQuery($query,['code'=>$code]);
        if (!empty($result)) {
            // Usuario encontrado
            $codigo=0;
            $query2[0]=" 
            UPDATE `usuario` SET `codigoVerificacion`= $codigo WHERE `codigoVerificacion`=:code";
            $data['code']=$code;
            $params[0]=(array) $data;
            return $dbModel->setTransactionQuery($query2,$params);
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
   $code = $data['code'];
   if (!empty($data)) {
       $codigoValidado = validarCodigo($code);
       if (!empty($codigoValidado)) {
           echo json_encode(array("message" => "Se ha validado el codigo ingresado"));
       } else {
           echo json_encode(array("message" => "Codigo ingresado no válido"));
       }
   } else {
       echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
   }
} else {
   echo showErrors(405, 'METHOD NOT ALLOWED');
}
?>