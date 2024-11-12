import {Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/interface';
import { SupabaseService } from '../../services/supabase.service';
import { SearchProductoComponent } from "../producto/search-producto/search-producto.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterComponent } from "../../layout/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [SearchProductoComponent, HeaderComponent, FooterComponent]
})
export class HomeComponent implements OnInit {

  productos:Producto[]=[]

  constructor(private supabaseService:SupabaseService, private router:Router){}

  async ngOnInit() {
    const response = await this.supabaseService.getProducto({nombre:"",categoria:"",maxPrecio:Number.MAX_SAFE_INTEGER,minPrecio:0}, 10)
    if (response.data){
      this.productos = response.data   
      await Promise.all(
        this.productos.map(async (producto) => {
            const { data } = await this.supabaseService.getImagen(producto.imagen);
            producto.imagen = data?.publicUrl || ''
        })
    );
    }
  }
  
  //En caso de que se haga una busqueda, se ejecuta esta función
  receiveProductos($event:Producto[]){
    this.productos = $event
  }

  verProducto(id:number){
    this.router.navigate(['/producto',id ]);
  }
  
}
