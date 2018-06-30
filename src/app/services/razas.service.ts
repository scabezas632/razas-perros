import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Raza } from '../interfaces/raza.interface';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
import { UrlImage } from '../models/url-image';
import { RazaClass } from '../models/raza';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  razasURL: any = 'https://razas-perros.firebaseio.com/razas.json';
  razaURL: any = 'https://razas-perros.firebaseio.com/razas';

  private CARPETA_IMAGENES = 'img';

  constructor( private http: HttpClient,
               private router: Router,
               private db: AngularFirestore ) { }

  nuevaRaza( raza: RazaClass ) {
    const body = JSON.stringify( raza );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers
    };

    return this.http.post( this.razasURL, body, options )
              .pipe(map ( res => {
                return res;
              }));
  }

  actualizarRaza( raza: RazaClass, id: string ) {
    const body = JSON.stringify( raza );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers
    };

    const url = `${ this.razaURL }/${ id }.json`;

    return this.http.put( url , body, options )
              .pipe(map ( res => {
                return res;
              }));
  }

  obtenerRaza( id: string ) {
    const url = `${ this.razaURL }/${ id }.json`;

    return this.http.get( url )
      .pipe(map(res => res));

  }

  obtenerRazas( ) {
    const url = `${ this.razasURL }`;

    return this.http.get( url )
      .pipe(map(res => res));

  }

  eliminarRaza( id: string ) {
    const url = `${ this.razaURL }/${ id }.json`;

    return this.http.delete( url )
      .pipe(map(res => res));
  }

  previewImage(event: any, url: UrlImage[]): UrlImage[] {
    // Si el usuario escoge la imagen desde el boton
    if (event.target) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = ( event2: any) => {
          const urlTemporal: UrlImage = new UrlImage();
          urlTemporal.url = event2.target.result;
          url[0] = urlTemporal;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      // Si el usuario arrastra la imagen
      const reader = new FileReader();

      reader.onload = ( event2: any) => {
        const urlTemporal: UrlImage = new UrlImage();
        urlTemporal.url = event2.target.result;
        url[0] = urlTemporal;
      };
      reader.readAsDataURL(event);
    }
    return url;
  }

  cargarAFirebase( imagen: FileItem[], raza: Raza, id: string, urlPrevia: string ) {

    if ( !imagen[0] && urlPrevia === '' ) {
      console.log('Debe seleccionar una imagen.');
      return;
    }

    if ( imagen[0] ) {

      // Primero se carga la imagen
      const storageRef = firebase.storage().ref();

      imagen[0].estaSubiendo = true;
      if (imagen[0].estaSubiendo || imagen[0].progreso >= 100) {
        // return;
      }

      const nombreArchivo = imagen[0].nombreArchivo.split('.')[0];
      const extensionArchivo = imagen[0].nombreArchivo.split('.')[1];

      const referenciaImagen = storageRef.child( `${ this.CARPETA_IMAGENES }/${ nombreArchivo }-${ id }.${ extensionArchivo }` );
      const uploadTask: firebase.storage.UploadTask =
              storageRef.child(`${ this.CARPETA_IMAGENES }/${ nombreArchivo }-${ id }.${ extensionArchivo }`)
                        .put(imagen[0].archivo);

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
                ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
                            imagen[0].progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100 ,
                ( error ) => console.error('Error al subir: ', error),
              () => {
                referenciaImagen.getDownloadURL().then(
                  ( urlImagen ) => {
                      console.log('Imagen cargada correctamente');
                      if (urlPrevia !== '') {
                        this.borrarImagenAnterior( urlPrevia );
                      }
                      // Una vez que la imagen está subida, se le asigna los atributos a la clase
                      imagen[0].url = urlImagen;
                      imagen[0].estaSubiendo = false;

                      const claseRaza: RazaClass = new RazaClass();
                      claseRaza.nombre = raza.nombre;
                      claseRaza.info = raza.info;
                      claseRaza.pais = raza.pais;
                      claseRaza.tamanio = raza.tamanio;
                      claseRaza.img = urlImagen;
                      // Finalmente se sube el documento completo a firebase
                      this.guardarDatos( id, claseRaza );
                  }, ( error ) => console.log('No existe la URL')
                  );
              });

    } else {
      const claseRaza: RazaClass = new RazaClass();
      claseRaza.nombre = raza.nombre;
      claseRaza.info = raza.info;
      claseRaza.pais = raza.pais;
      claseRaza.tamanio = raza.tamanio;
      claseRaza.img = urlPrevia;
      // Finalmente se sube el documento completo a firebase
      this.guardarDatos( id, claseRaza );
    }



  }

  private guardarDatos( id: string, claseRaza: RazaClass ) {
    if (id === 'nuevo') {
      this.nuevaRaza( claseRaza )
      .subscribe( (data: any) => {
        this.router.navigate(['/admin', data.name]);
        swal('Creación finalizada', 'La raza \'' + claseRaza.nombre + '\' ha sido creada correctamente.', 'success');
      }, error => {
        swal('Error', 'Ha ocurrido un error al crear la raza, por favor intentelo nuevamente.', 'error');
        console.log(error);
      });
    } else {
      this.actualizarRaza( claseRaza, id )
      .subscribe( (data: any) => {
        // this.router.navigate(['/admin']);
        swal('Edición finalizada', 'La raza \'' + claseRaza.nombre + '\' ha sido editada correctamente.', 'success');
      }, error => {
        swal('Error', 'Ha ocurrido un error al editar la raza, por favor intentelo nuevamente.', 'error');
        console.log(error);
      });
    }
  }

  private borrarImagenAnterior( url: string ) {
    const nombreArchivo = url.split('%2F')[1].split('?')[0];
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.CARPETA_IMAGENES}/${nombreArchivo}`).delete();
    console.log('La imagen anterior se ha eliminado correctamente.');
  }

}
