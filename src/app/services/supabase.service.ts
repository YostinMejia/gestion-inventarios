import { Injectable } from '@angular/core';
import {createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../enviroments/enviroment'
import { Producto, Tienda } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() { this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)}

  async getTiendas(){
    return this.supabase.from('tienda').select()
  }

  async crearTienda(tienda:Tienda){
    if(tienda.direccion.trim() == "" || tienda.propietario.trim() =="" || tienda.nombre.trim() == "" ) throw Error("La tienda no puede contener valores vacios o nulos ")
    return this.supabase.from('tienda').insert(tienda)
  }

  async getProducto(id:string){
    if (id.trim() == ""){ throw Error("Debes ingresar un id")}
    return this.supabase.from('producto').select().limit(1)
  }

  async getProductoById(id:number){
    if (id < 0){ throw Error("Debes ingresar un id")}
    return this.supabase.from('producto').select().eq("id",id)
  }

  async crearProducto(producto:Producto){
    if (producto.cantidad <0 || producto.categoria.trim() == "" || producto.descripcion.trim() == "" || producto.nombre.trim() == "" ) throw Error("El producto no puede contener valores vacios o nulos")
      return this.supabase.from('producto').insert(producto)
  }

  async actualizarProducto(producto:Producto){
    if (producto.cantidad <0 || producto.categoria.trim() == "" || producto.descripcion.trim() == "" || producto.nombre.trim() == "" ) throw Error("El producto no puede contener valores vacios o nulos")
    return this.supabase.from('producto').update(producto)
  }

  
}

