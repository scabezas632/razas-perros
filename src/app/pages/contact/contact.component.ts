import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacto: any = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  lat = -33.4438045;
  lng = -70.6525797;

  constructor() { }

  ngOnInit() {
  }

  enviar(form: NgForm) {
    console.log(form);
    // const nombre = form.nombre;
    // const email = form.email;
    // const mensaje = form.mensaje;

    // const formRequest = { name, email, mensaje};
    form.reset();

}

}
