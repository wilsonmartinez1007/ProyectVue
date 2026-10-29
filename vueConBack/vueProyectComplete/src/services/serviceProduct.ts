import type {Producto} from '@/types/interfaces'

export async function getProductosAPI() {
    const respuesta = await fetch('http://localhost:8000/api/productos');
    if(!respuesta.ok) throw new Error(`Error en HTTP: {respuesta.status}`);
    return await respuesta.json()
    
}
export async function posProductosApi(nuevoProducto:Producto){
    console.log(nuevoProducto)
    const respuesta = await fetch('http://localhost:8000/api/productos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
            });
    if(!respuesta.ok) throw new Error(`Error en HTTP: {respuesta.status}`);
    return await respuesta.json()
}
export async function deleteProductosApi(id:number) {
    const respuesta = await fetch(`http://localhost:8000/api/productos/${id}`,{method: 'DELETE'});
    return await respuesta.json();

}
export async function putProductosApi(productoAc:Producto) {
    const respuesta = await fetch(`http://localhost:8000/api/productos/actualizar/${productoAc.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoAc)
            });
            return await respuesta.json();
}