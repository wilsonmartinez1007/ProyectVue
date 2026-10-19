export async function getProductosAPI() {
    const respuesta = await fetch('http://localhost:8000/api/productos');
    if(!respuesta.ok) throw new Error(`Error en HTTP: {respuesta.status}`);
    return await respuesta.json()
    
}