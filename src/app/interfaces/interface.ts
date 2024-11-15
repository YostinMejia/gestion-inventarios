export interface Tienda{
    id:number
    nombre:string
    direccion:string
    propietario:string
  }
  
  export interface Producto{
    id?:number
    id_tienda:number
    nombre:string
    descripcion:string
    precio:number
    cantidad:number
    categoria:string
    imagen:string
  }


export interface SearchProductoDto{
  nombre:string
  categoria:string
  maxPrecio:number
  minPrecio:number
}

export interface Usuario{
  email:string
  nombre: string
  rol: string
  password:string
}


export interface CrearUsuarioDto{
  email:string
  nombre: string
  rol: string
}

export interface IniciarSesionDto{
  email:string
  password:string
}