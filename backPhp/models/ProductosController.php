<?php
require_once "ProductosModel.php";

class ProductosController{
    private $model;
    public function __construc(){
        $this->model = new ProductosModel();
    }
    public function listarProductos(){
        $producto = $this->model->obtenerProductos();
    }
}

?>