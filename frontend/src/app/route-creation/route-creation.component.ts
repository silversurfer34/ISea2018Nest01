import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Point } from '../datamodel/datamodel';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-route-creation',
  templateUrl: './route-creation.component.html',
  styleUrls: ['./route-creation.component.css']
})
export class RouteCreationComponent implements OnInit {

  route: Point[] = [];
  routeName : string = "Route name";

  constructor(
    private backend: BackendService,
    private store : Store<any>) {   
    this.store.dispatch({
      type: 'APP_TITLE_SUFFIX',
      payload: "route creation"
    })
  }

  ngOnInit() {
  }

  addMarker($event) {
    this.route.push({latitude:$event.coords.lat, longitude:$event.coords.lng});
  }

  saveRoute(){
    this.backend.saveRouteCreated(this.routeName, this.route);
  }
}
