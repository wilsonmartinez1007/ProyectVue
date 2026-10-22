<script setup>
import { onMounted,ref} from 'vue'
import {store} from './stores/store.ts'

//imagen
import fondo from './assets/fondo.png'
import { storeToRefs } from 'pinia'

//mostrar productos en tabla
import Productos from './components/productos/Productos.vue'
//editar/crear/eliminar productos
import ProductoEditar from './components/productos/ProductoEditar.vue'
//radial
import RadialMenu from '@/components/radial/RadialMenu.vue'


const seccionActual = ref('inicio')
const subVistaActiva = ref('graficos') // 'graficos' | 'inventario'


const productos = store()
const {produc, rotacionC, ventas, promedio, cargando} = storeToRefs(productos)

import { useProductosCharts } from './composables/useProductoCharts.ts'
import BaseChart from './components/charts/BaseChart.vue'
//compossable
const {option, clasificacion,ventasandPromedio,actualizarPorcentaje} = useProductosCharts(produc, rotacionC, ventas, promedio) 




onMounted(()=>{
  productos.cargar()
  
})

// Cambiar la sub-vista desde el Menú Radial
function manejarCambioVista(nuevaVista) {
  subVistaActiva.value = nuevaVista
}


</script>

<template>
  <div class="contenedor">
      
      
      <section v-if="seccionActual==='inicio'" class="section">
        <div class="borde"  >
          <img :src="fondo" alt="Logo del proyecto" class="img">
          <div class="centrar">
          <h1 class="titulo">SATLOCK</h1>
            <p class="texto">Holaa, aqui podras ver los graficos con la información de tus ventas  </p>
            <button class="botonC" @click="seccionActual='dasboard'">Mostrar graficos con charts</button>
            <button @click="productos.crear()">ver si creo</button>
            <button @click="productos.eliminar()">eliminar</button>
            <button @click="productos.actualizar()">actualizar</button>
          
          
          </div>
          </div>
    </section>
  
    <section v-if="seccionActual==='dasboard'" class="dasboardSection">

      <header class="bloqueSalir">
        <button class="botonSalir" @click="seccionActual='inicio'">salir</button>
        <h1 class="titulo">SATLOCK</h1>
        
      </header>

      <div class="dashboard-layout">
        <aside class="columna-radial">
            <RadialMenu @cambiarVista="manejarCambioVista"  />
        </aside>
        
        <main  class="columna-contenido">
          <div class="divisionPantalla" v-if="subVistaActiva === 'graficos' && cargando=='Exito'">
            
            <div  class="divisionPantallaFila">
              
              <div class="chart-container">
              <h2>Cantidad de ventas por Producto</h2>
              <BaseChart :option="ventasandPromedio"  />
              </div>
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
          <div class="divisionPantalla">
              <div class="placeholder-card">
                
              <h2>Inventario</h2>
              <Productos></Productos>
              
                </div>
              <div class="cardForm">
                <h2>Crea y actualiza tus productos</h2>
                <ProductoEditar></ProductoEditar>
              </div>
          
          </div>
          

        </div>
           
         
          
        
      </main>
      
      </div>
      
      
      
      
      
        
         
       
        
    </section>
    </div>
    


  
</template>

<style scoped>
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

  @media (max-width: 900px) {
  .dashboard-layout {
    flex-direction: column;
    align-items: center;
  }}
  
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
    margin-left: 90%;
    font-size: 1.6rem;
  }
  .botonSalir:hover{
    border-color: #ff6347;
    color: #ff6347;
  }
  .texto{
    font-size: 1.7rem;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    color: #ccc;
    text-align:start;
  }

  
  .chart-container {
    background: #1e1e1e;
    border-radius: 12px;
    width: 90%;
    border: 1px solid #333;
  }
  .chart-container h2 {
    margin-top: 1 rem;
    margin-left: 2rem;
    font-size: 2rem;
    color: #e8e3e2;
  }

 
  
  
  .titulo{
    font-size: 2.9rem;
    font-family:Arial, Helvetica, sans-serif;
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
    margin-left: 10%;
    background-color: #1e1e1e;
    border: 1px dashed #ff6347;
    padding: 2.5rem;
    border-radius: 12px;
    text-align: center;
    color: #fff;
    min-width: 700px;
  }
  .placeholder-card h2 {
  color: #ff6347;
  margin-bottom: 0.5rem;
  }
  .cardForm {
    margin-left: 20%;
    background-color: #1e1e1e;
    border: 1px dashed #ff6347;
    padding: 2.5rem;
    border-radius: 12px;
    text-align: center;
    color: #fff;
    min-width: 00px;
  }
  .cardForm h2 {
  color: #ff6347;
  margin-bottom: 0.5rem;
  }


  
  </style>
