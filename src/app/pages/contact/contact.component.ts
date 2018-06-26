import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  lat = -33.4438045;
  lng = -70.6525797;

  constructor() { }

  ngOnInit() {
  }

}
