
<script setup>

    import {watch, computed } from 'vue';
    import { storeToRefs } from 'pinia'
    import { store } from '@/stores/store.ts'

    const productos = store()
    const {borradorFormulario:form} = storeToRefs(productos) 
   
    const props = defineProps({
        productoSeleccionado: {
            type: Object
        }
    })
    const emit = defineEmits(['guardar', 'actualizar', 'eliminar','limpiar'])
    const esEdicion = computed(() => Boolean(form.value.id))


    watch(
        ()=> props.productoSeleccionado,
        (nuevoVal)=>{
            if(nuevoVal){
                form.value = {
                    id: nuevoVal.id ?? '',
                    name: nuevoVal.name ?? '',
                    cantidad: nuevoVal.cantidad ?? 0,
                    price: nuevoVal.price ?? 0
                }
                esEdicion.value=true
            }else{
                limpiarFormulario()
            } }, )
    function limpiarFormulario(){
        form.value ={id:'',name:'',cantidad:0,price:0}
        esEdicion.value = false
        emit('limpiar')
    }
    function guardar(){
        if(!form.value.name) return alert('Se deben llenar todos los campos')
        emit('guardar',{...form.value})
        limpiarFormulario()
    }
    function actualizar(){
        emit('actualizar',{...form.value})
        limpiarFormulario()
    }
    function eliminar(){
        if (confirm(`Seguro que quieres eliminar el producto ${form.value.name}?`)){
            emit('eliminar', form.value.id)
            limpiarFormulario()
        } }
</script>
<template>
    <div class="form-container">
        <div>
             
            <h3>{{ esEdicion? 'Editar Producto':'Crear un producto' }}</h3>
            <button v-if="esEdicion" class="btn-nuevo" @click="limpiarFormulario">
                Crear Producto
            </button>
        </div>
        <form @submit.prevent="esEdicion? actualizar():guardar()">
            <div class="form-group" v-if="esEdicion">
                <label>ID (Autoseleccionado)</label>
                <input v-model="form.id" type="text" disabled class="input-disabled">
            </div>
            <div class="form-group">
                <label > Nombre del Producto</label>
                <input v-model="form.name" type="text" placeholder="Ej. celuco" required>
                
            </div>
            <div class="form-group">
                <label > Cantidad</label>
                <input v-model="form.cantidad" type="number" placeholder="Ej. 3" required>
                
            </div>
             <div class="form-group">
                <label >Precio</label>
                <input v-model="form.price" type="number" placeholder="Ej. 1000" required>
                
            </div>
            <div class="form-actions">
                <button v-if="!esEdicion" type="submit" class="btn-primary">
                    Crear Producto
                </button>
                <template v-else>
                    <button type="button" class="btn-warning" @click="actualizar">
                    Actualizar
                </button>
                <button type="button" class="btn-danger" @click="eliminar">
                    Eliminar
                </button>
                </template>
                
            </div>
             
        </form>
    </div>
</template>
<style scoped>
    
    .form-container{
        background-color: transparent;
        border: none;
        border-radius: 1rem;
        padding: 1.5rem;
        color: #fff        
        }
    
    .form-container h3{
        font-size: 1.3rem;
    }
   
    .form-group{
        display: flex;
        flex-direction: column;
        gap:0.4rem;
        margin-bottom: 1rem;

    }
    .form-group label {
        font-size:1.3rem;
        text-align: start;
        color:#ccc
    }
    input{
        padding: 0.6rem 0.8rem;
        border-radius: 6px;
        border:1px solid #444;
        background-color: #2b2b2b;
        color:#fff;
        font-size: 0.95rem;
    }
    input:focus{
        outline: none;
        border-color: #ff6347;
    }
    .input-disabled{
        background-color: #181818;
        color: #888;
        cursor: not-allowed;
    }
    .form-actions{
        display: flex;
        gap:0.5rem;
        margin-top: 1.5rem;
    }
    .form-actions button{
        font-size: 1.3rem;
    }
    button{
        flex:1;
        padding: 0.6rem;
        border:none;
        border-radius: 6px;
        font-weight:bold;
        font-size: 1.2rem;
        cursor:pointer;
        transition: opacity 0.2s;
    }
    button:hover{
        opacity: 0.55;
    }
    .btn-primary{background-color: #ff6347;color: #fff;}
    .btn-warning{ background-color: #fafafa;color: #000;}
    .btn-danger {background-color: #d9534f; color: #000;}
    .btn-nuevo{background-color: #333; color:#ccc; font-size: 1.3rem;padding: 0.3rem 0.6rem;margin-bottom: 1rem;}
</style>
