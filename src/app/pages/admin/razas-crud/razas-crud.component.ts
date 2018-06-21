import { Component, OnInit } from '@angular/core';

import { Raza } from '../../../interfaces/raza.interface';
import { RazasService } from '../../../services/razas.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { FileItem } from '../../../models/file-item';
import { UrlImage } from '../../../models/url-image';


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

  nuevo = false;
  id: string;

  // Variables para el DropZone
  archivo: FileItem[] = [];
  cursorSobreElemento = false;
  mostrarDropZone = true;
  inputFile: any;

  url: UrlImage[] = [];

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

  previewImage(event: any) {
    this._razasService.previewImage( event, this.url );
  }

  guardar( razaForma: Raza ) {
    this._razasService.cargarAFirebase( this.archivo, razaForma, this.id );
  }

  agregarNuevo( razaForma: NgForm ) {

    this.router.navigate(['/admin', 'nuevo']);
    razaForma.reset({
      pais: 'undefined',
      tamanio: 'undefined'
    });

  }

}
