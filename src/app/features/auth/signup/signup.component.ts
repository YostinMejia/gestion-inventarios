import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Rol, Usuario } from '../../../interfaces/interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  usuario: Usuario ={
    email :"",
    nombre:"",
    password: "",
    rol:Rol.cliente

  }
  
  constructor(private supabaseService:SupabaseService){}

  async onSubmit(){
    console.log("creando usuario");
    
    const auth = await this.supabaseService.signUpNewUser(this.usuario.email,this.usuario.password)
    console.log("auth");
    console.log(auth);
    
  }


}
