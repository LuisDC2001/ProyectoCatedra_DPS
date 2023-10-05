<?php
    // Archivos requeridos
    require_once('C:\wamp64\htdocs\ProyectoCatedra_DPS\inc\var_global.php');
    require_once('C:\wamp64\htdocs\ProyectoCatedra_DPS\inc\validations.php');
    require_once('C:\wamp64\htdocs\ProyectoCatedra_DPS\inc\db_model.php');

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Method: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

    if (allowedMethod('POST')) {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data)) {
            $email = $data['email'];
            
            $dbModel = new Model();
            $query = "SELECT * FROM usuario WHERE correoElectronico = :email";
            $user = $dbModel->getQuery($query, ["email" => $email]);
            
            if (!empty($user)) {
                // Si el usuario ya está registrado en la base de datos
                echo json_encode($user);
            } else {
                // Registra al usuario en la base de datos
                $query = "INSERT INTO usuario(correoElectronico, nombre, apellido, idRol) VALUES (:email, :first_name, :last_name, 1)"; // Considerando que 1 es el rol de Cliente
                $params = [
                    "email" => $data['email'],
                    "first_name" => $data['given_name'],
                    "last_name" => $data['family_name']
                ];
                $dbModel->setTransactionQuery([$query], [$params]);
                echo showErrors(201, 'CREATED');
            }
        } else {
            echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
        }
    }
?>
