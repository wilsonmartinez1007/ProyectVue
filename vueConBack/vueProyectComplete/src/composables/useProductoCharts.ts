import {computed, type ComputedRef, type Ref} from 'vue'
import type {Producto}  from '@/types/interfaces'
import { ref } from 'vue'


export function useProductosCharts(
    productos:Ref<Producto[]>,
    rotacionC:ComputedRef<any[]>,
    ventas:ComputedRef<any[]>,
    promedio:ComputedRef<string>
){


const porcentajeVisible = ref(100)

const actualizarPorcentaje = (params) => {
  const datos = rotacionC.value ?? []

  const total = datos.reduce(
    (suma, item) => suma + Number(item.cantidad || 0),
    0
  )

  const totalVisible = datos.reduce((suma, item) => {
    return params.selected[item.name]
      ? suma + Number(item.cantidad || 0)
      : suma
  }, 0)

  porcentajeVisible.value = total > 0
    ? Math.round((totalVisible / total) * 100)
    : 0
}
    
const option = computed(()=>({
  title: {
    text:"Ingresos por producto",
    left:"center"
  },
  tooltip:{
    trigger:"axis",
    axisPointer: {type: 'cross',
      
    },
  },
  dataset:{
    source: ventas.value??[]
  },
  xAxis:{
    type:'category',
    axisLabel:{
      interval:0,
      rotate:70
    }
  
  },
  yAxis:{
    type: 'value',
    name: 'Dinero optenido por producto'
  },
  series:[
    { name:'ventas',
      type: 'bar',
      encode:{
        x: "name",
        y: "totalVentas"
      },
      itemStyle:{
        color: '#e459dde5',
      },
      emphasis:{
        focus: 'self'
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
        trigger:"item",
        formatter:(params)=>{
                return `${params.name}<br/>
                    Porcentaje: ${params.percent}%`
            }
        },
    dataset:{
        source:rotacionC.value??[]
     },
    legend: {
     
        left: 10,
        orient:'vertical',
        top:'center',
            },
    graphic:[
        {
            type:'text',
            left:'50.7%',
            top:'45%',
            style:{
                text:`${porcentajeVisible.value}%`,
                textAlign:'center',
                textVerticalAlign: 'middle',
                fontSize:24,
                fontWeigth: 'bold',
                fill:'#333'
            }
        }
    ],
  
    series:[
        { 
        name:'ventas',
        type: 'pie',
        radius:['25%','45%'],
        center: ['55%', '47%'],

        encode:{
            itemName: "name",
            value: "cantidad"
      },
    //mostrar etiquetas encima de las porciones
    label: {
          show: true,
          
        },
      
    itemStyle:{
        borderColor: '#ffffff',
      },
    //resaltar
    emphasis:{
        scale :true,
        focus: 'self'
    },
    color:['#3f98b3','black','gray']
    }
  ]

  
})
)
const ventasandPromedio = computed(()=>({
  title: {
    text:"Cantidad de ventas por producto",
    left:"center"
  },
  grid:{
    left : '10%',
    rigth : '20%',
    bottom: '15%',
    top: '15%',
    containLabel: true
  },
  tooltip:{
    trigger:"axis",
    axisPointer: {type: 'cross',
    },
    
  },
  dataset:{
    source:productos.value??[]
  },
  xAxis:{
    type:'category',
    axisLabel: {
      interval: 0,
      rotate: 70
    }
     },
  yAxis:{
    type: 'value',
    name: 'Ventas por producto',
    position: 'left',

    
  },
  emphasis:{
        scale :true,
        focus: 'self'
    },
  series:[
    { name:'ventas',
      type: 'bar',
      encode:{
        x: "name",
        y: "cantidad"
      },
      itemStyle:{
        color: '#3f98b3'
      },
      markLine: {
        silent: true,
        symbol: ['none','none'],
        label:{
          show: true,
          position: 'insideEndTop',
          formatter: `Promedio general (${(promedio.value)})`
        },
        lineStyle:{
          color: '#030303',
          type: 'dashed',
          width: 2
        },
        data:[{
          yAxis:(promedio.value)
        }]
            }
            }
        ]

        
        })
        )
    return{option,clasificacion,ventasandPromedio, actualizarPorcentaje}

}