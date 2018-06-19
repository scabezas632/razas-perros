import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RazasService } from '../../services/razas.service';
import { Raza } from '../../interfaces/raza.interface';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.css']
})
export class RazaComponent implements OnInit {

  raza: Raza = {
    nombre: '',
    info: '',
    pais: '',
    tamanio: '',
    img: ''
  };

  nuevo = false;
  id: string;

  constructor( private route: ActivatedRoute,
               private _razasService: RazasService ) {

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

}
