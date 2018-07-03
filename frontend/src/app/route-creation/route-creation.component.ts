import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouteData, Point } from '../datamodel/datamodel';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-route-creation',
  templateUrl: './route-creation.component.html',
  styleUrls: ['./route-creation.component.css']
})
export class RouteCreationComponent implements OnInit {

  route: RouteData = {points:[]};
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
    this.route.points.push({latitude:$event.coords.lat, longitude:$event.coords.lng});
  }

  saveRoute(){
    this.backend.saveRouteCreated(this.routeName, this.route);
  }
}
