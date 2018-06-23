import { Component, OnInit } from '@angular/core';
import { RazasService } from '../../../services/razas.service';
import { Raza } from '../../../interfaces/raza.interface';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styleUrls: ['./razas.component.scss']
})
export class RazasComponent implements OnInit {

  razas: any[] = [];
  loading = true;

  constructor( private _razasService: RazasService ) {
    this._razasService.obtenerRazas()
        .subscribe( (data: any) => {
          this.razas = data;
          this.loading = false;
        });
  }

  ngOnInit() {
  }

  eliminarRaza( id: string ) {
    this._razasService.eliminarRaza( id )
        .subscribe( resp => {
          delete this.razas[id];
        }, error => console.error(error));
  }



}
