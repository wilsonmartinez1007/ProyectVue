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
  
  tooltip:{
        trigger:"item",
        },
  dataset:{
    source: ventas.value??[]
  },
  xAxis:{
    type:'category',
    axisLabel:{
      interval:0,
      rotate:70,
      color: 'white',
    }
  
  },
  yAxis:{
    type: 'value',
    name: 'Dinero',
    nameTextStyle:{color: 'white',fontSize:19,},
    axisLabel:{color: 'white',}
  },
  series:[
    { name:'ventas',
      type: 'bar',
      encode:{
        x: "name",
        y: "totalVentas"
      },
      itemStyle:{
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#ec0cdd' },
            { offset: 1, color: '#d5acd3' }  
          ]
        }
      },
      emphasis:{
        focus: 'self'
      }
    }
  ]

  
})
)




const clasificacion = computed(()=>({
    
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
        textStyle:{color: 'white',fontSize:19,},
        orient:'vertical',
            },
    graphic:[
        {
            type:'text',
            left:'56.7%',
            top:'32%',
            style:{
                text:`${porcentajeVisible.value}%`,
                textAlign:'center',
                textVerticalAlign: 'middle',
                fontSize:24,
                fontWeight: 'bold',
                fill:'#fff9f9'
            }
        }
    ],
  
    series:[
        { 
        name:'ventas',
        type: 'pie',
        radius:['25%','45%'],
        center: ['61%', '33%'],

        encode:{
            itemName: "name",
            value: "cantidad"
      },
    //mostrar etiquetas encima de las porciones
    label: {
          show: true,
          fill:'#fff9f9',
          textStyle:{color: 'white',fontSize:19,},
        },
      
    itemStyle:{
        borderColor: '#ffffff',
      },
    //resaltar
    emphasis:{
        scale :true,
        focus: 'self'
    },
    color:['#3f98b3','black','#cd60c6f4']
    }
  ]

  
})
)
const ventasandPromedio = computed(()=>({
  
  grid:{
    left : '10%',
    right : '20%',
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
      rotate: 70,
      color: 'white',
      
    }
     },
  yAxis:{
    type: 'value',
    name: 'Ventas por producto',
    nameTextStyle:{ color: 'white',
                    fontSize:19,

                    },
    color: 'white',
    position: 'left',
    axisLabel:{color: 'white',}
    

    
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
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#00c3ff' },
            { offset: 1, color: '#a4b6bb' }  
          ]
        }
      },
      markLine: {
        silent: true,
        symbol: ['none','none'],
        label:{
          show: true,
          position: 'end',
          formatter: `Promedio general (${(promedio.value)})`,
          textStyle:{ color: '#fffdff', fontSize:11.3,fontWeight: 'bold',},
        },
        lineStyle:{
          color: '#d42542',
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