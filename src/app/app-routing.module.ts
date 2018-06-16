import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { ContactComponent } from './pages/contact/contact.component';

// LOS COMPONENTES PUESTOS AQUI DEBEN ESTAR IMPORTADOS EN APP.MODULE.TS

const APP_ROUTES: Routes = [
  // Se ponen los componentes que se cargarán al iniciar la aplicación
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'razas', loadChildren: './pages/paginas.module#PaginasModule' },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    // No se declaran los componentes en el modulo de rutas principal
  ]
})
export class AppRoutingModule { }
