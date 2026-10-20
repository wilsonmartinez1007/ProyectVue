export interface Producto {
    "id": number,
    "name": string,
    "cantidad":number,
    "price":number,
}
export type Estado = 'Cargando'|'Exito' |'Error'