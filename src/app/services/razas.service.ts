import { Injectable } from '@angular/core';
import { Raza } from '../interfaces/raza.interface';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

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

  constructor() { }

  getRazas() {
    return this.razas;
  }
}