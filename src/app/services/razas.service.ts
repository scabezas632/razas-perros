import { Injectable } from '@angular/core';
import { Raza } from '../interfaces/raza.interface';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  razasURL: any = 'https://razas-perros.firebaseio.com/razas.json';
  razaURL: any = 'https://razas-perros.firebaseio.com/razas/';

  private razas: Raza[] = [
    {
      nombre: 'Terrier Chileno',
      info: 'Su color principal es el blanco, el que es acompañado por marcas negras y cafés.',
      pais: 'Chile',
      tamanio: 'Mediano',
      img: 'assets/img/terrier-chileno.jpg'
    },
    {
      nombre: 'Pastor Alemán',
      info: 'Es un perro de compañía ya que es un perro equilibrado y fácil de adiestrar.',
      pais: 'Alemania',
      tamanio: 'Grande',
      img: 'assets/img/pastor-aleman.jpg'
    }
  ];

  constructor( private http: HttpClient ) { }

  buscarTermino( termino: string ) {
    const razaArray: Raza[] = [];
    termino = termino.toLowerCase();

    for (const raza of this.razas) {
      const nombre = raza.nombre.toLocaleLowerCase();
      const pais = raza.pais.toLocaleLowerCase();
      const tamanio = raza.tamanio.toLocaleLowerCase();
      if ( nombre.includes( termino ) || pais.includes( termino ) || tamanio.includes( termino ) ) {
        razaArray.push( raza );
      }
    }
    return razaArray;
  }

  nuevaRaza( raza: Raza ) {
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

  actualizarRaza( raza: Raza, id: string ) {
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



}
