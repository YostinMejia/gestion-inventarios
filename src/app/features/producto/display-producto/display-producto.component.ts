import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../interfaces/interface';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-display-producto',
  standalone: true,
  imports: [],
  templateUrl: './display-producto.component.html',
  styleUrl: './display-producto.component.css'
})
export class DisplayProductoComponent implements OnInit{

  producto:Producto|null=null

  constructor(private supabaseService:SupabaseService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params =>{      
      const response = await this.supabaseService.getProductoById(Number(params.get("id")));   
      if(response.data){
        this.producto = response.data[0]
        const bucket = await this.supabaseService.getImagen(this.producto!.imagen)
        if (bucket.data) {
          const blobUrl = URL.createObjectURL(bucket.data);
          this.producto!.imagen = blobUrl; // Asigna la URL de Blob a la propiedad imagen
          console.log(blobUrl);
          
        }
      }
      })
    
  }

}
