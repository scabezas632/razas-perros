import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// SE IMPORTAN LOS COMPONENTES QUE DEPENDEN DE ESTE MODULO
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RazaComponent } from './raza/raza.component';
import { PipesModule } from '../pipes/pipes.module';

const PAGES_ROUTES: Routes = [
  // RUTAS DE LOS COMPONENTES
  { path: '', component: BusquedaComponent },
  { path: ':id', component: RazaComponent },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SE ESPECIFICA QUE ESTE MODULO SERVIRÁ COMO RUTA HIJA
    RouterModule.forChild(PAGES_ROUTES),
    PipesModule
  ],
  declarations: [
    // SE DECLARAN LOS COMPONENTES QUE SE INICIARÁN JUNTO CON EL MODULO
    BusquedaComponent,
    RazaComponent
  ]
})
export class RazasModule { }
