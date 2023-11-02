<?php
// Credenciales y configuración de Google Client
define('GOOGLE_CLIENT_ID', '648005449573-peaogjdmcsjgpa62o1cchplrefqb1igg.apps.googleusercontent.com');
define('GOOGLE_CLIENT_SECRET', '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');
define('GOOGLE_REDIRECT_URI', 'http://localhost/RentAndGo/api/user/google-login.php');

// Configuración de PHPMailer
define('MAILER_HOST', 'localhost'); // Para MailDev, el host es 'localhost'
define('MAILER_SMTP_AUTH', false);  // MailDev no requiere autenticación
define('MAILER_PORT', 1025);        // Puerto de MailDev

// Configuración remitente para PHPMailer
define('MAILER_FROM_EMAIL', 'no-reply@rentandgo.com');
define('MAILER_FROM_NAME', 'RentAndGo');

// Información por defecto para nuevos usuarios
define('DEFAULT_NACIONALIDAD', 1);
define('DEFAULT_ROL', 1);
define('DEFAULT_BIRTHDATE', '1990-01-01');
define('DEFAULT_PHONE', '1234567890');
define('DEFAULT_PASSWORD', 'TempPassword123!');  // Se podrá cambiar esta contraseña temporal en el futuro

?>
