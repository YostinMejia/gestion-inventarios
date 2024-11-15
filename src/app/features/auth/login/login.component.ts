import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IniciarSesionDto } from '../../../interfaces/interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private supabaseService:SupabaseService, private router: Router){}

  async onSubmit() {
    const auth = await this.supabaseService.signInWithEmail(this.usuario)
    if (auth.error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: auth.error,
        showConfirmButton: false,
        timer: 1500
      });
    }
    this.router.navigate(['home'],{queryParams:{rol:auth.rol}});
  }


}
