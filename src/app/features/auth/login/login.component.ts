import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IniciarSesionDto } from '../../../interfaces/interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario:IniciarSesionDto={
    email:"",
    password:""
  }

  constructor(private supabaseService: SupabaseService) { }

  async onSubmit() {
    const auth = await this.supabaseService.signInWithEmail(this.usuario)
  }


}
