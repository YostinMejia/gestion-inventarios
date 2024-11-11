import {Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/interface';
import { SupabaseService } from '../../services/supabase.service';
<<<<<<< HEAD
import { TiendaComponent } from "../tienda/tienda.component";
import { FooterComponent } from "../../layout/footer/footer.component";
import { HeaderComponent } from "../../layout/header/header.component";
=======
import { SearchProductoComponent } from "../producto/search-producto/search-producto.component";
import { Router } from '@angular/router';
>>>>>>> 53a33b4a7dd01753c9963d18d25754850e47e10c

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [SearchProductoComponent, TiendaComponent, FooterComponent, HeaderComponent],
=======
>>>>>>> 53a33b4a7dd01753c9963d18d25754850e47e10c
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [SearchProductoComponent]
})
export class HomeComponent implements OnInit {

  productos:Producto[]=[]

  constructor(private supabaseService:SupabaseService, private router:Router){}

  async ngOnInit() {
    const response = await this.supabaseService.getProducto({nombre:"",categoria:"",maxPrecio:Number.MAX_SAFE_INTEGER,minPrecio:0}, 10)
    if (response.data){
      this.productos = response.data      
    }
  }
  

  receiveProductos($event:Producto[]){
    this.productos = $event
  }

  verProducto(id:number){
    console.log("redir");
    
    this.router.navigate(['/producto',id ]);
  }
  
}
