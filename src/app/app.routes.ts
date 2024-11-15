import { Routes } from '@angular/router';
import { TiendaComponent } from './features/tienda/tienda.component';
import { ProductoFormularioComponent } from './features/producto/producto-formulario/producto-formulario.component';
import { HomeComponent } from './features/home/home.component';
import { DisplayProductoComponent } from './features/producto/display-producto/display-producto.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'tiendas', component: TiendaComponent},
    { path: 'tiendas/:idTienda/producto/:id', component: ProductoFormularioComponent},
    { path: 'tiendas/:idTienda/producto', component: ProductoFormularioComponent},
    { path: 'producto/:id', component: DisplayProductoComponent},
    { path: 'home', component: HomeComponent},
    { path: '**', redirectTo: '/home' }
];
