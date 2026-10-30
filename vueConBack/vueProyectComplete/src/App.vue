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

//
//mostrar(tabla)/crear/editar/eliminar productos 
import Productos from './components/productos/Productos.vue'
//mostrar filtro
import Filtrado from './components/filtro/Filtrado.vue'
//radial
import RadialMenu from '@/components/radial/RadialMenu.vue'

const uiStore = pluginStore()
const {seccionActual,subVistaActiva} = storeToRefs(uiStore)

const productos = store()
const { rotacionC, ventas, promedio, cargando, filtroCiudades} = storeToRefs(productos)

const {option, clasificacion,ventasandPromedio,actualizarPorcentaje} = useProductosCharts(filtroCiudades, rotacionC, ventas, promedio) 

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
      
      
      <section v-if="seccionActual==='inicio'" class="sectionInicio">
        <div class="borde"  >
          <img :src="fondo" alt="Logo del proyecto" class="img">
          <div class="centrar">
            
            <h1 class="titulo">The Platforms</h1>
              <p class="texto">Holaa, aqui podras ver los graficos con la información de tus ventas  </p>
              <button class="botonC" @click="seccionActual='dasboard'">Mostrar graficos con charts</button>
              
          
          
          </div>
          </div>
    </section>
  
    <section v-if="seccionActual==='dasboard'" class="dasboardSection">

      <header class="header">
        <div class="bloqueSalir">
          <h2>The Platforms</h2>
        <h4  :class="{'activa':cargando}"> <br>Estado: {{ cargando }}</h4>
        <button @click="seccionActual='inicio'">salir</button> 
        </div>
        <h3>Inventario</h3>
        <p>Puedes crear/editar/eliminar productos y vizualizar graficos <br> como el total de ventas por producto, el promedio <br>y la rotacion por ventas</p>
      </header>

      <div class="dashboard-layout">
        <aside class="columna-radial">
            <i :class="{'invisible': subVistaActiva === 'inventario'}">
              <Filtrado/></i>
            
            <RadialMenu :sub-vista="subVistaActiva" @cambiarVista="manejarCambioVista"  />
            
        </aside>
        
        
        <main  class="columna-contenido">
          <div class="divisionPantalla" v-if="subVistaActiva === 'graficos' && cargando=='Exito' && filtroCiudades.length>0">
              
              <div class="chart-containerVentas">
              <h2>Cantidad de ventas por Producto</h2>
              <BaseChart :option="ventasandPromedio"  />
              </div>
            
          
        
          <div class="divisionPantallaFila">

            
            
            <div class="chart-containerRotacion">
             <h2>Distribución por rotacion</h2>
            <BaseChart :option="clasificacion "  @legendselectchanged="actualizarPorcentaje"/>
              </div>
          <div class="chart-containerIngreso"> 
            <h2>Ingresos por producto</h2>
            <BaseChart :option="option"  />
          </div>
          
          </div>
          
        </div>
        <div v-else-if="subVistaActiva === 'inventario'">
          
            <div class="placeholder-card">
                
              
              <Productos></Productos>
              
                
              
          
                </div>
          

        </div>
        <p v-else><div class="ciudadNoCompras">Esta ciudad no tiene compras registradas :() </div></p>
           
         
          
        
      </main>
      
      </div>
      
      
      
      
      
        
         
       <footer class="barraAbajo"></footer>
        
    </section>
    
    </div>
    
    

  
</template>

<style scoped>
.ciudadNoCompras{
  margin-top: 30px;
  color: #ccc;
  font-size: 3rem;
  margin-right: 50px;
  min-height: 50vh;
  padding: 2rem;
  background-color: #55494725;
  border-right: 3px solid #d9534f;
}
  .barraAbajo{
    width: 100%!important;
    height: 80px!important;
    background-color: #333;
  }
  .invisible{
    visibility: hidden;
  }
  .titulo{
    width: 290px;
    font-size: 2rem;
  }
  .titulo img{
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
    background-color: #333;
    border-radius: 10px;
    border-left: 3px solid #ff6347;
    margin-left: 30px;
    margin-top: 19px;
    position:sticky;
    padding: 2rem;
    margin-bottom: 50px;
    min-height: 90vh!important;
    }

  .columna-contenido {
    flex: 1; /* El contenido toma el resto del espacio disponible */
    }

  
  
  .contenedor{
    margin-top: 0px!important;
    min-height: 100vh!important;
    background-color:  rgba(3, 3, 3, 0.85);
    
  }
  
  .sectionInicio {
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
  .header{
    padding: 1.2rem;
    color:#f5f2f1;
    background-color: #333;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }
  .bloqueSalir{
    
   
    display: flex;

  }
  .bloqueSalir h2{
    color: #d9534f;
  }
  .bloqueSalir h4{
    margin-left: 70%;
    margin-top: 10px;
    width: 130px;
    height:40px;
    padding: 3px;
    border-radius: 10px;
    text-align: center;
  }
  .activa{
    color: #1DB954;
  }
  
  .bloqueSalir button{
    width: 100px;
    height: 45px;
    background-color:#d9534f;
    color: #ccc;
    border-radius: 10px;
    border: none;
    margin-left: 16px;
    margin-top: 15px;
    font-size: 1.5rem;
  }
  .bloqueSalir button:hover{
    background-color: rgba(24, 23, 23, 0.658);
  }
  .texto{
    font-size: 1.5rem;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    color: #ccc;
    text-align:start;
  }
  .chart-containerRotacion {
    background: #1e1e1e;
    border-radius: 12px;
    width: 96%;
    border: 1px solid #333;
    max-height: 440px;
  }
  
  .chart-containerIngreso {
    background: #1e1e1e;
    border-radius: 12px;
    width: 96%;
    border: 1px solid #333;
    margin-top: 0px!important;
    max-height: 490px;
    margin-bottom: 20px;
  }
  .chart-containerRotacion h2 {
    margin-top:  3rem;
    margin-left: 2rem;
    font-size: 1rem;
    font-family:Arial, Helvetica, sans-serif;
    color: #d9534f;
  }
  .chart-containerIngreso h2 {
    margin-top:  3rem;
    margin-left: 2rem;
    font-size: 1rem;
    font-family:Arial, Helvetica, sans-serif;
    color:#d9534f;
  }
  .chart-containerVentas {
    background: #1e1e1e;
    border-radius: 12px;
    width: 96%;
    border: 1px solid #333;
    max-height: 430px;
  }
  .chart-containerVentas h2 {
    margin-top:  4rem;
    margin-left: 2rem;
    font-size: 1rem;
    font-family:Arial, Helvetica, sans-serif;
    color: #d9534f;
  }
 
  .centrar h1{
    font-size: 3rem;
    font-family:Arial, Helvetica, sans-serif;
    color:#d9534f;
    margin-left: 10px;
  }
  .columna-radial h1{
    font-size: 3.4rem;
    font-family:Arial, Helvetica, sans-serif;
    color:#FF6347;
    margin-left: 10px;
    
  }
  .botonC{
    height: 50px;
    width: 100%;
    border-radius: 11px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color:#ccc;
    border: none;
    background-color: transparent;
    font-size:1.2rem;
    text-decoration: underline;
    transition: color 0.3s ease;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: start;


  }
  .botonC:hover{
    color: #d9534f;
  }
  .dasboardSection{
    padding: 0rem;
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
