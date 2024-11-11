import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SearchProductoComponent } from "../producto/search-producto/search-producto.component";
import { Producto } from '../../interfaces/interface';
import { SupabaseService } from '../../services/supabase.service';
import { TiendaComponent } from "../tienda/tienda.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchProductoComponent, TiendaComponent, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  productos:Producto[]=[]

  constructor(private supabaseService:SupabaseService){}

  async ngOnInit() {
    const response = await this.supabaseService.getProducto({nombre:"",categoria:"",maxPrecio:Number.MAX_SAFE_INTEGER,minPrecio:0}, 10)
    if (response.data){
      this.productos = response.data      
    }
  }
  

  receiveProductos($event:Producto[]){
    this.productos = $event
  }
  
}
