import { Injectable } from '@angular/core';
import { AuthError, AuthSession, createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../enviroments/enviroment'
import { CrearUsuarioDto, IniciarSesionDto, Producto, SearchProductoDto, Tienda, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient

  _session: AuthSession | null = null

  constructor() { this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey) }

  async signUpNewUser(usuario: Usuario) {

    const regexPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexPwd.test(usuario.password)) {
      return { "error": "La contraseña debe tener al menos 6 caracteres, incluyendo un dígito, una letra minúscula y una letra mayúscula." };

    }

    if (!regexEmail.test(usuario.email)) {
      return { "error": "El correo electrónico debe ser válido, por ejemplo: usuario@ejemplo.com." };
    }

    const { data, error } = await this.supabase.auth.signUp({
      email: usuario.email,
      password: usuario.password,
    })

    await this.crearUsuario({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    })

    this._session = data.session
    return { "session": this._session, "error": null }
  }

  async signInWithEmail(usuario:IniciarSesionDto) {
    const { data } = await this.supabase.auth.signInWithPassword({
      email: usuario.email,
      password: usuario.password,
    })
    this._session = data.session
    return this._session
  }

  async crearUsuario(usuario: CrearUsuarioDto) {
    return this.supabase.from("usuario").insert(usuario)
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

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

  async getImagen(filePath: string): Promise<{ data: { publicUrl: string } }> {
    return this.supabase.storage.from('productos_imgs').getPublicUrl(filePath)
  }

  async eliminarProducto(id: number) {
    return this.supabase.from('producto').delete().eq("id", id)
  }

}

