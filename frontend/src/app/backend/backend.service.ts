import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { RouteInfoFromDb, RouteDataFromDb, RouteData } from '../datamodel/datamodel';
import { Store } from '@ngrx/store';

@Injectable()
export class BackendService {

  private readonly routesInfoDb: string = 'routesInfo';
  private readonly routesDataDb: string = 'routesData';

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private store: Store<any>
  ) { }

  getExistingRoutes(){        
    return this.db.collection<RouteInfoFromDb>(this.routesInfoDb).valueChanges();
  }

  getRouteData(routeId: number){    
    let me = this;
    this.db.collection<RouteDataFromDb>(this.routesDataDb).ref.where('id', '==', routeId ).get().then( res => res.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      let result = doc.data() as RouteDataFromDb;         
      me.store.dispatch({
        type: 'ADD_ROUTE_DATA',
        payload: result
      })      
  })).catch(err => console.log(err));    
  }

  addRoute(name: string, date: string, file: File, type: string){
    const timestamp = +new Date();
    this.db.collection<RouteInfoFromDb>(this.routesInfoDb).add({
      id: timestamp,
      name: name,
      date: date,
      fileName: file.name,
      type: type
    }).catch( err => console.log(err));
    
    const fileReader = new FileReader();    
    var jsonContent;
    let me = this;
    fileReader.onload = function (evt) {        
        jsonContent = JSON.parse(fileReader.result);
        me.db.collection<RouteDataFromDb>(me.routesDataDb).add({
          id: timestamp,
          data: jsonContent as RouteData
        }).catch( err => console.log(err));
    };
    fileReader.readAsText(file);

    this.storage.upload(file.name, file)
    .then( snapshot => {      
      console.log('file uploaded');
    })
    .catch( error => {
      console.log('error');
    });    
  }  
}
