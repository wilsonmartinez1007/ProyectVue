<script setup>
import { onMounted, computed,ref} from 'vue'
import {store} from './stores/store.ts'

//chart
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent } from 'echarts/components'
import VChart from 'vue-echarts'


use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent
])


const seccionAcual = ref(0)
const productos = store()
onMounted(()=>{
  productos.cargar()
  
})






const option = computed(()=>({
  title: {
    text:"Ventas totales por producto",
    left:"center"
  },
  tooltip:{
    trgger:"axis"
  },
  dataset:{
    source:productos.ventas
  },
  xAxis:{
    type:'category'
  },
  yAxis:{
    type: 'value'
  },
  series:[
    { name:'ventas',
      type: 'bar',
      encode:{
        x: "name",
        y: "totalVentas"
      },
      itemStyle:{
        color: '#42b883'
      }
    }
  ]

  
})
)
const clasificacion = computed(()=>({
  title: {
    text:"Clasificacion de Productos por rotacion",
    left:"center"
  },
  tooltip:{
    trgger:"axis"
  },
  dataset:{
    source:productos.rotacionC
  },
  xAxis:{
    type:'category'
  },
  yAxis:{
    type: 'value'
  },
  series:[
    { name:'ventas',
      type: 'bar',
      encode:{
        x: "name",
        y: "cantidad"
      },
      
      itemStyle:{
        padding:'10px',
        color: '#42b883'
      }
    }
  ]

  
})
)
const ventasandPromedio = computed(()=>({
  title: {
    text:"Clasificacion de Productos por rotacion",
    left:"center"
  },
  tooltip:{
    trgger:"axis"
  },
  dataset:{
    source:productos.p
  },
  xAxis:{
    type:'category'
  },
  yAxis:{
    type: 'value'
  },
  series:[
    { name:'ventas',
      type: 'bar',
      encode:{
        x: "name",
        y: "cantidad"
      },
      itemStyle:{
        color: '#42b883'
      }
    }
  ]

  
})
)

</script>

<template>
  
    <div >
      
      <section v-if="seccionAcual===0">
        <div class="borde">
          <div class="centrar">
          <h1 class="titulo">Bienvenido al reporte de productos</h1>
          
            <button class="botonC" @click="seccionAcual=1">Comenzar</button>
          
          
          </div>
          </div>
    </section>
  
    <section v-if="seccionAcual===1">

      <div class="divisionPantalla">
        <div class="chart-container">
            <v-chart v-if="productos.ventas.length>0" class="chart" :option="option" autoforesize 
              /><p v-else>Cargandodooo</p>
            
          </div>
          <div class="chart-container">
            <v-chart v-if="productos.rotacionC.length>0" class="chart" :option="clasificacion" autoforesize 
              /><p v-else>Cargandodooo</p>
            
          </div>
        </div>
        
        <h1>Promedio: {{ productos.unidadesdeTotales/productos.produc.length }}</h1>
      <button @click="seccionAcual=0">salir</button>
    </section>
    </div>
  
   
   <!--
   <div class="divisionPantalla">
    <div>
     
      <div v-if="productos.error==null" class="divisioncards">
        <div v-for="p in productos.produc" :key="p.id" class="tarjeta">
          <p>
            <strong>Nombre del producto:</strong> {{ p.name }}
           <strong>cantidad:</strong> {{ p.cantidad }}<br>
            <strong>Precio: </strong>{{ p.price }}
          </p>
        </div>
      </div>
      <div v-else>
        Problema en la peticion
      </div>
    </div>
    <div><div v-if="productos.error==null" class="divisioncards">
        <div v-for="p in productos.produc" :key="p.id" class="tarjeta">
          <p>
            <strong>Nombre del producto:</strong> {{ p.name }}
           <strong>cantidad:</strong> {{ p.cantidad }}<br>
            <strong>Precio: </strong>{{ p.price }}
          </p>
        </div>
      </div>
      <div v-else>
        Problema en la peticion
      </div></div>
    <div v-if="productos.error==null" class="divisioncards">
        <div v-for="p in productos.produc" :key="p.id" class="tarjeta">
          <p>
            <strong>Nombre del producto:</strong> {{ p.name }}
           <strong>cantidad:</strong> {{ p.cantidad }}<br>
            <strong>Precio: </strong>{{ p.price }}
          </p>
        </div>
      </div>
      <div v-else>
        Problema en la peticion
      </div></div
    

    
      
    </div>-->
  
</template>

<style scoped>
  
  .chart-container {
    width: 100%;
    height: 400px;
    min-height: 400px;
  }

  .chart {
    width: 100%;
    height: 100%;
  }
  .centrar{
   
    display: flex;
    margin-top: 15%;
    margin-bottom: 15%;
    padding: 0 2rem;
    flex-direction: column;
    align-items: center;
  }
  .titulo{
    font-size: 35px;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }
  .botonC{
    margin-top: 1rem;
    height: 50px;
    width: 100%;
    border-radius: 11px;
    border: none;
    background-color: rgba(250, 120, 14, 0.582);
    font-size:medium;
    transition: transform 0.3 ease, box-shadow 0.3s ease;

  }
  .botonC:hover {
  transform: translateY(-8px); 
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.15); 
}
  .borde{
    border: solid .6rem rgba(250, 120, 14, 0.582);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    margin-top: 20%;
    padding: 0 2rem;
    

  }
  .divisionPantalla{
    display:grid;
    grid-template-columns: repeat(3,1fr);
    gap:20px;
    

  }
  .divisioncards{
    display:grid;
    grid-template-columns: repeat(2,1fr);
    gap:20px;

  }
  .tarjeta{
    border: 2px solid #ccc;
    padding: 1rem;
    border-radius: 30px;
    background-color: rgb(224, 222, 218);
    min-width: 250px;
  }

  </style>
