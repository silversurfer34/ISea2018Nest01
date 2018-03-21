import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable } from 'rxjs/Observable';
import { RouteInfoFromDb } from '../datamodel/datamodel';
import { Store } from '@ngrx/store';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ELEMENT_DATA: RouteInfoFromDb[] =[];
  displayedColumns = ['route', 'trace', 'name', 'date', 'launchMapView'];
  dataSource: MatTableDataSource<RouteInfoFromDb>;

  constructor(
    private backend: BackendService,
    private store: Store<any>
  ) { 
    this.backend.getExistingRoutes().subscribe( changed => this.fillDataSource(changed)) ;    
    this.store.select('app', 'displayedRoute').map(val => console.log(val)).subscribe();    
  }

  ngOnInit() {
  }

  private fillDataSource(changed:RouteInfoFromDb[]) {
    this.ELEMENT_DATA=changed;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  private onFileSelection(files: FileList) {  
    var file = files[0];
    this.backend.addRoute("new name", "now", undefined, "now", undefined);
  }

  onDisplayIcon(fileName, imgSrc) {
    if (fileName == "")
      return '../assets/empty.png'
    else
      return imgSrc
  }
}

