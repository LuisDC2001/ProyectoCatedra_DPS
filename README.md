### Carpeta `api`

- **config.php**: Archivo de configuración que contiene las credenciales para la base de datos y el servidor SMTP. Es importante configurar correctamente los valores de SMTP para garantizar el envío de correos electrónicos.

### Carpeta `user`

- **google-login.php**: Este archivo permite a los usuarios iniciar sesión mediante Google. Si el usuario ya está registrado en nuestra base de datos, se devuelve su información; de lo contrario, se registra en la base de datos.
  
- **send-verification.php**: Una vez que el usuario se ha registrado o iniciado sesión, este archivo se encarga de enviar un correo electrónico de verificación a la dirección de correo del usuario. Utiliza PHPMailer para enviar correos y requiere que el archivo `config.php` esté correctamente configurado.

## Cómo Usar

1. Clona el repositorio a tu máquina local.
2. Navega a la carpeta `api` y configura `config.php` con tus credenciales.

### Instalación de Composer y PHPMailer

3. Antes de poder usar PHPMailer, se necesita tener Composer instalado. Seguir los pasos en el siguiente enlace [instrucciones de instalación](https://getcomposer.org/download/).
4. Una vez que se haya instalado Composer, navega a la carpeta raíz de tu proyecto y ejecuta el siguiente comando para instalar PHPMailer:
    ```bash
    composer require phpmailer/phpmailer
    ```
5. Ahora se debería tener PHPMailer instalado y listo para ser usado en el proyecto.
