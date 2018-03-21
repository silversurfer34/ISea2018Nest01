import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend/backend.service';
import { RouteDataFromDb, Point } from '../datamodel/datamodel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('gm') googleMaps: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  
  private routeColor = "#99cc00";
  private traceColor = "#cc9900";
  private routePoints: Point[];
  private tracePoints: Point[];

  private routeId: number;
  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private backend: BackendService
  ) {   
    this.activatedRoute.params
    .map(param => {
      if (param && param.id) {
        this.routeId = +param.id;
        this.getRouteData();
      }
      else{
        this.store.dispatch({
          type: "SET_SNACKBAR_MESSAGE",
          payload: 'Missing route information'
        });        
        // this.router.navigateByUrl('/home');
      }
    })
    .subscribe();

    this.store.select('app', 'displayedRoute').subscribe( displayedRoute => this.handleDisplayedRoute(displayedRoute));
  }

  ngOnInit() {
  }

  private getRouteData(){
    this.backend.getRouteData(this.routeId);
  }

  private handleDisplayedRoute( displayedRoute: RouteDataFromDb[] ){
    if(displayedRoute.length > 0){
      if(displayedRoute[0].route.points){
        this.routePoints = displayedRoute[0].route.points;
      }
      if(displayedRoute[0].trace.points){
        this.tracePoints = displayedRoute[0].trace.points;
      }
    }
  }

}