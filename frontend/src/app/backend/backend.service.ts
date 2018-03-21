import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { RouteInfoFromDb, RouteDataFromDb, RouteData, FileInfo } from '../datamodel/datamodel';
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

  getRouteName(routeId: number){
    let me = this;
    this.db.collection<RouteInfoFromDb>(this.routesInfoDb).ref.where('id', '==', routeId ).get().then( res => res.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      let result = doc.data() as RouteInfoFromDb;         
      me.store.dispatch({
        type: 'APP_TITLE_SUFFIX',
        payload: result.name
      })      
    })).catch(err => console.log(err));    
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

  addRoute(name: string, routeDate: string, routeFile: File, traceDate: string, traceFile: File){
    const timestamp = +new Date();

    let filesInfo: FileInfo[] = [ 
      {name: routeFile? timestamp.toString() + '-' + routeFile.name : '', date: routeDate || new Date().toString(), file: routeFile},
      {name: traceFile? timestamp.toString() + '-' + traceFile.name: '', date: traceDate || new Date().toString(), file: traceFile}
    ]   
    
    if(routeFile || traceFile){
      this.loadAndSaveRouteData(filesInfo, timestamp);
      this.saveRouteInfo(name, filesInfo, timestamp);      
      this.saveFile(filesInfo, timestamp);
    }
    else{
      this.store.dispatch({
        type: 'SET_SNACKBAR_MESSAGE',
        payload: 'Nothing to save'
      })
    }
  }  

  saveRouteInfo(name: string, filesInfo: FileInfo[], timestamp: number){    
    this.db.collection<RouteInfoFromDb>(this.routesInfoDb).add({
      id: timestamp,
      name: name,
      routeDate: filesInfo[0].date,
      routeFileName: filesInfo[0].name,
      traceDate: filesInfo[1].date,
      traceFileName: filesInfo[1].name
    }).catch( err => console.log(err));
  }

  loadAndSaveRouteData(info: FileInfo[], timestamp: number){
    var reader = new FileReader(); 
    let me = this;    
    function readFile(index, content) {      
      if( index >= info.length){     
        const routeDataToSave: RouteDataFromDb = {
          id: timestamp,
          route: content[0],
          trace: content[1]
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

      var file = info[index].file;
      reader.onload = function(e) {        
        content[index] = JSON.parse(reader.result);
        readFile(index+1, content);        
      }
      if(file){
        reader.readAsText(file);
      }
      else{
        readFile(index + 1, content);
      }
      return content;
    }    
    readFile(0, [{}, {}]); 
  }

  saveFile(filesInfo: FileInfo[], timestamp: number){
    filesInfo.forEach( fileInfo => {      
      if(fileInfo.file){        
        this.storage.upload(fileInfo.name, fileInfo.file )
        .catch( error => console.log("error"));
      }
    });
  }
}
