<?php
    
    //Función para manejo de errores en API
    function showErrors($status, $errorMessage, $realErrorMessage = null){
        $data = array(
            "error" => $status,
            "mensajeError" => $errorMessage
        );
        if (!empty($realErrorMessage)) {
            $data["mensajeErrorReal"] = $realErrorMessage;
        }
        header('HTTP/1.0 '.$status.' '.$errorMessage);
        return json_encode($data);
    }

?>