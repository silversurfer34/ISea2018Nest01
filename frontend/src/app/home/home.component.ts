import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable } from 'rxjs/Observable';
import { RouteInfoFromDb } from '../datamodel/datamodel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  existingRoutes: Observable<RouteInfoFromDb[]>;

  constructor(
    private backend: BackendService,
    private store: Store<any>
  ) { 
    this.backend.getExistingRoutes().subscribe( changed => console.log(changed)) ;    
    this.store.select('app', 'displayedRoute').map(val => console.log(val)).subscribe();    
  }

  ngOnInit() {
  }

  private onFileSelection(files: FileList) {  
    var file = files[0];
    this.backend.addRoute("new name", "now", undefined, "now", undefined);
  }
}
