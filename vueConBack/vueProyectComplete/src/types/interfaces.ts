
import icon from '@/assets/iconos/grafico.png'
import iconCrud from '@/assets/iconos/leer.png'

export interface Producto {
    "id": number,
    "name": string,
    "cantidad":number,
    "price":number,
    "fecha":string,
    "ciudad":string
}
export type Estado = 'Cargando'|'Exito' |'Error'

export interface OpcionRadial {
  id: 'graficos' | 'inventario'
  titulo: string
  subtitulo: string
  icono: string
  descripcionPreview: string
}

export const OPCIONES_RADIALES: OpcionRadial[] = [
  {
    id: 'graficos',
    titulo: 'Analítica',
    subtitulo: 'Gráficos ventas',
    icono: icon,
    descripcionPreview: 'Visualiza el rendimiento de tus ventas, rotación de productos y promedios en tiempo real.'
  },
  {
    id: 'inventario',
    titulo: 'Inventario',
    subtitulo: 'Gestión CRUD',
    icono: iconCrud,
    descripcionPreview: 'Consulta la lista completa de productos, crea nuevos registros, edita o elimina elementos.'
  }
]