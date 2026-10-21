<?php
require_once 'models/ProductosModel.php';
class ProductController{
    private ProductosModel $model;

    // instancio el modelo al crear el controlador
    public function __construct() {
        $this->model = new ProductosModel();
    }
    
    //get api/productos
    public function leer(): void{
        $productosdb = $this->model->obtenerProductos();
        http_response_code(200);
        echo json_encode($productosdb);
    }
    //crear/insert producto
    public function crear():void{
        //leo el json 
        $json = file_get_contents('php://input');
        $datos = json_decode($json,true);

        $nombre =$datos['nombre']?? '';
        $cantidad = (int) $datos['cantidad']?? 0;
        $precio =$datos['precio']?? 0;

        //traigo los producto
        $productos = $this->model->obtenerProductos();
        $existe = false;
        foreach ($productos as $producto){
            if(mb_strtolower($producto["nombre"])===mb_strtolower($nombre)){
                $existe = true;
                break;
            }
        }
        if($existe){
                http_response_code(400);
                echo json_encode(["Error"=> "El producto ya existe"]);
                return;
            }
        
        
        $this->model->crearUnProducto($nombre, $cantidad, $precio);
        
        
        http_response_code(201);
        echo json_encode([
                "mensaje"=>"Producto creado correctamente",
                "nombre"=>$nombre,
                "cantidad"=>$cantidad,
                "precio"=>$precio
            ]);
    }
    //delete api/productos/{id}
    public function eliminar(int $id): void{

        //traigo los producto
        $productos = $this->model->obtenerProductos();
        $existe = false;

        foreach ($productos as $producto){
            if ($producto["id"]===$id){
                $existe = true;
                break;
            }
        }
            if(!$existe){
                http_response_code(404);
                echo json_encode(["Error"=> "Producto no encontrado"]);
                return;
            }
            $this->model->eliminarProducto($id);
            http_response_code(200);
            echo json_encode([
                "mensaje"=>"Producto eliminado correctamente",
                "id"=> $id,
            ]);

        
    }
    public function actualizar(int $id) :void{
        $productos = $this->model->obtenerProductos();
        //leo el json 
        $json = file_get_contents('php://input');
        $datos = json_decode($json,true);

        $nombre =$datos['nombre']?? '';
        $cantidad = (int) $datos['cantidad']?? 0;
        $precio =$datos['precio']?? 0;

        $existe = false;

        foreach($productos as $producto){
            if($producto["id"] ===$id){
                $existe = true;
                break;
            }
        }
        if(!$existe){
            http_response_code(404);
            echo json_encode(["Error"=> "Producto no encontrado"]);
            return;
        }
        $this->model->actualizarProducto($id,$nombre,$cantidad,$precio);
        http_response_code(200);
        echo json_encode([
                "mensaje"=>"Producto actualizado correctamente",
                "id"=> $id,
                "nombre"=>$nombre,
                "cantidad"=>$cantidad,
                "precio"=>$precio
            ]);
    }
    
}