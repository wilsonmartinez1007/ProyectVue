<script setup>
import { onMounted,ref} from 'vue'
import {store} from './stores/store.ts'

//imagen
import fondo from './assets/fondo.png'
import { storeToRefs } from 'pinia'


const seccionAcual = ref(0)
const productos = store()
const {produc, rotacionC, ventas, promedio} = storeToRefs(productos)

import { useProductosCharts } from './composable/useProductoCharts.ts'
import BaseChart from './components/BaseChart.vue'
//compossable
const {option, clasificacion,ventasandPromedio,actualizarPorcentaje} = useProductosCharts(produc, rotacionC, ventas, promedio) 




onMounted(()=>{
  productos.cargar()
  
})


</script>

<template>
  <div >
      <div class="caja"></div>
      
      <section v-if="seccionAcual===0">
        <div class="borde"  >
          <img :src="fondo" alt="Logo del proyecto" class="img">
          <div class="centrar">
          <h1 class="titulo">SATLOCK</h1>
            <p class="texto">Holaa, aqui podras ver los graficos <br>con la información de tus ventas  </p>
            <button class="botonC" @click="seccionAcual=1">Mostrar graficos con chard</button>
          
          
          </div>
          </div>
    </section>
  
    <section v-if="seccionAcual===1">

      <div class="divisionPantalla">
        <div class="divisionPantallaFila">
          <div class="chart-container">
            <BaseChart v-if="productos.ventas.length>0" :option="option"  
              /><p v-else>Cargandodooo</p>
            
          </div>
          <div>
            <BaseChart v-if="productos.rotacionC.length>0" :option="clasificacion "  @legendselectchanged="actualizarPorcentaje"
              /><p v-else>Cargandodooo</p>
            
          </div>
          
        </div>
        
            
          <div> 
             
              <button class="botonSalir" @click="seccionAcual=0">salir</button>
              <br>
            <BaseChart v-if="promedio.length>0" :option="ventasandPromedio"  
              /><p v-else>Cargandodooo</p>
             
          
        </div>
      </div>
        
         
        
        
    </section>
    </div>


  
</template>

<style scoped>
  .botonSalir{
    margin-left: 80%;
    padding: .3rem;
    width: 12%;
    background-color:rgb(95, 89, 81);
    border-radius: 10%;
    color:#f5f2f1;
    border: none;
    font-size: x-large;
  }
  .botonSalir:hover{
    background-color: rgb(144, 158, 158);
  }
  .texto{
    font-size: large;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    color: #ccc;
  }
  .caja{
    border: none;
    width: 100%;
    background-color: #FF6347;

  }
  
  .chart-container {
    width: 100%;
    height: 400px;
    min-height: 400px;
  }

 
  .img{
    display: block;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
  }
  .centrar{
   
    display: flex;
    width: 70%;
    padding: 0 2rem;
    flex-direction: column;
    align-items:center;
    margin-top: 100px;
    position: absolute;
  }
  .titulo{
    font-size: 35px;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color:#FF6347;
    
  }
  .botonC{
    margin-top: 1rem;
    height: 50px;
    width: 100%;
    border-radius: 11px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color:#ccc;
    border: none;
    background-color: transparent;
    font-size:large;
    text-decoration: underline;
    transition: color 0.3s ease;

  }
  .botonC:hover{
    color: #FF6347;
  }

  
  .borde{
    border: none;
    background-color: rgba(68, 18, 18, 0.314);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    margin-top: 10%;
    padding: 0 2rem;
    width: 600px;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    position: relative;
    

  }
  .borde:hover {
    transform: translateY(-8px); 
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.15); 
  }

  .divisionPantalla{
    display:grid;
    grid-template-columns: repeat(2,1fr);
    gap:20px;
    

  }
  .divisionPantallaFila{
    display:grid;
    grid-template-rows: repeat(2,1fr);
    gap:20px;
    

  }

  

  </style>
