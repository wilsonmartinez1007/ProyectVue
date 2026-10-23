<script setup>
import { ref } from 'vue'
import RadialItem from './RadialItem.vue'
import PreviewCard from './PreviewCard.vue'
import { OPCIONES_RADIALES } from '@/types/interfaces'
import { useRadialMenu } from '@/composables/useRadialMenu'

const emit = defineEmits(['cambiarVista'])
const vistaActiva = ref('graficos')

const {
  opcionPresionada,
  iniciarPreview,
  confirmarSeleccion,
  cancelarPreview
} = useRadialMenu((idSeleccionado) => {
  vistaActiva.value = idSeleccionado
  emit('cambiarVista', vistaActiva.value)
})
</script>

<template>
  <div class="radial-container">
    <!-- Vista Previa Flotante -->
    <PreviewCard v-if="opcionPresionada" :opcion="opcionPresionada" />
    
    <!-- Círculo Central -->
    <div class="center-circle">
      <span class="center-badge"><img :src="vistaActiva === 'graficos' ? OPCIONES_RADIALES[0].icono : OPCIONES_RADIALES[1].icono " 
                                      class="badge-icon"
                                      />
                                    </span>
      <h3 class="center-title">
        {{ vistaActiva === 'graficos' ? 'Analítica' : 'Inventario' }}
      </h3>
     
    </div>

    <!-- Botones Periféricos -->
    <RadialItem
      v-for="(opcion, index) in OPCIONES_RADIALES"
      :key="opcion.id"
      :opcion="opcion"
      :posicion-clase="`pos-${index}`"
      :es-activo="vistaActiva === opcion.id"
      @iniciar-preview="iniciarPreview"
      @confirmar-seleccion="confirmarSeleccion"
      @cancelar-preview="cancelarPreview"
    />
  </div>
</template>

<style scoped>
.radial-container {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 1.5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, #2b2b2b 0%, #1a1a1a 100%);
  border: 2px solid #ff6347;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 20px rgba(255, 99, 71, 0.25);
  z-index: 2;
  user-select: none;
  
}

.center-badge {
  font-size: 1.8rem;
}

.center-title {
  margin: 0;
  font-size: 1.5rem;
  color: #ffffffdc;
  font-weight: bold;
}



:deep(.pos-0) {
  left: 0;
}

:deep(.pos-1) {
  right: 0;
}
.badge-icon {
  width: 24px;  
  height: 24px;
  object-fit: contain;
  display: block;
}
</style>