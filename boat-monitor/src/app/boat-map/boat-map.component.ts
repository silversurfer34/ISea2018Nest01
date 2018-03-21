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
  lat: number = 43.616040;
  lng: number = 3.907910;
  positions: any[];
  current_marker_lat: number = null;
  current_marker_lng: number = null;
  dest_marker_lat: number = null;
  dest_marker_lng: number = null;

  destChosen = false;

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.positions = [];
    this.current_marker_lat = 43.616040;
    this.current_marker_lng = 3.907910;

    this.positionService.getPositions().subscribe((positions: Position[]) => {
      this.updatePositions(positions);
    });
  }

  onChoseLocation(event) {
    // console.log(event);
    this.dest_marker_lat = event.coords.lat;
    this.dest_marker_lng = event.coords.lng;
    this.destChosen = true;
  }

  updatePositions(positions) {
    this.positions = positions;
  }
}
