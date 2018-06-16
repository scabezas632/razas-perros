import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';

// SE IMPORTAN LOS COMPONENTES QUE DEPENDEN DE ESTE MODULO
import { AboutComponent } from './about/about.component';
import { RazasComponent } from './razas/razas.component';


const PAGES_ROUTES: Routes = [
  // RUTAS DE LOS COMPONENTES
  { path: '', component: RazasComponent },
  { path: 'about', component: AboutComponent },
]


@NgModule({
  imports: [
    CommonModule,
    // SE ESPECIFICA QUE ESTE MODULO SERVIRÁ COMO RUTA HIJA
    RouterModule.forChild(PAGES_ROUTES)
  ],
  declarations: [
    // SE DECLARAN LOS COMPONENTES QUE SE INICIARÁN JUNTO CON EL MODULO
    RazasComponent,
    AboutComponent,
  ]
})
export class PaginasModule { }
