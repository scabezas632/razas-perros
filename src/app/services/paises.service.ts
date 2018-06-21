import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor( private http: HttpClient ) { }


  public getPaises(): Observable<any> {
    return this.http.get('./assets/data/paises-min.json');
  }

}
