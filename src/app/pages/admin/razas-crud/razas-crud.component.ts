import { Component, OnInit } from '@angular/core';

import { Raza } from '../../../interfaces/raza.interface';
import { RazasService } from '../../../services/razas.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/operators';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-razas-crud',
  templateUrl: './razas-crud.component.html',
  styleUrls: ['./razas-crud.component.css']
})
export class RazasCRUDComponent implements OnInit {

  raza: Raza = {
    nombre: '',
    info: '',
    pais: '',
    tamanio: '',
    img: ''
  };

  nuevo: boolean = false;
  id: string;

  constructor( private _razasService: RazasService,
               private router: Router,
               private route: ActivatedRoute ) {
    this.route.params.subscribe( parametros => {
      this.id = parametros['id'];
      if (this.id !== 'nuevo') {
        this._razasService.obtenerRaza( this.id )
            .subscribe( (data: Raza) => {
              this.raza = data;
            });
      }
    });
  }

  ngOnInit() {
  }

  guardar( razaForma: Raza ) {

    if (this.id === 'nuevo') {
      this._razasService.nuevaRaza( razaForma )
      .subscribe( (data: any) => {
        this.router.navigate(['/admin', data.name]);
      }, error => console.log(error));
    } else {
      this._razasService.actualizarRaza( razaForma, this.id )
      .subscribe( (data: any) => {
        console.log(data);
      }, error => console.log(error));
    }

  }

  agregarNuevo( razaForma: NgForm ) {

    this.router.navigate(['/admin', 'nuevo']);
    razaForma.reset({
      pais: 'undefined',
      tamanio: 'undefined'
    });

  }

}
