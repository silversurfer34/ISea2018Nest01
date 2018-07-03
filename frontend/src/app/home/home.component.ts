import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable } from 'rxjs/Observable';
import { RouteInfoFromDb } from '../datamodel/datamodel';
import { Store } from '@ngrx/store';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ELEMENT_DATA: RouteInfoFromDb[] =[];
  displayedColumns = ['route', 'trace', 'name', 'date', 'launchMapView'];
  dataSource: MatTableDataSource<RouteInfoFromDb>;

  newItemId: number;
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
    this.backend.getExistingRoutes();//.subscribe( changed => this.fillDataSource(changed));
    this.store.select('app', 'newItemId').subscribe( newItemId => this.newItemId = newItemId);
    this.store.select('app', 'routesInfoFromDb').subscribe( routes => this.fillDataSource(routes));
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

  private fillDataSource(changed:RouteInfoFromDb[]) {
    this.ELEMENT_DATA=changed;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDisplayIcon(fileName, imgSrc) {
    if (fileName == "")
      return '../assets/empty.png'
    else
      return imgSrc
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

  getClass(id){
    let suffix=""
    if(id == this.newItemId){
      suffix=" newItemAdded"
    }
    return 'mat-row' + suffix;
  }

  getTraceDate(element: RouteInfoFromDb){
    let date = " - ";
    if(element.traceFileName){
      let d = new Date(element.traceDate);
      let locale = "en-us";
      date = d.toLocaleString(locale, { day: "2-digit", month: "long", year: "numeric" });
    }
    return date;
  }

  goToMapView(id: number, name: string){
    this.router.navigate(['map', id]);
  }
}

