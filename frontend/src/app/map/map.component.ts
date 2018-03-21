import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend/backend.service';
import { RouteDataFromDb, Point } from '../datamodel/datamodel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  lat: number = 51.678418;
  lng: number = 7.809007;
  private globalBounds;
  private routeBounds;
  private traceBounds;

  private routeColor = "#99cc00";
  private traceColor = "#cc9900";
  private routePoints: Point[];
  private cacheRoutePoints: Point[];
  private tracePoints: Point[];
  private cacheTracePoints: Point[];

  private materialButtonClass = "mat-raised-button";
  private traceSelected: string = "selected";
  private routeSelected: string = "selected";

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
      this.clearData();
    })
    .subscribe();

    this.store.select('app', 'displayedRoute').subscribe( displayedRoute => this.handleDisplayedRoute(displayedRoute));
  }

  ngOnInit() {
  }

  private getRouteData(){
    this.backend.getRouteData(this.routeId);
    this.backend.getRouteName(this.routeId);
  }

  private handleDisplayedRoute( displayedRoute: RouteDataFromDb[] ){
    this.clearData();
    if(displayedRoute.length > 0){
      if(displayedRoute[0].route.points){
        this.routePoints = displayedRoute[0].route.points;
        this.cacheRoutePoints = this.routePoints;    
      }
      if(displayedRoute[0].trace.points){
        this.tracePoints = displayedRoute[0].trace.points;  
        this.cacheTracePoints = this.tracePoints;      
      }
      this.fitBounds();
    }
  }

  private fitBounds(){    
    this.routeBounds = this.getBoundsForPolygon(this.routePoints);
    this.traceBounds = this.getBoundsForPolygon(this.tracePoints);

    if(this.routeBounds && !this.traceBounds){
      this.globalBounds = this.routeBounds;
    }
    else if(!this.routeBounds && this.traceBounds){
      this.globalBounds = this.traceBounds;
    }
    else if(this.routeBounds && this.traceBounds){
      this.globalBounds = {
        east: this.routeBounds.east > this.traceBounds.east? this.routeBounds.east : this.traceBounds.east,
        west: this.routeBounds.west < this.traceBounds.west? this.routeBounds.west : this.traceBounds.west,
        north: this.routeBounds.north > this.traceBounds.north? this.routeBounds.north : this.traceBounds.north,
        south: this.routeBounds.south < this.traceBounds.south? this.routeBounds.south : this.traceBounds.south
      }
    }
  }

  getBoundsForPolygon( points: Point[] ){
    let bounds = undefined;
    if(points){
      const minLatitude = points.reduce( (previous, current) => {
        return previous.latitude < current.latitude ? previous: current;
      }, {latitude: undefined, longitude: undefined});
  
      const maxLatitude = points.reduce( (previous, current) => {
        return previous.latitude > current.latitude ? previous: current;
      });
      const minLongitude = points.reduce( (previous, current) => {
        return previous.longitude < current.longitude ? previous: current;
      });
      const maxLongitude = points.reduce( (previous, current) => {
        return previous.longitude > current.longitude ? previous: current;
      });

      bounds = {
        east: maxLongitude.longitude,
        west: minLongitude.longitude,
        north: maxLatitude.latitude,
        south: minLatitude.latitude
      }
    }
    return bounds;
  }

  private clearData(){
    this.globalBounds = undefined;
    this.routeBounds = undefined;
    this.traceBounds = undefined;
    this.routePoints = undefined;
    this.tracePoints = undefined;
    this.cacheRoutePoints = undefined;
    this.cacheTracePoints = undefined;
  }

  private showOrHideTrace(){
    if(this.traceSelected === 'selected'){
      this.traceSelected = '';
      this.tracePoints = undefined;
    }
    else{
      this.traceSelected = 'selected';
      this.tracePoints = this.cacheTracePoints;
    }
  }

  private showOrHideRoute(){
    if(this.routeSelected === 'selected'){
      this.routeSelected = '';
      this.routePoints = undefined;
    }
    else{
      this.routeSelected = 'selected';
      this.routePoints = this.cacheRoutePoints;
    }
  }
}