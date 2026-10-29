<script setup>
    import {store} from '@/stores/store'
    import { storeToRefs } from 'pinia';
    const productos = store()
    const {filtro} = storeToRefs(productos)
    import {Ciudad} from '@/types/ciudades'

</script>
<template>
    <div class="filtro">
        <h4>Filtros disponibles:</h4>
        <label for="selectCiudad">Ciudad</label>
        <select id="selectCiudad" v-model="filtro">
            <option v-for="item in Ciudad" >{{ item }}</option>
        </select>
    </div>
    
</template>
<style scoped>
    .filtro {
        color: #ccc;
        width: 250px;
        font-size: 1.3rem;
        font-family:Arial, "Helvetica Neue", Helvetica, sans-serif;
    }
     select {
        font-size:1.3rem;
        width:100%;
        background-color:#292727;
        border-radius: 5px;
        border-top: .2rem solid #ff6347;
        text-align: start;
        color:#ccc
    }
    </style>