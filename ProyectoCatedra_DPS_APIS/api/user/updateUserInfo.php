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
    function updateUser($dataUser){
        $dbModel = new Model();
        $query[0]="
        UPDATE `usuario` SET `nombre`=:nombre ,`apellido`=:apellido, `telefono`=:telefono  WHERE `correoElectronico`=:correoElectronico";
        $params[0]=(array) $dataUser;
        $result= $dbModel->setTransactionQuery($query,$params);
        if (!empty($result)) {
            // Usuario actualizado
            return $result;
        } else {
            // Credenciales incorrectas
            return null;
        }

    }
  //Ejecución de la API
  // Validación de método
  $requestMethod = $_SERVER["REQUEST_METHOD"];
  if ($requestMethod == 'POST') {
  // Obtener la información
  $data = json_decode(file_get_contents("php://input"), true);
  if (!empty($data)) {
      if (!empty(updateUser($data))) {
          echo json_encode(array("message" => "Se ha actualizado la informacion del usuario"));
      } else {
          echo json_encode(array("message" => "No se ha podido actualizar la informacion del usuario"));
      }
  } else {
      echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
  }
} else {
  echo showErrors(405, 'METHOD NOT ALLOWED');
}
?>