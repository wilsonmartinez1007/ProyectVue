<?php

// Permitir peticiones desde Vue
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

//manejo de la peticion Prefilight de CORS
if ($_SERVER['REQUEST_METHOD']==='OPTIONS'){
    http_response_code(204);
    exit;
}

require_once 'routes/Router.php';
require_once 'controllers/ProductController.php';

$router = new Router();

//registro los endpoints
$router->get('/api/productos',[ProductController::class, 'index']);
$router->delete('/api/productos/{id}',[ProductController::class,'destroy']);

//Porceso la peticion actual
$router->despachar($_SERVER['REQUEST_METHOD'],$_SERVER['REQUEST_URI']);