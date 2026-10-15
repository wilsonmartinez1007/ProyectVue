<?php

require_once 'Database.php';

class ProductosModel{
    private $db;

    public function __construct(){
        $this->db = Database::getConnection();
    }
        //obtengo los productos
    public function obtenerProductos(){
        $stmt = $this->db->query("SELECT * FROM productos");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

        }
    

    
}
?>