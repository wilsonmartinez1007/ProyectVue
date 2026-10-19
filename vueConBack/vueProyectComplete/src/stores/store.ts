import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import { toast } from 'vue-sonner'
import { getProductosAPI } from '@/servicies/serviceProduct'
import type {Producto} from '@/types/interfaces'


export const store = defineStore('producto',()=>{
    const produc = ref<Producto[]>([])
    const cargando = ref(false)
    const error = ref<Error|null>(null)

    const cantProductos = computed(()=>{
        return produc.value.length
    })
   const unidadesdeTotales = computed(()=>{
        return produc.value.reduce((a,p)=>{
            return a+p.cantidad
        },0)
   })
    

    const acumuladoVentas = computed(()=>{
        return produc.value.reduce((acumulador,producto)=>{
            return acumulador + producto.cantidad
            },0)
                }
             )
    const rotacionC =computed(()=>{
            return produc.value.map((c: any)=>({
                id: c.id,
                name: c.name,
                cantidad: Math.floor((c.cantidad/acumuladoVentas.value)*100*100)/100,
                price:c.precio,
            }))
           
    })
     const ventas = computed(()=>{
        return produc.value.map((p:any)=>({
            id: p.id,
            name: p.name,
            totalVentas: p.cantidad*p.price,
        }))
     })
    const promedio = computed(()=>{
        return (unidadesdeTotales.value/cantProductos.value).toFixed(0)
    })
    
           
    

    //action
    async function cargar() {
        cargando.value=true
        error.value = null
        try{
            const datos = await getProductosAPI();
            
           
            produc.value = datos.map((p: any)=>({
                id: p.id,
                name: p.nombre,
                cantidad: p.cantidadVendidos,
                price: p.precio,
            }))
            
        
           
            
            
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
            error.value=e
            console.log("problema al cargar la API",e)
        }finally{
            cargando.value=false
        }
    }
    async function eliminar(id:number) {
        const estadoAnterior = produc.value
        produc.value = produc.value.filter(c=>c.id!==id)
        try{
            const response = await fetch(`http://localhost:8000/api/productos/${id}`,{method: 'DELETE'})
             if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
                }
        }catch(e){
            await new Promise(resolve => setTimeout(resolve, 2000))
            produc.value = estadoAnterior
            toast.error('No se pudo eliminar el producto')
            console.log("problema al enviar la API",e)
        }
    }
    


    return {
        produc,
        cargar,
        eliminar,
        acumuladoVentas,
        rotacionC,
        ventas,
        error,
        cantProductos,
        unidadesdeTotales,
        promedio
    }
})