export interface Tienda{
    id:number
    nombre:string
    direccion:string
    propietario:string
  }
  
  export interface Producto{
    id_tienda:number
    nombre:string
    descripcion:string
    precio:number
    cantidad:number
    categoria:string
    imagen:string
  }