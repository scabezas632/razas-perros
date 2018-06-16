import { Component, OnInit } from '@angular/core';
import { RazasService } from '../../services/razas.service';
import { Raza } from '../../interfaces/raza.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styleUrls: ['./razas.component.css']
})
export class RazasComponent implements OnInit {

  razas: Raza[] = [];

  constructor( private _razasService: RazasService,
               private router: Router ) { }

  ngOnInit() {
    this.razas = this._razasService.getRazas();

    console.log(this.razas);
  }

  verRaza(id: number) {
    const PATH = '/razas/raza/' + id;
    this.router.navigateByUrl( PATH );
  }

}
