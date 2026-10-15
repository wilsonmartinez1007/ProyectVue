import {defineStore} from 'pinia'
import {ref, } from 'vue'
import { toast } from 'vue-sonner'
export interface Producto {
    "id": number,
    "name": string,
    "price":number,
}

export const store = defineStore('producto',()=>{
    const produc = ref<Producto[]>([])
    const cargando = ref(false)
    const error = ref<Error|null>(null)
    

    //action
    async function cargar() {
        cargando.value=true
        error.value = null
        try{
            const respuesta = await fetch('http://localhost:8000/api/productos',{method:'GET'})
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`)
                }
            
            const cambioRespuesta = await respuesta.json()
            produc.value = cambioRespuesta.map((p: any)=>({
                id: p.id,
                name: p.nombre,
                price:p.precio,
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
        error
    }
})