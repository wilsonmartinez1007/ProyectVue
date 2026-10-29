<script setup>
const props = defineProps({
  opcion: {
    type: Object,
    required: true
  },
  posicionClase: {
    type: String,
    required: true
  },
  esActivo: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['iniciarPreview', 'confirmarSeleccion', 'cancelarPreview'])

function alPresionar(event) {
  emit('iniciarPreview', props.opcion, event)
}

function alSoltar(event) {
  emit('confirmarSeleccion', props.opcion, event)
}
</script>

<template>
  <button
    :class="['radial-item', posicionClase, { active: esActivo }]"
    @pointerdown="alPresionar"
    @pointerup="alSoltar"
    @pointerleave="emit('cancelarPreview')"
  >
    <img :src="opcion.icono" :alt="opcion.titulo" class="radial-icon" />
  </button>
</template>

<style scoped>
.radial-item {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #242424;
  border: 2px solid #444;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
  touch-action: none;
  transition: all 0.2s ease;
  z-index: 3;
}
.radial-icon {
  width: 24px;  
  height: 24px;
  object-fit: contain;
  display: block;
}
.radial-item:hover,
.radial-item.active {
  border-color: #ff6347;
  background-color: #333;
  transform: scale(1.12);
  box-shadow: 0px 0px 14px rgba(255, 99, 71, 0.5);
}
</style>