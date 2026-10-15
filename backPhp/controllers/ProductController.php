<?php
class ProductController{
    private array $productos =[
        ["id"=>1, "nombre"=>"Teclado","precio"=>3480],
        ["id"=>2, "nombre"=>"Mouse","precio"=>3434],
        ["id"=>3, "nombre"=>"Monitor","precio"=>2323],

    ];
    //get api/productos
    public function index(): void{
        http_response_code(200);
        echo json_encode($this->productos);
    }
    //delete api/productos/{id}
    public function destroy(int $id): void{
        $existe = false;
        foreach ($this->productos as $producto){
            if ($producto["id"]===$id){
                $existe = true;
                break;
            }
        }
            if(!$existe){
                http_response_code(404);
                echo jason_encode(["Error"=> "Producto no encontrado"]);
            }
            $filtrados = array_values(array_filter(
                $this->productos,
                fn($producto)=>$producto["id"]!== $id

            ));
        
            http_response_code(200);
            echo json_encode([
                "mensaje"=>"Producto eliminado correctamente",
                "id"=> $id,
                "productos_restantes"=> $filtrados
            ]);

        
    }
    
}