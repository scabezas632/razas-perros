import { Component, OnInit } from '@angular/core';

import { Raza } from '../../../interfaces/raza.interface';
import { RazasService } from '../../../services/razas.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { FileItem } from '../../../models/file-item';
import { UrlImage } from '../../../models/url-image';
import { PaisesService } from '../../../services/paises.service';


@Component({
  selector: 'app-razas-crud',
  templateUrl: './razas-crud.component.html',
  styleUrls: ['./razas-crud.component.css']
})
export class RazasCRUDComponent implements OnInit {

  raza: Raza = {
    nombre: '',
    info: '',
    pais: 'undefined',
    tamanio: 'undefined',
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
  paises: any[] = [];

  constructor( private _razasService: RazasService,
               private _paisesService: PaisesService,
               private router: Router,
               private route: ActivatedRoute ) {
    this.route.params.subscribe( parametros => {
      this.id = parametros['id'];

      this._paisesService.getPaises()
            .subscribe( data => {
              this.paises = data;
       });

      if (this.id !== 'nuevo') {
        this._razasService.obtenerRaza( this.id )
            .subscribe( (data: Raza) => {
              this.raza = data;
              this.raza.img = data.img;
              if ( data.img !== '' ) {
                const urlTemporal: UrlImage = new UrlImage();
                urlTemporal.url = data.img;
                this.url[0] = urlTemporal;
                this.mostrarDropZone = false;
              }
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
    this._razasService.cargarAFirebase( this.archivo, razaForma, this.id, this.raza.img );
  }

  agregarNuevo( razaForma: NgForm ) {

    this.router.navigate(['/admin', 'nuevo']);
    razaForma.reset({
      pais: 'undefined',
      tamanio: 'undefined',
    });
    if ( this.url[0] ) {
      this.url[0].url = '';
    }

  }

}
