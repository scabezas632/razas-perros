import { Component, OnInit } from '@angular/core';
import { RazasService } from '../../services/razas.service';
import { Raza } from '../../interfaces/raza.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-razas',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  razas: Raza[] = [];
  razasBusqueda: Raza[] = [];

  constructor( private _razasService: RazasService,
               private router: Router ) { }

  ngOnInit() {
    this.razas = this._razasService.getRazas();
    this.razasBusqueda = this.razas;
  }

  buscar( termino: string ) {
    if (termino !== '') {
      this.razasBusqueda = this._razasService.buscarTermino( termino );
    } else {
      this.razasBusqueda = this.razas;
    }
    console.log(this.razasBusqueda);
  }

}
