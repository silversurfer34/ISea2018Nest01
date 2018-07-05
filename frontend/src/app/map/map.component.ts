import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend/backend.service';
import { Point, BoatTrajectoriesFromDb } from '../datamodel/datamodel';
import { Observable } from 'rxjs/observable';
import { findAtrajectory } from '../+state/app.reducer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  
  latitude: number = 43.6109200;
  longitude: number = 3.8772300;
  private globalBounds;
  private routeBounds;
  private traceBounds;

  private routeColor = "#99cc00";
  private traceColor = "#cc9900";
  private routePoints: Point[] = [];
  private cacheRoutePoints: Point[];
  private tracePoints: Point[];
  private cacheTracePoints: Point[];

  private newRoute: Point[] = [];

  private materialButtonClass = "mat-raised-button";
  private traceSelected: string = "selected";
  private routeSelected: string = "selected";
  private routeEdited:boolean = false;

  private clickToogle$;

  private routeName: string = "";

  private trajectoryName: string = "";
  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private backend: BackendService
  ) {  
    this.clearData(); 
    this.activatedRoute.params
    .map(param => {
      if (param && param.name) {
        this.trajectoryName = param.name;
        this.store.dispatch({
          type: 'APP_TITLE_SUFFIX',
          payload: this.trajectoryName
        });
        this.store.dispatch({
          type: 'SET_TRAJECTORY_NAME',
          payload: this.trajectoryName
        });     
      }
      else{
        this.store.dispatch({
          type: 'APP_TITLE_SUFFIX',
          payload: "Route creation"
        });
      }      
    })
    .subscribe();

    this.store.select(findAtrajectory).subscribe(displayedRoute => this.handleDisplayedTrajectory(displayedRoute));
    this.clickToogle$ = this.store.select('app', 'clickToogle');

    this.backend.getExistingRoutes();

    if (this.trajectoryName)
      this.backend.getTraceRT(this.trajectoryName);
  }

  ngOnInit() {
  }

  private handleDisplayedTrajectory( displayedTrajectory: BoatTrajectoriesFromDb ){
    this.clearData();
    if(displayedTrajectory){
      if(displayedTrajectory.route){
        this.routePoints = displayedTrajectory.route;
        this.cacheRoutePoints = this.routePoints;    
      }
      if(displayedTrajectory.trace){
        this.tracePoints = displayedTrajectory.trace;  
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
    if(points && points.length > 0){
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
    this.routePoints = [];
    this.tracePoints = undefined;
    this.cacheRoutePoints = undefined;
    this.cacheTracePoints = undefined;
  }

  private showOrHideTrace(){
    let state:boolean
    if(this.traceSelected === 'selected'){
      this.traceSelected = '';
      this.tracePoints = undefined;
      state=true;
    }
    else{
      this.traceSelected = 'selected';
      this.tracePoints = this.cacheTracePoints;
      state=false;
    }
    this.store.dispatch({
      type: 'CLICK_TOOGLE',
      payload: state
    })
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

  private markerTitle(point: Point){    
    let title="";
    if(point.bearing){
      title += 'Bearing: ' + point.bearing + " \n";
    }
    if(point.speed){
      title += 'Speed: ' + point.speed + "knots \n";
    }
    if(point.GMT_TIME){
      const d = new Date(point.GMT_TIME);
      title += 'GMT_TIME: ' + d.toLocaleString();
    }
    if(!title){
      title = "No info";
    }
    return title;
  }

  addMarker($event) {
    this.routePoints.push({latitude:$event.coords.lat, longitude:$event.coords.lng});
    this.routeEdited = true;
  }

  saveRoute(){
    if ( this.routeName) {
      this.trajectoryName = this.routeName;
      this.cacheRoutePoints = this.routePoints;
      this.backend.saveRouteCreated(this.trajectoryName, this.routePoints);
      this.routeEdited = false;
      this.router.navigateByUrl(`/map/${this.trajectoryName}`);
    }
  }
}

