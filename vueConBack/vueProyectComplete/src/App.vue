<script setup>
import { onMounted, computed,ref} from 'vue'
import {store} from './stores/store.ts'

//chart
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent } from 'echarts/components'
import VChart from 'vue-echarts'

//imagen
import fondo from './assets/fondo.png'

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
        color: '#FF6347'
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
        color: '#FF6347'
      }
    }
  ]

  
})
)
const ventasandPromedio = computed(()=>({
  title: {
    text:"Cantidad de ventas por producto",
    left:"center"
  },
  tooltip:{
    trgger:"axis"
  },
  dataset:{
    source:productos.produc
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
        color: '#FF6347'
      },
      markLine: {
        silent: true,
        symbol: ['none','none'],
        label:{
          show: true,
          position: 'end',
          formatter: `Prmedio general (${productos.promedio})`
        },
        lineStyle:{
          color: '#ff4d4f',
          type: 'dashed',
          width: 2
        },
        data:[{
          yAxis:productos.promedio
        }]
      }
    }
  ]

  
})
)

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
        <div class="chart-container">
            <v-chart v-if="productos.ventas.length>0" class="chart" :option="option" autoforesize 
              /><p v-else>Cargandodooo</p>
            
          </div>
          <div class="chart-container">
            <v-chart v-if="productos.rotacionC.length>0" class="chart" :option="clasificacion" autoforesize 
              /><p v-else>Cargandodooo</p>
            
          </div>
          <div class="chart-container">
            <v-chart v-if="productos.rotacionC.length>0" class="chart" :option="ventasandPromedio" autoforesize 
              /><p v-else>Cargandodooo</p>
            
          </div>
        </div>
        
        <h1>Promedio: {{ productos.promedio }}</h1>
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

  .chart {
    width: 100%;
    height: 100%;
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
    transition: transform 0.3 ease, box-shadow 0.3s ease;
    

  }
  .borde:hover {
  transform: translateY(-8px); 
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.15); 
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
