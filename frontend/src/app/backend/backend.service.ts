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

  addRoute(name: string, plannedDate: string, plannedFile: File, doneDate: string, doneFile: File){
    const timestamp = +new Date();
    let plannedFileName = '';
    let doneFileName = '';

    let filesToSave=[];
    if( plannedFile ) {
      plannedFileName = timestamp.toString() + '-' + plannedFile.name;
      filesToSave.push(plannedFile);
    }
    if( doneFile ) {
      doneFileName = timestamp.toString() + '-' + doneFile.name;
      filesToSave.push(doneFile);
    }
    
    if(filesToSave.length > 0){
      this.saveRouteInfo(name, plannedDate, plannedFileName, doneDate, doneFileName, timestamp);

      this.loadAndSaveRouteData(filesToSave, timestamp);
      
      this.saveFile(filesToSave, [plannedFileName, doneFileName], timestamp);
    }
    else{
      this.store.dispatch({
        type: 'SET_SNACKBAR_MESSAGE',
        payload: 'Nothing to save'
      })
    }
  }  

  saveRouteInfo(name: string, plannedDate: string, plannedFileName: string, doneDate: string, doneFileName: string, timestamp: number){    
    this.db.collection<RouteInfoFromDb>(this.routesInfoDb).add({
      id: timestamp,
      name: name,
      plannedDate: plannedDate,
      plannedFileName: plannedFileName,
      doneDate: doneDate,
      doneFileName: doneFileName
    }).catch( err => console.log(err));
  }

  loadAndSaveRouteData(files: File[], timestamp: number){
    var reader = new FileReader(); 
    let me = this;    
    function readFile(index, content) {      
      if( index >= files.length){        
        const routeDataToSave: RouteDataFromDb = {
          id: timestamp,
          plannedRoute: content[0] || {},
          doneRoute: content[1] || {}
        }
        me.db.collection<RouteDataFromDb>(me.routesDataDb).add(
          routeDataToSave
        )
        .then( value =>  me.store.dispatch({
            type: 'SET_SNACKBAR_MESSAGE',
            payload: 'Route saved'
          })
        )
        .catch( err => console.log(err)); 
        return;        
      }

      var file = files[index];
      reader.onload = function(e) {         
        content.push(JSON.parse(reader.result));
        readFile(index+1, content);        
      }
      reader.readAsText(file);      
      return content;
    }    
    readFile(0, []); 
  }

  saveFile(filesToSave: File[], fileNames: string[], timestamp: number){
    filesToSave.forEach( ( file, index) => {
      this.storage.upload(fileNames[index], file )
      .catch( error => console.log("error"));
    });
  }
}
