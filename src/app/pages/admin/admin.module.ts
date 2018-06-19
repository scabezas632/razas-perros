import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// SE IMPORTAN LOS COMPONENTES QUE DEPENDEN DE ESTE MODULO
import { RazasCRUDComponent } from './razas-crud/razas-crud.component';
import { RazasComponent } from './razas/razas.component';
import { PipesModule } from '../../pipes/pipes.module';
// import { KeysPipe } from '../../pipes/keys.pipe';

const PAGES_ROUTES: Routes = [
  // RUTAS DE LOS COMPONENTES
  { path: '', component: RazasComponent },
  { path: ':id', component: RazasCRUDComponent },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    // SE ESPECIFICA QUE ESTE MODULO SERVIRÁ COMO RUTA HIJA
    RouterModule.forChild(PAGES_ROUTES)
  ],
  declarations: [
    // SE DECLARAN LOS COMPONENTES QUE SE INICIARÁN JUNTO CON EL MODULO
    RazasComponent,
    RazasCRUDComponent,
    // KeysPipe
  ]
})
export class AdminModule { }
