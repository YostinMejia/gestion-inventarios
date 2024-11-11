import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Tienda } from '../../interfaces/interface';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {

  tiendas: Tienda[] = []

  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.supabaseService.getTiendas()
    if (response.data) {
      this.tiendas = response.data
    }

  }



}
