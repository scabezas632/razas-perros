import { FileItem } from '../models/file-item';
import { RazasService } from '../services/razas.service';
import { UrlImage } from '../models/url-image';
import { Directive, EventEmitter, ElementRef,
         HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivo: FileItem[] = [];
  @Output() mostrarDropZone: EventEmitter<boolean> = new EventEmitter();
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Output() urlDrop: EventEmitter<UrlImage[]> = new EventEmitter();

  url: UrlImage[] = [];

  constructor( private _razasService: RazasService ) { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit( true );
    this.mostrarDropZone.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {

    const transferencia = this._getTransferencia( event );

    if ( !transferencia ) {
      return;
    }
    this._extraerArchivos( transferencia.files );
    this._prevenirDetener( event );
    this._razasService.previewImage( this.archivo[0].archivo, this.url );
    this.urlDrop.emit( this.url );
    this.mouseSobre.emit( false );
    this.mostrarDropZone.emit( false );
  }

  @HostListener('mouseover')
  public onMouseOver() {
    // if ( this.url[0] ) {
      this.mostrarDropZone.emit( true );
    // }
  }

  @HostListener('mouseout')
  public onMouseOut() {
    if ( this.url[0] ) {
      this.mostrarDropZone.emit( false );
    }
  }

  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList ) {

    // tslint:disable-next-line:forin
    const propiedad = Object.getOwnPropertyNames( archivosLista );
    const archivoTemporal = archivosLista[propiedad[0]];

    if ( this._archivoPuedeSerCargado( archivoTemporal ) ) {
      const nuevoArchivo = new FileItem( archivoTemporal );
      this.archivo[0] = nuevoArchivo;
    }
  }

  // Validaciones

  // Valida si el archivo puede ser cargado
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if ( !this._archivoIngresado( archivo.name ) && this._esImagen( archivo.type )) {
      return true;
    } else {
      return false;
    }
  }


  // Previene que el navegador abra la imagen
  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Comprueba que el archivo ya fue ingresado
  private _archivoIngresado( nombreArchivo: string ): boolean {
    if ( this.archivo[0] ) {
      if ( this.archivo[0].nombreArchivo === nombreArchivo ) {
        console.log('El archivo' + nombreArchivo + ' ya fue agregado.');
        return true;
      }
    }
    return false;
  }

  // Verifica si el archivo es una imagen
  private _esImagen( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

}
