import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable } from 'rxjs/Observable';
import { BoatTrajectoriesFromDb, Point } from '../datamodel/datamodel';
import { Store } from '@ngrx/store';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { Router } from '@angular/router';
import { trajectories } from '../+state/app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ELEMENT_DATA: BoatTrajectoriesFromDb[] =[];
  displayedColumns = ['route', 'trace', 'name', 'date', 'deleteTrajectory'];
  dataSource: MatTableDataSource<BoatTrajectoriesFromDb>;

  newItemName: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private backend: BackendService,
    private store: Store<any>,
    private router: Router
  ) {
    this.store.dispatch({
      type: 'LOAD_ROUTE_DATA_FROM_DB'
    })
    this.store.dispatch({
      type: 'SET_TRAJECTORY_NAME',
      payload: ""
    })
    this.backend.getExistingRoutes();//.subscribe( changed => this.fillDataSource(changed));
    this.store.select('app', 'newItemName').subscribe( newItemName => this.newItemName = newItemName);
    this.store.select(trajectories).subscribe( routes => this.fillDataSource(routes));
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
  }

  private fillDataSource(changed:BoatTrajectoriesFromDb[]) {
    this.ELEMENT_DATA=changed;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDisplayIcon(data: Point[], imgSrc) {
    if (data && data.length > 0)
      return imgSrc 
    else
      return '../assets/empty.png'
  }

  openUploadDialog(){
    this.store.dispatch({
      type: 'OPEN_UPLOAD_DIALOG',
      payload: true
    })
  }

  creationRoute(){
    this.router.navigateByUrl("/routeCreation");
  }

  getClass(name : string){
    let suffix=""
    if(name == this.newItemName){
      suffix=" newItemAdded"
    }
    return 'mat-row' + suffix;
  }

  getTraceDate(element: BoatTrajectoriesFromDb){
    let date = " - ";
    if(element.trace && element.trace.length > 0){
      let d = new Date(element.traceDate);
      let locale = "en-us";
      date = d.toLocaleString(locale, { day: "2-digit", month: "long", year: "numeric" });
    }
    return date;
  }

  goToMapView(name: string){
    this.router.navigate(['map', name]);
  }


  deleteTrajectory (name:string)
  {
    this.backend.deleteTrajectory(name);
  }
}

