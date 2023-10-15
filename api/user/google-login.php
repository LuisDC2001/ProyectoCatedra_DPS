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

// Si se recibe un código desde Google
if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);

    $google_oauth = new Google_Service_Oauth2($client);
    $google_account_info = $google_oauth->userinfo->get();
    $email = $google_account_info->email;

    // Devolver la información de la cuenta de Google
    echo json_encode($google_account_info);
    exit;
}

// Si el método HTTP es POST
if (allowedMethod('POST')) {
    $data = json_decode(file_get_contents("php://input"), true);
    echo "Datos recibidos: ";
    print_r($data);
    echo "\n";

    // Si se recibió información
    if (!empty($data)) {
        $email = $data['email'];

        $dbModel = new Model();
        $query = "SELECT * FROM usuario WHERE correoElectronico = :email";
        $user = $dbModel->getQuery($query, ["email" => $email]);

        // Si el usuario ya existe en la base de datos
        if (!empty($user)) {
            echo json_encode($user);
        } else {
            // Si el usuario no existe, se intenta insertar
            $defaultNacionalidad = 1;
            $defaultRol = 1;

            $query = "INSERT INTO usuario(correoElectronico, fechaNacimiento, telefono, idNacionalidad, idRol) 
                      VALUES (:email, '1990-01-01', '1234567890', :defaultNacionalidad, :defaultRol)"; //Se insertan valors de nacimiento y número telefonico para no dejar vacios los campos en la base de datos
            $params = [
                "email" => $email,
                "defaultNacionalidad" => $defaultNacionalidad,
                "defaultRol" => $defaultRol
            ];

            $affectedRows = $dbModel->setTransactionQuery([$query], [$params]);
            
            // Si se insertó el usuario correctamente
            if ($affectedRows && isset($affectedRows[0]) && $affectedRows[0] > 0) {
                echo json_encode(["status" => "User inserted successfully"]);
            } else {
                // Si hubo un error al insertar el usuario
                echo json_encode([
                    "status" => "Failed to insert user",
                    "details" => "No rows were affected. Check the query and parameters.",
                    "query" => $query,
                    "params" => $params
                ]);
            }
        }
    } else {
        // Si no recibió la información o el formato es incorrecto
        echo showErrors(400, 'BAD REQUEST', 'No se ha enviado información o no es aceptado el formato en que se envió');
    }
}
?>
