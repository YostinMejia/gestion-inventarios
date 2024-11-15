import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../enviroments/enviroment'
import { Producto, SearchProductoDto, Tienda } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() { this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey) }

  async getTiendas() {
    return this.supabase.from('tienda').select()
  }

  async crearTienda(tienda: Tienda) {
    if (tienda.direccion.trim() == "" || tienda.propietario.trim() == "" || tienda.nombre.trim() == "") throw Error("La tienda no puede contener valores vacios o nulos ")
    return this.supabase.from('tienda').insert(tienda)
  }

  async getProducto(busqueda: SearchProductoDto, limit: number) {
    return this.supabase.from('producto').select().like("nombre", `%${busqueda.nombre}%`).lte("precio", busqueda.maxPrecio).gte("precio", busqueda.minPrecio).like("categoria", `%${busqueda.categoria}%`).limit(limit)
  }

  async getProductoById(id: number) {
    if (id < 0) { throw Error("Debes ingresar un id") }
    return this.supabase.from('producto').select().eq("id", id)
  }

  async crearProducto(producto: Producto) {
    if (producto.cantidad < 0 || producto.categoria.trim() == "" || producto.descripcion.trim() == "" || producto.nombre.trim() == "") throw Error("El producto no puede contener valores vacios o nulos")
    return this.supabase.from('producto').insert(producto)
  }

  async actualizarProducto(producto: Producto) {
    if (producto.cantidad < 0 || producto.categoria.trim() == "" || producto.descripcion.trim() == "" || producto.nombre.trim() == "") throw Error("El producto no puede contener valores vacios o nulos")
    return this.supabase.from('producto').update(producto)
  }

  async saveImagen(file: File, filePath: string) {
    return this.supabase.storage.from('productos_imgs').upload(filePath, file);
  }

  async getImagen(filePath: string):Promise<{data:{publicUrl:string}}> {
    return  this.supabase.storage.from('productos_imgs').getPublicUrl(filePath)
  }

  async eliminarProducto(id:number){
    return this.supabase.from('producto').delete().eq("id",id)
  }

}

