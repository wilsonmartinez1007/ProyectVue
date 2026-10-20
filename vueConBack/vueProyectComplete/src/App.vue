<script setup>
import { onMounted,ref} from 'vue'
import {store} from './stores/store.ts'

//imagen
import fondo from './assets/fondo.png'
import { storeToRefs } from 'pinia'


const seccionAcual = ref(0)
const productos = store()
const {produc, rotacionC, ventas, promedio, cargando} = storeToRefs(productos)

import { useProductosCharts } from './composables/useProductoCharts.ts'
import BaseChart from './components/BaseChart.vue'
//compossable
const {option, clasificacion,ventasandPromedio,actualizarPorcentaje} = useProductosCharts(produc, rotacionC, ventas, promedio) 




onMounted(()=>{
  productos.cargar()
  
})


</script>

<template>
  <div class="contenedor">
      
      
      <section v-if="seccionAcual===0" class="section">
        <div class="borde"  >
          <img :src="fondo" alt="Logo del proyecto" class="img">
          <div class="centrar">
          <h1 class="titulo">SATLOCK</h1>
            <p class="texto">Holaa, aqui podras ver los graficos con la información de tus ventas  </p>
            <button class="botonC" @click="seccionAcual=1">Mostrar graficos con charts</button>
          
          
          </div>
          </div>
    </section>
  
    <section v-if="seccionAcual===1" class="dasboardSection">

      

      <div class="divisionPantalla" v-if="cargando=='Exito'">
          <div  class="divisionPantallaFila">
            <div>
            <BaseChart :option="clasificacion "  @legendselectchanged="actualizarPorcentaje"/>
          </div>
            

            <div class="chart-container">
            
            
            <BaseChart :option="ventasandPromedio"  />
             </div>
          </div>
          
        
          <div class="divisionPantallaFila">

            
          <div class="bloqueSalir">
              <button class="botonSalir" @click="seccionAcual=0">salir</button>
             
              <h3>
                Estado Peticion :{{ cargando }}
              </h3>
            </div>
          <div> 
 
            <BaseChart :option="option"  />
          </div>
          
          </div>
          
        
      </div>
      <p v-else>
        Estado :{{ cargando }}
      </p>
      
        
         
        
        
    </section>
    </div>


  
</template>

<style scoped>
  .contenedor{
    min-height: 100vh;
    background-color: #f8f1f1;
    
  }
  .section {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12rem 1rem;
    margin-left: 10rem;
  }
  .borde{
    position: relative;
    background-color: rgba(68, 18, 18, 0.314);
    border-radius: 20px;
    width: 100%;
    max-width: 500px;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    
    

  }
  .borde:hover {
    transform: translateY(-8px); 
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.15); 
  }
  .centrar{
    position: absolute;
    inset: 0;
    display: flex;
    width: 70%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.45);
    text-align:flex-start;
    border-radius: 20px;
    
  }
  .img{
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
    border-radius: 20px;
  }
  .botonSalir{
    padding: 0.5rem 1.2rem;
    width: 120px;
    background-color:rgb(95, 89, 81);
    border-radius: 10px;
    color:#f5f2f1;
    border: none;
    font-size: x-large;
  }
  .botonSalir:hover{
    background-color: rgb(144, 158, 158);
  }
  .texto{
    font-size: 1.7rem;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    color: #ccc;
    text-align:start;
  }

  
  .chart-container {
    width: 100%;
    height: 400px;
    min-height: 400px;
  }

 
  
  
  .titulo{
    font-size: 2.9rem;
    font-family:sans-serif;
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
    font-size:1.3rem;
    text-decoration: underline;
    transition: color 0.3s ease;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: start;


  }
  .botonC:hover{
    color: #FF6347;
  }
  .dasboardSection{
    padding: 4rem;
  }

  


  .divisionPantalla{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap:20px;
    

  }
  .divisionPantallaFila{
    display:grid;
    grid-template-rows: repeat(auto-fit,minmax(300px,1fr));
    gap:20px;
    

  }
  .bloqueSalir{
    padding: 2rem;
    margin-left:550px;
  

  }

  </style>
