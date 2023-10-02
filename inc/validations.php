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

    //Función para eliminar espacios vacíos y caracteres
    function deleteSpecialCharacters($str, $characters = null){
        if ($characters != null) {
            $str = trim($str, $characters);
        } else {
            $str = trim($str); //Trim normal por defecto
        }
        return $str;
    }

    //Función para validar formato de correo
    function validateEmail($email){
        $emailSanitized = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
        if (filter_var($emailSanitized, FILTER_VALIDATE_EMAIL) == false) {
            echo showErrors(400, 'BAD REQUEST', 'El correo electrónico ingresado es inválido');
            return false;
        }
        return $emailSanitized;
    }

    //Función para validar contraseña
    function validatePassword($password){
        //Condiciones
        $conditions = array(
            '[A-Z]', /* Mínimo una letra mayúscula */
            '[a-z]', /* Mínimo una letra minúscula */
            '[0-9]', /* Mínimo un número */
            '\W',    /* Mínimo un carácter no alfanumérico*/
        );
        if (strlen($password)<=5) /* Longitud mayor a 5 */ {
            echo showErrors(400, 'BAD REQUEST', 'La contraseña no cumple con los requisitos mínimos');
            return false;
        }
        foreach ($conditions as $con) {
            if (!preg_match("/$con/", $password)) {
                echo showErrors(400, 'BAD REQUEST', 'La contraseña no cumple con los requisitos mínimos');
                return false;
            }
        }
        return $password;
    }
?>