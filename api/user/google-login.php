<?php
// Se importan las bibliotecas y archivos necesarios
require_once '../vendor/autoload.php';
require_once('../inc/validations.php');
require_once('../inc/db_model.php');

// Función para verificar si el método HTTP es el esperado
function allowedMethod($method) {
    return $_SERVER["REQUEST_METHOD"] === $method;
}

// Configuración de encabezados
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Authorization, X-Request-With');

// Configuración del cliente de Google
$client = new Google_Client();
$client->setClientId('648005449573-peaogjdmcsjgpa62o1cchplrefqb1igg.apps.googleusercontent.com');
$client->setClientSecret('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');
$client->setRedirectUri('http://localhost/RentAndGo/api/user/google-login.php');
$client->addScope(['profile', 'email']);

$email = "";
$nombre = "";
$apellido = "ApellidoTemp"; // Valor temporal para apellido

// Si se recibe un código desde Google
if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);

    $google_oauth = new Google_Service_Oauth2($client);
    $google_account_info = $google_oauth->userinfo->get();
    $email = $google_account_info->email;
    $nombre = $google_account_info->givenName;
    $apellido = $google_account_info->familyName ?? "ApellidoTemp";

    echo json_encode($google_account_info);
    exit;
}

// Si el método HTTP es POST
if (allowedMethod('POST')) {
    $data = json_decode(file_get_contents("php://input"), true);
    echo "Datos recibidos: ";
    print_r($data);
    echo "\n";

    if (!empty($data)) {
        $email = $data['email'];

        $dbModel = new Model();
        $query = "SELECT * FROM usuario WHERE correoElectronico = :email";
        $user = $dbModel->getQuery($query, ["email" => $email]);

        if (!empty($user)) {
            echo json_encode($user);
        } else {
            $defaultNacionalidad = 1;
            $defaultRol = 1;
            $tempPassword = password_hash("TempPassword123!", PASSWORD_DEFAULT);

            $query = "INSERT INTO usuario(nombre, apellido, correoElectronico, contrasena, fechaNacimiento, telefono, idNacionalidad, idRol) 
                      VALUES (:nombre, :apellido, :email, :password, '1990-01-01', '1234567890', :defaultNacionalidad, :defaultRol)";
            $params = [
                "nombre" => $nombre,
                "apellido" => $apellido,
                "email" => $email,
                "password" => $tempPassword,
                "defaultNacionalidad" => $defaultNacionalidad,
                "defaultRol" => $defaultRol
            ];

            $affectedRows = $dbModel->setTransactionQuery([$query], [$params]);
            
            if ($affectedRows && isset($affectedRows[0]) && $affectedRows[0] > 0) {
                echo json_encode(["status" => "User inserted successfully"]);
            } else {
                echo json_encode([
                    "status" => "Failed to insert user",
                    "details" => "No rows were affected. Check the query and parameters.",
                    "query" => $query,
                    "params" => $params
                ]);
            }
        }
    } else {
        echo json_encode([
            "error" => 400,
            "mensajeError" => "BAD REQUEST",
            "mensajeErrorReal" => "No se ha enviado información o no es aceptado el formato en que se envió"
        ]);
    }
}
?>
