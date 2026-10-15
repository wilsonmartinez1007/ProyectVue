<?php

class Database {
    private static $instance = null;
    public static function getConnection(){
        if(self::$instance === null){
            try{
                $dbPath = __DIR__ . '/mibase.db';
                self::$instance = new PDO('sqlite:'. $dbPath);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            }catch(PDOException $e){
                die("Error de conexion: " . $e->getMessage());
            }
        }
        return self::$instance;
    }
}
?>