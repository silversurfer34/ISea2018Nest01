import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-boat-map',
  templateUrl: './boat-map.component.html',
  styleUrls: ['./boat-map.component.css'],
})
export class BoatMapComponent implements OnInit {
  lat: number = 43.616040;
  lng: number = 3.907910;

  constructor() { }

  ngOnInit() {
  }

}
