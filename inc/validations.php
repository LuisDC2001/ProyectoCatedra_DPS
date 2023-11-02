<?php
    
    //Función para manejo de errores en API
    function showErrors($status, $errorMessage, $realErrorMessage = null){
        $data = array(
            "estado" => $status,
            "mensaje" => $errorMessage
        );
        if (!empty($realErrorMessage)) {
            $data["mensajeReal"] = $realErrorMessage;
        }
        header('HTTP/1.0 '.$status.' '.$errorMessage);
        return json_encode($data);
    }

    //Función para validar el método HTTP en API
    function allowedMethod($method = null){
        $method = (empty($method)) ? "POST" : $method ; //Método POST por defecto
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            echo showErrors(405, 'METHOD NOT ALLOWED');
            return false;
        }
        return true;
    }

    //Función para convertir espacios o cadenas vacíos en tipo de datos NULL
    function emptyStringToNull($data){
        foreach ($data as $key => $datum) {
            if (trim($datum) == '') {
                $data[$key] = null;
            }
        }
        return $data;
    }

    //Función para validar formato de correo
    function validateEmail($email){
        $emailSanitized = preg_replace('/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/', '', $email);
        $value = $emailSanitized;
        if (!preg_match("/^(?!.*[^a-zA-Z0-9]{2})[a-zA-Z0-9+.-_]+(-[a-zA-Z0-9]+)*@([a-zA-Z0-9](?:[a-zA-Z0-9-]{1,60}[a-zA-Z0-9])?\.)+[a-zA-Z0-9]{2,}$/", $emailSanitized)) {
            $value = false;
        }
        else {
            $domain = explode('@', $emailSanitized)[1];
            $domain = preg_replace("/[^A-Za-z0-9-.]/", "", $domain);
            if (!checkdnsrr($domain, 'MX')) {
                $value = false;
            }
        }
        if (!$value) {
            echo showErrors(400, 'BAD REQUEST', 'El correo electrónico ingresado es inválido');
        }
        return $value;
    }

    //Función para validar contraseña
    function validatePassword($password){
        $value = $password;
        //Condiciones
        $conditions = array(
            '[A-Z]', /* Mínimo una letra mayúscula */
            '[a-z]', /* Mínimo una letra minúscula */
            '[0-9]', /* Mínimo un número */
            '\W',    /* Mínimo un carácter no alfanumérico*/
        );
        if (strlen($password) <= 5) /* Longitud mayor a 5 */ {
            $value = false;
        }
        foreach ($conditions as $con) {
            if (!preg_match("/$con/", $password)) {
                $value = false;
            }
        }
        if (!$value) {
            echo showErrors(400, 'BAD REQUEST', 'La contraseña no cumple con los requisitos mínimos');
        }
        return $value;
    }

?>