import { ref } from 'vue'
import { defineStore } from 'pinia'

export const pluginStore = defineStore('ui',()=>{
  const seccionActual = ref<'inicio'|'dasboard'>('inicio')
  const subVistaActiva = ref<'graficos'|'inventario'>('inventario')
 

  function irDasboard(subVista: 'inventario'|'graficos' = 'inventario'){
    seccionActual.value = 'dasboard'
    subVistaActiva.value = subVista
  }

  function irInicio(){
    seccionActual.value = 'inicio'
  }

  return{
    seccionActual,
    subVistaActiva,
    irDasboard,
    irInicio
    }
  },
  {persist: true}
)