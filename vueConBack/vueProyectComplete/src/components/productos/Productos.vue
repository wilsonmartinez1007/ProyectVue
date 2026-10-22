<script setup>
    import DemoGrid from './Grid.vue'
    import { ref } from 'vue'

    import {store} from '@/stores/store.ts'
    import { storeToRefs } from 'pinia'

    const productos = store()
    const {produc} = storeToRefs(productos)
    const searchQuery = ref('')
    const gridColumns = ['id','name','cantidad', 'price']
    
</script>

<template>
    <form id="search" class="buscar">
        Puedes buscar cualquier columna <input name='query' v-model="searchQuery" class="busqueda" placeholder="Dijitando Aqui">
    </form>
    <DemoGrid
        :data="produc"
        :columns="gridColumns"
        :filter-key="searchQuery"
        ></DemoGrid>
</template>

<style scoped>
    .busqueda{
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
    .buscar{
        font-size: 1.5rem;
    }
</style>