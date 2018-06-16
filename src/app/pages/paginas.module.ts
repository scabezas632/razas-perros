import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// SE IMPORTAN LOS COMPONENTES QUE DEPENDEN DE ESTE MODULO
import { RazasComponent } from './razas/razas.component';
import { RazaComponent } from './raza/raza.component';


const PAGES_ROUTES: Routes = [
  // RUTAS DE LOS COMPONENTES
  { path: '', component: RazasComponent },
  { path: 'raza/:id', component: RazaComponent },
];


@NgModule({
  imports: [
    CommonModule,
    // SE ESPECIFICA QUE ESTE MODULO SERVIRÁ COMO RUTA HIJA
    RouterModule.forChild(PAGES_ROUTES)
  ],
  declarations: [
    // SE DECLARAN LOS COMPONENTES QUE SE INICIARÁN JUNTO CON EL MODULO
    RazasComponent,
    RazaComponent,
  ]
})
export class PaginasModule { }
