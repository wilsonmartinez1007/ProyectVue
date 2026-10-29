import {defineStore} from 'pinia'
import {ref, computed, toRaw} from 'vue'
import { toast } from 'vue-sonner'
import { getProductosAPI,posProductosApi,deleteProductosApi,putProductosApi } from '@/services/serviceProduct'
import type {Producto, Estado} from '@/types/interfaces'


export const store = defineStore('producto',()=>{
    const produc = ref<Producto[]>([])
    const cargando = ref<Estado|null>(null)
    const cantProductos = computed(()=>{return produc.value.length  })
    const borradorFormulario = ref<Producto[]>([])
    const searchQuery = ref('')
    const productoSeleccionado = ref(null)
    const filtro = ref('Todas')
   
    const filtroCiudades = computed(()=>{
        if(filtro.value ==='Todas') return produc.value
        
        console.log("Cali:"+ filtro.value)
        return produc.value.filter(d=>d.ciudad === filtro.value)
        
    })
    

    const acumuladoVentas = computed(()=>{
        return produc.value.reduce((acumulador,producto)=>{
            return acumulador + producto.cantidad
            },0)
                })

    const rotacionC =computed(()=>{
        if(acumuladoVentas.value>0){
            return filtroCiudades.value.map((c: Producto)=>({
                id: c.id,
                name: c.name,
                cantidad: Math.floor((c.cantidad/acumuladoVentas.value)*100*100)/100,
                price:c.price,
            }))
        }else return[]
    })
   
    const ventas = computed(()=>{
        return filtroCiudades.value.map((p:Producto)=>({
            id: p.id,
            name: p.name,
            totalVentas:p.cantidad*p.price,
        }))})

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
                fecha: p.fecha,
                ciudad:p.ciudad
            }))
            cargando.value = 'Exito'                      
            toast.message("Productos cargados con exito")
            cargando.value='Exito'  
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                cargando.value = 'Error'
                toast.message("Problema en la peticion")     }}

    async function crear(nuevoProducto:Producto) {
        cargando.value='Cargando'
        const estadoAnterior = produc.value
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
                "fecha":nuevoProducto.fecha,
                "ciudad":nuevoProducto.ciudad
            })
            cargando.value = 'Exito' 
            toast.message("Producto creado con exito")                           
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                {cargando.value = 'Error'
                toast.message("Problema en la peticion")
                produc.value= estadoAnterior}        
        }}
    async function eliminar(id:number) {
        cargando.value='Cargando'
        const estadoAnterior = produc.value
        try{
            const peticion = await deleteProductosApi(id);
            
            console.log(peticion);
            const indice = produc.value.findIndex(c=>c.id===id)
            if (indice !== -1) {
            produc.value.splice(indice, 1); 
            }     
            toast.message("Poducto eliminado con exito")
            cargando.value='Exito'                
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                {cargando.value = 'Error'
                produc.value = estadoAnterior
                toast.message("Problema en la peticion")}        
        }}

    async function actualizar(productoAc:Producto) {
        cargando.value = 'Cargando'
        const copia = structuredClone(toRaw(produc.value))
        const usuarioEditar = produc.value.find(c=>c.id===productoAc.id)
        if(usuarioEditar){
            Object.assign(usuarioEditar,productoAc)
        }
        try{
            const peticion = await putProductosApi(productoAc);
            console.log(peticion);  
            toast.message("Prducto actualizado con exito")
            cargando.value='Exito'     
        }catch(e){
            if( e instanceof Error && e.name !== "AbortError")
                {cargando.value = 'Error'
                produc.value = copia
                toast.message("Problema en la peticion")}
        }}

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
        promedio,
        borradorFormulario,
        searchQuery,
        productoSeleccionado,
        filtro,
        filtroCiudades
    }
},{
    persist:{
        pick:['borradorFormulario','searchQuery', 'productoSeleccionado']
        }}
)