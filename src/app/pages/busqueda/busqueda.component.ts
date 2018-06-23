import { Component, OnInit } from '@angular/core';
import { RazasService } from '../../services/razas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-razas',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  razas: any[] = [];
  loading = true;

  query = '';

  constructor( private _razasService: RazasService,
               private router: Router ) {

    this._razasService.obtenerRazas()
    .subscribe( (data: any) => {
      for (const id in data) {
        if (data.hasOwnProperty(id)) {
          // tslint:disable-next-line:prefer-const
          let h = data[id];
          h.id = id;
          this.razas.push(data[id]);
        }
      }
      this.loading = false;
    });
  }

  ngOnInit() {}

}
