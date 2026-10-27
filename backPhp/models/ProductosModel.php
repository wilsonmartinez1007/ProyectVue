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
        //creo un producto
    public function crearUnProducto(string $nombre, int $cantidad, int $precio, string $fecha, string $ciudad):int{
        $sql = "INSERT INTO productos (nombre, cantidadVendidos, precio, fecha, ciudad) VALUES (:nombre, :cantidadVendidos, :precio, :fecha, :ciudad)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':nombre'=>$nombre,
            ':cantidadVendidos'=>$cantidad,
            ':precio'=>$precio,
            ':fecha'=>$fecha,
            ':ciudad'=>$ciudad
        ]);
        return (int) $this->db->lastInsertId();
    }
        //eliminar un producto
    public function eliminarProducto(int $id): bool {
        $sql = "DELETE FROM productos WHERE id= :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':id'=>$id
        ]);
    }
    //actualizar un producto
    public function actualizarProducto(int $id, string $nombre, int $cantidad, int $precio, string $fecha, string $ciudad): bool {
        $sql = "UPDATE productos SET nombre =:nombre, cantidadVendidos = :cantidad, precio = :precio, fecha = :fecha, ciudad = :ciudad WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt -> execute([
            ':id'=> $id,
            'nombre'=>$nombre,
            ':cantidad'=> $cantidad,
            ':precio'=> $precio,
            ':fecha'=>$fecha,
            ':ciudad'=>$ciudad
        ]);
    }
    

    
}
?>