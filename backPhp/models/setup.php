<?php
require_once 'Database.php';

try {
    $db = Database::getConnection();

    //creo la tabla
    $sql = "CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    cantidadVendidos INTEGER NOT NULL,
    precio INTEGER NOT NULL

    )";
    $db->exec($sql);
    
    //INSERTO PRODUCTO
    $checkStmt = $db->query("SELECT COUNT(*) FROM productos");
    $total = $checkStmt->fetchColumn();
    if($total==0){
        $sqlInsert = "INSERT INTO productos (nombre,cantidadVendidos, precio) VALUES
        ('Teclado',50,142800), 
        ('Mouse',100,42800), 
        ('Pantalla',60,714800), 
        ('Audifonos',455,34800), 
        ('Soporte',20,14800), 
        ('Portatil',59,1064800), 
        ('Camiseta',65,134800), 
        ('sillas',315,34800), 
        ('Tornillo',50,1800)";
        $db->exec($sqlInsert);
    }else {
        echo("ya existen productods");
    }
    
    echo "Base de datos y tabla 'productos' creada correctamente. ";
}catch(PDOException $e){
    echo "Error al configurar BD". $e->getMessage();
}
?>