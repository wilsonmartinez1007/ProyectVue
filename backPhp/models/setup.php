<?php
require_once 'Database.php';

try {
    $db = Database::getConnection();

    //creo la tabla
    $sql = "CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    cantidadVendidos INTEGER NOT NULL,
    precio INTEGER NOT NULL,
    fecha DATE NOT NULL,
    ciudad TEXT NOT NULL

    )";
    $db->exec($sql);
    
    
    echo "Base de datos y tabla 'productos' creada correctamente. ";
}catch(PDOException $e){
    echo "Error al configurar BD". $e->getMessage();
}
?>