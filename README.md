### Configuración de APIs google-login y send-verification

#### Estructura de carpetas

- **api/config.php**: 
  - Archivo de configuración que contiene las credenciales para la base de datos y el servidor SMTP.
  - Es esencial configurar correctamente los valores de SMTP para garantizar el envío de correos electrónicos.

#### Carpeta `user`

- **user/google-login.php**: 
  - Permite a los usuarios iniciar sesión mediante Google.
  - Si el usuario ya está registrado en la base se de datos, se devuelve su información; si no, se registra.

- **user/send-verification.php**: 
  - Envía un correo electrónico de verificación a la dirección de correo del usuario después de registrarse o iniciar sesión.
  - Utiliza PHPMailer para enviar correos.
  - Requiere que el archivo `config.php` esté correctamente configurado.

#### Instrucciones

1. Clona el repositorio a tu máquina local.
2. Navega a la carpeta `api` y ajusta `config.php` con tus credenciales.

# Instalando Composer

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"

# Instalando PHPMailer y Google API Client

composer require phpmailer/phpmailer google/apiclient:^2.0

# Configurando WampServer para SMTP local

PHP_INI_PATH="/path/to/your/php.ini"
sed -i 's/SMTP = .*/SMTP = localhost/' $PHP_INI_PATH
sed -i 's/smtp_port = .*/smtp_port = 25/' $PHP_INI_PATH

Reinicia WampServer para aplicar los cambios.

# Insertando columna requerida en la base de datos

ALTER TABLE Usuario ADD verification_code VARCHAR(100) NULL;
