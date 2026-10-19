<?php

class Router{
    private array $rutas = [];

    public function get(string $ruta, array $manejador): void{
        $this->rutas['GET'][$ruta] = $manejador;
    }
    public function delete(string $ruta, array $manejador): void{
        $this->rutas['DELETE'][$ruta] = $manejador;

    }
    public function despachar(string $metodo, string $uri): void{
        $path = parse_url($uri, PHP_URL_PATH);
        foreach($this->rutas[$metodo]??[] as $rutaDefinida => $manejador){

            //convierto la url en expresion regular para capturar numeros
            $patron = preg_replace('#\{[a-zA-Z0-9]+\}#','([0-9]+)',$rutaDefinida);
            if (preg_match("#^" . $patron . "$#",$path,$coincidencias)){
                array_shift($coincidencias);
                [$claseControlador,$metodoNombre] = $manejador;
                $instancia = new $claseControlador();
                //converto argumentos capturados en enteros si son numericos
                $parametros = array_map(
                    fn($val)=>is_numeric($val)? (int) $val: $val,
                    $coincidencias
                );
                //llamo al metodo del conntrolador pasando los párametros de la url
                call_user_func_array([$instancia, $metodoNombre], $parametros);
                return;

            }
        }
        http_response_code(404);
        echo json_encode(["error"=>"Ruta no encontrada"]);
    }
    
}