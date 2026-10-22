import { ref } from 'vue'
import type { OpcionRadial } from '@/types/interfaces'

export function useRadialMenu(onConfirmarSeleccion: (id: 'graficos' | 'inventario') => void) {
  const opcionPresionada = ref<OpcionRadial | null>(null)

  function iniciarPreview(opcion: OpcionRadial, event: PointerEvent): void {
    const target = event.target as HTMLElement | null
    if (target && typeof target.setPointerCapture === 'function') {
      target.setPointerCapture(event.pointerId)
    }
    opcionPresionada.value = opcion
  }

  function confirmarSeleccion(opcion: OpcionRadial, event: PointerEvent): void {
    const target = event.target as HTMLElement | null
    if (target && typeof target.releasePointerCapture === 'function') {
      target.releasePointerCapture(event.pointerId)
    }

    if (opcionPresionada.value && opcionPresionada.value.id === opcion.id) {
      onConfirmarSeleccion(opcion.id)
    }
    opcionPresionada.value = null
  }

  function cancelarPreview(): void {
    opcionPresionada.value = null
  }

  return {
    opcionPresionada,
    iniciarPreview,
    confirmarSeleccion,
    cancelarPreview
  }
}