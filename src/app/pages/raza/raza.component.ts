import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RazasService } from '../../services/razas.service';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.css']
})
export class RazaComponent implements OnInit {

  raza: any = { };

  constructor( private activatedRouted: ActivatedRoute,
               private _razasService: RazasService ) {

    this.activatedRouted.params.subscribe( params => {
      this.raza = this._razasService.getRaza(params['id']);
      console.log(this.raza);
    });

   }

  ngOnInit() {
  }

}
