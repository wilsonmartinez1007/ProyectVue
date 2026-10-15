<script setup>
import { onMounted} from 'vue'
import {store} from './stores/store.ts'
import { Toaster } from 'vue-sonner'

const productos = store()
onMounted(()=>{
  productos.cargar()
})
</script>

<template>
  <div class="tarjeta">

    <h1>Productos</h1>
    <Toaster/>
    <p v-if="productos.error==null">
      <div @click="productos.eliminar(p.id)" v-for="p in productos.produc" :key="p.id">
        <p>Nombre: {{ p.name }} <button>CANCELAR</button>
          <br>Precio: {{ p.price }}</p>
        
        
      </div>
    </p>
    <p v-else>
      Problema en la peticion
    </p>

    
      
  </div>
</template>

<style scoped>
  .tarjeta{
    border: 2px solid #ccc;
    padding: 1rem;
    border-radius: 30px;
    background-color: rgb(224, 222, 218);
  }

  </style>
