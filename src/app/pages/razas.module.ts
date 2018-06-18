import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// SE IMPORTAN LOS COMPONENTES QUE DEPENDEN DE ESTE MODULO
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RazaComponent } from './raza/raza.component';

const PAGES_ROUTES: Routes = [
  // RUTAS DE LOS COMPONENTES
  { path: '', component: BusquedaComponent },
  { path: ':id', component: RazaComponent },
];


@NgModule({
  imports: [
    CommonModule,
    // SE ESPECIFICA QUE ESTE MODULO SERVIRÁ COMO RUTA HIJA
    RouterModule.forChild(PAGES_ROUTES)
  ],
  declarations: [
    // SE DECLARAN LOS COMPONENTES QUE SE INICIARÁN JUNTO CON EL MODULO
    BusquedaComponent,
    RazaComponent
  ]
})
export class RazasModule { }
