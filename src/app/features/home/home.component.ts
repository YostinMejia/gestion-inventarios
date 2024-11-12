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
