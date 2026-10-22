<script setup>
defineProps({
  opcion: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="preview-card">
    <div class="preview-header">
      <img :src="opcion.icono" :alt="opcion.titulo" class="radial-icon" />
      <h4>{{ opcion.titulo }}</h4>
    </div>
    <p class="preview-text">{{ opcion.descripcionPreview }}</p>
  </div>
</template>

<style scoped>
  .preview-card {
    position: absolute;
    top: -110px;
    left: 50%;
    transform: translateX(-50%);
    width: 260px;
    background-color: rgba(36, 36, 36, 0.95);
    border: 1px solid #ff6347;
    border-radius: 12px;
    padding: 0.8rem 1rem;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    z-index: 10;
    pointer-events: none;
    animation: fadeIn 0.18s ease-out;
  }

  .preview-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.3rem;
  }
  .radial-icon {
    width: 24px;  
    height: 24px;
    object-fit: contain;
    display: block;
  }

  .preview-header h4 {
    margin: 0;
    color: #ff6347;
    font-size: 1rem;
  }

  .preview-text {
    margin: 0;
    font-size: 0.8rem;
    color: #ccc;
    line-height: 1.25;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 8px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>