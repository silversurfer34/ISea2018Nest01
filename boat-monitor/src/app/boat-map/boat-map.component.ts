import { Component, OnInit } from '@angular/core';
import { PositionService } from '../services/position.service';
import { HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { Position } from '../model/position';


@Component({
  selector: 'app-boat-map',
  providers: [ PositionService, HttpClient ],
  templateUrl: './boat-map.component.html',
  styleUrls: ['./boat-map.component.css'],
})
export class BoatMapComponent implements OnInit {
  title: string = 'Boat locator';
  lat: number = 43.552598;
  lng: number = 3.963800;
  current_zoom: number = 18;
  positions: any[];
  markers: any[];

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.positions = [];
    this.markers = [];
    this.positionService.getPositions().subscribe((positions: Position[]) => {
      this.updatePositions(positions);
    });
  }

  onChoseLocation(event) {
    var marker = new Position();
    marker.latitude = event.coords.lat;
    marker.longitude = event.coords.lng;
    this.markers.push(marker);
  }

  updatePositions(positions) {
    this.positions = positions;
  }
}
