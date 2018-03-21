import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmKmlLayer } from '@agm/core/directives';

@Component({
  selector: 'app-boat-map',
  templateUrl: './boat-map.component.html',
  styleUrls: ['./boat-map.component.css'],
})
export class BoatMapComponent implements OnInit {
  title: string = 'Boat locator';
  lat: number = 43.616040;
  lng: number = 3.907910;
  current_marker_lat: number = null;
  current_marker_lng: number = null;
  dest_marker_lat: number = null;
  dest_marker_lng: number = null;

  destChosen = false;

  constructor() { }

  ngOnInit() {
    this.current_marker_lat = 43.616040;
    this.current_marker_lng = 3.907910;
  }

  onChoseLocation(event) {
    // console.log(event);
    this.dest_marker_lat = event.coords.lat;
    this.dest_marker_lng = event.coords.lng;
    this.destChosen = true;
  }

}
