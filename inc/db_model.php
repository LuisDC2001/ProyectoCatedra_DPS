<?php
    //Archivos requeridos
    require_once('validations.php');
    require_once('var_global.php');

    class Model
    {
        /*Propiedades*/
        private $server = SERVER; //servidor
        private $user = USER_DB; //usuario
        private $pass = PASSWORD_DB; //contraseña
        private $bd = DATABASE; //base de datos
        protected $dbh; //objeto PDO (holder)
    
        /*Métodos*/
    
        //Método para abrir conexión con la BD
        protected function openConnection()
        {
            try {
                $dsn = "mysql:host=$this->server;dbname=$this->bd;CHARSET=utf8mb4";
                $this->dbh = new PDO($dsn, $this->user, $this->pass);
                $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                //$dbh->exec("SET CHARACTER SET UTF8");
            } catch (PDOException $ex) {
                //die("No se pudo establecer la conexión: " . $ex->getMessage());
                die(showErrors(500, "INTERNAL SERVER ERROR", $ex->getMessage()));
            }
        }
    
        //Método para cerrar conexión con la BD
        protected function closeConnection()
        {
            $this->dbh = null;
        }
    
        //Método para ejecutar transacciones con consultas de actualización y/o inserción
        public function setTransactionQuery($query, $params)
        {
            $affectedRows = array();
            $this->openConnection();
            try {
                $this->dbh->beginTransaction();
                for ($i = 0; $i < count($query); $i++) {
                    $st = $this->dbh->prepare($query[$i]);
                    $st->execute($params[$i]);
                    $affectedRows[$i] = $st->rowCount();
                }
                $this->dbh->commit();
            } catch (Exception $ex) {
                $this->dbh->rollback();
                //echo "No se pudo ejecutar la consulta SQL: " . $ex->getMessage();
                echo showErrors(400, "BAD REQUEST", $ex->getMessage());
            }
            $this->closeConnection();
            return $affectedRows;
        }
    
        //Método para ejecutar consultas de selección
        public function getQuery($query, $params = array())
        {
            try {
                $rows = [];
                $this->openConnection();
                $st = $this->dbh->prepare($query);            
                $st->execute($params);
                $rows = $st->fetchAll(PDO::FETCH_ASSOC);
                $this->closeConnection();
                return $rows;
            } catch (Exception $ex) {
                $this->closeConnection();
                //echo "No se pudo ejecutar la consulta SQL: " . $ex->getMessage();
                echo showErrors(400, "BAD REQUEST", $ex->getMessage());
                return null;
            }
        }
    }
?>