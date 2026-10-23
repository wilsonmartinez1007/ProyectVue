export async function getProductosAPI() {
    const respuesta = await fetch('http://localhost:8000/api/productos');
    if(!respuesta.ok) throw new Error(`Error en HTTP: {respuesta.status}`);
    return await respuesta.json()
    
}
export async function posProductosApi(nuevoProducto){
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
export async function deleteProductosApi(id) {
    const respuesta = await fetch(`http://localhost:8000/api/productos/${id}`,{method: 'DELETE'});
    return await respuesta.json();

}
export async function putProductosApi(productoAc) {
    const respuesta = await fetch(`http://localhost:8000/api/productos/actualizar/${productoAc.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoAc)
            });
            return await respuesta.json();
}