import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { ContactComponent } from './pages/contact/contact.component';

// Servicios
import { RazasService } from './services/razas.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    NavbarComponent,
    NoPageFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RazasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
