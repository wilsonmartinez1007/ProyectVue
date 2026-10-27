<script setup>
import { onMounted,ref} from 'vue'
import {store} from './stores/store.ts'
import { storeToRefs } from 'pinia'
import { pluginStore } from './stores/pluginStore.ts'
import { useProductosCharts } from './composables/useProductoCharts.ts'
import BaseChart from './components/charts/BaseChart.vue'
import { Toaster } from 'vue-sonner'
//imagen
import fondo from './assets/fondo.png'
import satlock from './assets/titulo/titulo.png'


//mostrar(tabla)/crear/editar/eliminar productos 
import Productos from './components/productos/Productos.vue'

//radial
import RadialMenu from '@/components/radial/RadialMenu.vue'

const uiStore = pluginStore()
const {seccionActual,subVistaActiva} = storeToRefs(uiStore)

const productos = store()
const {produc, rotacionC, ventas, promedio, cargando} = storeToRefs(productos)
const {option, clasificacion,ventasandPromedio,actualizarPorcentaje} = useProductosCharts(produc, rotacionC, ventas, promedio) 

onMounted(()=>{
  productos.cargar()
  
})

function manejarCambioVista(nuevaVista) {
  subVistaActiva.value = nuevaVista
}


</script>

<template>
  <Toaster/>
  <div class="contenedor">
      
      
      <section v-if="seccionActual==='inicio'" class="section">
        <div class="borde"  >
          <img :src="fondo" alt="Logo del proyecto" class="img">
          <div class="centrar">
            
            <h1 class="titulo">SATLOCK</h1>
              <p class="texto">Holaa, aqui podras ver los graficos con la información de tus ventas  </p>
              <button class="botonC" @click="seccionActual='dasboard'">Mostrar graficos con charts</button>
              
          
          
          </div>
          </div>
    </section>
  
    <section v-if="seccionActual==='dasboard'" class="dasboardSection">

      <header class="bloqueSalir">
        <button class="botonSalir" @click="seccionActual='inicio'">salir</button>   
      </header>

      <div class="dashboard-layout">
        <aside class="columna-radial">
          <div class="tituloS"><img :src="satlock" alt="titulo prin"></div>
          
            <RadialMenu :sub-vista="subVistaActiva" @cambiarVista="manejarCambioVista"  />
        </aside>
        
        <main  class="columna-contenido">
          <div class="divisionPantalla" v-if="subVistaActiva === 'graficos' && cargando=='Exito'">
              
              <div class="chart-containerVentas">
              <h2>Cantidad de ventas por Producto</h2>
              <BaseChart :option="ventasandPromedio"  />
              </div>
            
          
        
          <div class="divisionPantallaFila">

            
            
            <div class="chart-container">
             <h2>Distribución por rotacion</h2>
            <BaseChart :option="clasificacion "  @legendselectchanged="actualizarPorcentaje"/>
              </div>
          <div class="chart-container"> 
            <h2>Ingresos por producto</h2>
            <BaseChart :option="option"  />
          </div>
          
          </div>
          
        </div>
        <div v-else-if="subVistaActiva === 'inventario'">
          
            <div class="placeholder-card">
                
              <h2>INVENTARIO</h2>
              <Productos></Productos>
              
                
              
          
                </div>
          

        </div>
           
         
          
        
      </main>
      
      </div>
      
      
      
      
      
        
         
       
        
    </section>
    </div>
    


  
</template>

<style scoped>
  .tituloS{
    width: 280px;
  }
  .tituloS img{
    width: 100%;
    height: 100px;
    object-fit: cover;
    display: block;
    border-radius: 20px;
  }
  .dashboard-layout {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    margin-top: 1rem;
  }
  .columna-radial {
  flex: 0 0 300px; /* Ancho fijo para el Menú Radial */
  position: sticky;
  top: 2rem;
  padding: 2rem;
  }

.columna-contenido {
  flex: 1; /* El contenido toma el resto del espacio disponible */
  }

  
  .columna-radial {
    flex: initial;
    position: static;
  }
  .contenedor{
    min-height: 100vh;
    background-color:  rgba(3, 3, 3, 0.85);
    
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
    background-color:transparent;
    border:1px dashed #ff6347;
    color: #ccc;
    border-radius: 10px;
    margin-left: 92.7%;
    font-size: 1.5rem;
  }
  .botonSalir:hover{
    border-color: #ff6347;
    color: #ff6347;
  }
  .texto{
    font-size: 1.5rem;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    color: #ccc;
    text-align:start;
  }

  
  .chart-container {
    background: #1e1e1e;
    border-radius: 12px;
    width: 96%;
    border: 1px solid #333;
    min-height: 640px;
  }
  .chart-container h2 {
    margin-top:  4rem;
    margin-left: 2rem;
    font-size: 2rem;
    font-family:Arial, Helvetica, sans-serif;
    color: #ff6347b3;
  }
  .chart-containerVentas {
    background: #1e1e1e;
    border-radius: 12px;
    width: 96%;
    border: 1px solid #333;
    max-height: 638px;
  }
  .chart-containerVentas h2 {
    margin-top:  4rem;
    margin-left: 2rem;
    font-size: 2rem;
    font-family:Arial, Helvetica, sans-serif;
    color: #ff6347b3;
  }
 
  .centrar h1{
    font-size: 3.4rem;
    font-family:Arial, Helvetica, sans-serif;
    color:#FF6347;
    margin-left: 10px;
  }
  .columna-radial h1{
    font-size: 3.4rem;
    font-family:Arial, Helvetica, sans-serif;
    color:#FF6347;
    margin-left: 10px;
    
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
    padding: 2rem;
    min-height: 100vh;
    
  }

  


  .divisionPantalla{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
   
    margin-top: 1rem;
    

  }
  .divisionPantallaFila{
    display:grid;
    grid-template-rows: repeat(auto-fit,minmax(350px,1fr));
    gap:20px;
    

  }
  .bloqueSalir{
    padding: 1rem;
    color:#f5f2f1;
  

  }
  .placeholder-card {
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    color: #fff;
    min-width: 1000px;
    max-width: 1390px;
  }
  .placeholder-card h2 {
    color: #fffdfdc2;
    margin-bottom: 0.5rem;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3rem;
    margin-right: 600px;
  }
  .cardForm {
    margin-left: 20%;
    background-color: #1e1e1e;
    border: 1px dashed #ff6347;
    padding: 2.5rem;
    border-radius: 12px;
    text-align: center;
    color: #fff;
  }
  .cardForm h2 {
    color: #ff6347;
    margin-bottom: 0.5rem;
  }


  
  </style>
