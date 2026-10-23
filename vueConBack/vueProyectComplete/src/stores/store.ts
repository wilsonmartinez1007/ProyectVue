import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
//import { toast } from 'vue-sonner'
import { getProductosAPI,posProductosApi,deleteProductosApi,putProductosApi } from '@/services/serviceProduct'
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
    async function crear(nuevoProducto) {
        cargando.value='Cargando'
        
        
        try{
            console.log(nuevoProducto)
           const peticionCrear = await posProductosApi(nuevoProducto);
           
            
            console.log(peticionCrear);
            console.log(peticionCrear.id);
            produc.value.push({
                'id':peticionCrear.id,
                'name':nuevoProducto.name,
                "cantidad":nuevoProducto.cantidad,
                "price":nuevoProducto.price,
            })                      
            
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                cargando.value = 'Error'
                
        }finally{
            cargando.value='Exito'
        }
    }
    async function eliminar(id:number) {
        cargando.value='Cargando'
       

        
        try{
            const peticion = await deleteProductosApi(id);
            
            console.log(peticion);
            const indice = produc.value.findIndex(c=>c.id===id)
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
    async function actualizar(productoAc) {
        cargando.value='Cargando'
        

        
        try{
            const peticion = await putProductosApi(productoAc);
            
            console.log(peticion);
            const usuarioEditar = produc.value.find(c=>c.id===productoAc.id)
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