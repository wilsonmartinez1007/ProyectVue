<script setup>
    import DemoGrid from './Grid.vue'
    import { ref } from 'vue'

    import {store} from '@/stores/store.ts'
    import { storeToRefs } from 'pinia'

    //formulario
    import ProductoEditar from './ProductoEditar.vue'

    const productos = store()
    const {produc} = storeToRefs(productos)
    const searchQuery = ref('')
    const gridColumns = ['id','name','cantidad', 'price']

    const productoSeleccionado =ref(null)

    function seleccionarProducto(producto){
        productoSeleccionado.value = producto
    }
    function manejoGuardar(nuevoProd){
        if(productos.crear)productos.crear(nuevoProd)
    }
    function manejActualizar(producActualizar){
        if(productos.actualizar)productos.actualizar(producActualizar)
    }
    function manejoEliminar(id){
        if(productos.eliminar) productos.eliminar(id)
    }
    
</script>

<template>
    <div class="modulo-productos">
        <!--izq-->
        <div class="columna-tabla">
            <div class="cbuscar">
                <span>Puedes buscar cualquier columna </span>
                <input name='query' v-model="searchQuery" class="busqueda" placeholder="Dijitando Aqui">
            </div>
            <DemoGrid
            :data="produc"
            :columns="gridColumns"
            :filter-key="searchQuery"
            @seleccionar="seleccionarProducto"
            ></DemoGrid>
        </div>
        
        
    
        <!--der-->
        <div class="columna-formulario">
            <ProductoEditar
                :producto-seleccionado="productoSeleccionado"
                @guardar="manejoGuardar"
                @actualizar="manejActualizar"
                @eliminar="manejoEliminar"
                @limpiar="productoSeleccionado=null"    
        />
        </div>
    </div>
</template>

<style scoped>
    .busqueda{
        margin-top: 1.2rem;
        margin-bottom: 1rem;
        max-width: 316px;
    }
    .buscar{
        font-size: 1.5rem;
        
    }
    .modulo-productos{
        display: grid;
        grid-template-columns: 1fr 340px;
        gap:1.5rem;
        align-items: start;
        width: 100%;
    }
    .cbuscar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        color: #fff;
        }

    .cbuscar input {
        flex: 1;
        padding: 0.5rem 0.8rem;
        border-radius: 6px;
        border: 1px solid #444;
        background-color: #1e1e1e;
        color: #fff;
        }
    .cbuscar span{
        font-size: 1.4rem;
    }
    .columna-tabla {
            flex: 1;
            margin-top:1rem;
            min-width: 0; /* Previene que la tabla se desborde fuera de la pantalla */
            }

    .columna-formulario {
            width: 100%;
            position:relative;
            margin-top: 3.7rem;
            margin-left: -220px; /* Mantiene el formulario visible mientras te desplazas en la tabla */
            }

    
</style>