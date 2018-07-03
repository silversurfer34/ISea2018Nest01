import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { RouteInfoFromDb, RouteDataFromDb, RouteData, FileInfo, Point } from '../datamodel/datamodel';
import { Store } from '@ngrx/store';

@Injectable()
export class BackendService {

  private readonly routesInfoDb: string = 'routesInfo';
  private readonly routesDataDb: string = 'routesData';  

  private knownRouteIds: number[] = [];
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private store: Store<any>
  ) { }

  getExistingRoutes(){        
    this.db.collection<RouteInfoFromDb>(this.routesInfoDb).valueChanges().subscribe( itemsInDb => this.handleDbContent(itemsInDb) );
  }

  getTraceRT(traceName :string){        
    this.db.collection<Point>(traceName).valueChanges().subscribe( itemsInDb => this.store.dispatch ({
      type :"UPDATE_TRACE_RT_DATA",
      payload: itemsInDb
    }) );
  }

  handleDbContent(itemsInDb: RouteInfoFromDb[]){
    const currentIds = itemsInDb.map( item => item.id );
    // we have already at least one route and we have a new one
    if(this.knownRouteIds.length > 0 && this.knownRouteIds.length < currentIds.length){
      const newIds = currentIds.filter( id => this.knownRouteIds.indexOf(id) < 0);
      if(newIds.length > 0){
        this.store.dispatch({
          type: 'UPDATE_NEW_ITEM_ID',
          payload: newIds[0]
        })

        setTimeout( () => {
          this.store.dispatch({
            type: 'UPDATE_NEW_ITEM_ID',
            payload: -1
          })
        }, 2500);
      }
    }

    this.store.dispatch({
      type: "UPDATE_ROUTES",
      payload: itemsInDb
    })

    this.knownRouteIds = currentIds;
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
      this.loadAndSaveRouteData(name, filesInfo, timestamp);
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

  loadAndSaveRouteData(name: string, info: FileInfo[], timestamp: number){
    var reader = new FileReader(); 
    let me = this;    
    function readFile(index, content, error) {      
      if( index >= info.length){
        if( !error ){    
          const routeDataToSave: RouteDataFromDb = {
            id: timestamp,
            route: content[0],
            trace: content[1]
          }
          me.db.collection<RouteDataFromDb>(me.routesDataDb).add(
            routeDataToSave
          )
          .then( value =>  { me.store.dispatch({
                type: 'SET_SNACKBAR_MESSAGE',
                payload: 'Route saved'
              });
              me.saveRouteInfo(name, info, timestamp);  
            }
          )
          .catch( err => console.log(err)); 
        }
        else{
          me.store.dispatch({
            type: 'SET_SNACKBAR_MESSAGE',
            payload: 'Error while saving'
          })
        }
        return error;        
      }

      var file = info[index].file;
      reader.onload = function(e) {        
        try{
          content[index] = JSON.parse(reader.result)
        } catch(err) {          
          error = true;          
        };
        readFile(index+1, content, error);        
      }
      if(file){
        reader.readAsText(file);
      }
      else{
        readFile(index + 1, content, error);
      }
      return content;
    }    
    readFile(0, [{}, {}], false); 
  }

  saveFile(filesInfo: FileInfo[], timestamp: number){
    filesInfo.forEach( fileInfo => {      
      if(fileInfo.file){        
        this.storage.upload(fileInfo.name, fileInfo.file )
        .catch( error => console.log("error"));
      }
    });
  }

  saveRouteCreated (routeName: string, route: RouteData) {
    const timestamp = +new Date();

  this.db.collection<RouteInfoFromDb>(this.routesInfoDb).add({
    id: timestamp,
    name: routeName,
    routeDate: new Date().toString(),
    routeFileName: "dummyName",
    traceDate: "",
    traceFileName: ""
  }).catch( err => console.log(err));

  const routeDataToSave: RouteDataFromDb = {
    id: timestamp,
    route: route,
    trace: {points:[]}
  }
  this.db.collection<RouteDataFromDb>(this.routesDataDb).add(
    routeDataToSave
  )
  }
}
