import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { AppComponent } from './app.component';
import { ProductoFormularioComponent } from './producto/producto-formulario/producto-formulario.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'tiendas', component: TiendaComponent},
    { path: 'tiendas/:idTienda/producto/:id', component: ProductoFormularioComponent},
    { path: 'tiendas/:idTienda/producto', component: ProductoFormularioComponent},
    { path: 'home', component: AppComponent},
    { path: '**', redirectTo: '/home' }
];
