
<script setup>
    import { ref } from 'vue';
    const productoN = ref({
        nombre: '',
        cantidad: 0,
        precio: 0
    })
    
</script>
<template>
    <div class="form">
       <label>Nombre del producto: <input v-model="first"></label><br>
       <label>Cantidad           : <input v-model="last"></label><br>
       <label>Precio: <input v-model="first"></label>
    </div>
</template>
<style scoped>
    .form{text-align: start;}
</style>