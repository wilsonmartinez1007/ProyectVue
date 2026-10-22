import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
//import { toast } from 'vue-sonner'
import { getProductosAPI } from '@/services/serviceProduct'
import type {Producto, Estado} from '@/types/interfaces'


export const store = defineStore('producto',()=>{
    const produc = ref<Producto[]>([])
    const cargando = ref<Estado|null>(null)

    const cantProductos = computed(()=>{
        return produc.value.length
    })
   
    

    const acumuladoVentas = computed(()=>{
        return produc.value.reduce((acumulador,producto)=>{
            return acumulador + producto.cantidad
            },0)
                }
             )
    const rotacionC =computed(()=>{
        if(acumuladoVentas.value>0){
            return produc.value.map((c: Producto)=>({
                id: c.id,
                name: c.name,
                cantidad: Math.floor((c.cantidad/acumuladoVentas.value)*100*100)/100,
                price:c.price,
            }))
        }else return[]
            
           
    })
     const ventas = computed(()=>{
        return produc.value.map((p:Producto)=>({
            id: p.id,
            name: p.name,
            totalVentas: p.cantidad*p.price,
        }))
     })
    const promedio = computed(()=>{
        if(cantProductos.value>0) return (acumuladoVentas.value/cantProductos.value).toFixed(0)
            else return 0
        
    })
    
           
    

    //action
    async function cargar() {
        cargando.value='Cargando'
        
        try{
            const datos = await getProductosAPI();
           
            produc.value = datos.map((p: any)=>({
                id: p.id,
                name: p.nombre,
                cantidad: p.cantidadVendidos,
                price: p.precio,
            }))
            cargando.value = 'Exito'                      
            
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                cargando.value = 'Error'
                
        }finally{
            cargando.value='Exito'
        }
    }
    async function crear() {
        cargando.value='Cargando'
        const nuevoProducto = {
        nombre: 'gatus',
        cantidad: 57,
        precio: 1500000
        };
        
        try{
           const respuesta = await fetch('http://localhost:8000/api/productos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
            });
            const resultado = await respuesta.json();
            console.log(resultado);
            console.log(resultado.id);
            produc.value.push({
                'id':resultado.id,
                'name':nuevoProducto.nombre,
                "cantidad":nuevoProducto.cantidad,
                "price":nuevoProducto.precio,
            })                      
            
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                cargando.value = 'Error'
                
        }finally{
            cargando.value='Exito'
        }
    }
    async function eliminar() {
        cargando.value='Cargando'
        const id = ref(19)

        
        try{
            const respuesta = await fetch(`http://localhost:8000/api/productos/${id.value}`,{method: 'DELETE'});
            const resultado = await respuesta.json();
            console.log(resultado);
            const indice = produc.value.findIndex(c=>c.id===id.value)
            if (indice !== -1) {
            produc.value.splice(indice, 1); 
            }                  
            
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                cargando.value = 'Error'
                
        }finally{
            cargando.value='Exito'
        }
    }
    async function actualizar() {
        cargando.value='Cargando'
        const id = ref(1)
        const productoAc = {
        nombre: 'carro',
        cantidad: 200,
        precio: 190000
        };

        
        try{
            const respuesta = await fetch(`http://localhost:8000/api/productos/actualizar/${id.value}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoAc)
            });
            const resultado = await respuesta.json();
            console.log(resultado);
            const usuarioEditar = produc.value.find(c=>c.id===id.value)
            if(usuarioEditar){
                Object.assign(usuarioEditar,productoAc)
            }
                          
            
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                cargando.value = 'Error'
                
        }finally{
            cargando.value='Exito'
        }
    }
    


    return {
        produc,
        cargar,
        crear,
        eliminar,
        actualizar,
        acumuladoVentas,
        rotacionC,
        ventas,
        cargando,
        cantProductos,
        promedio
    }
})