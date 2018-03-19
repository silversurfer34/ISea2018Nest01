import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable } from 'rxjs/Observable';
import { RouteFromDb } from '../datamodel/datamodel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  existingRoutes: Observable<RouteFromDb[]>;

  constructor(
    private backend: BackendService
  ) { 
    this.backend.getExistingRoutes().subscribe( changed => console.log(changed)) ;
  }

  ngOnInit() {
  }

  private onFileSelection(files: FileList) {    
    for (let index = 0, file: File; file = files[index]; index++) {
      this.backend.addRoute("new name", "now", file, "planned");
    }
  }
}
