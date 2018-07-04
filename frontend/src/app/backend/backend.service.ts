import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { BoatTrajectoriesFromDb, FileInfo, Point } from '../datamodel/datamodel';
import { Store } from '@ngrx/store';

@Injectable()
export class BackendService {

  private readonly boatTrajectoriesDb: string = 'boatTrajectories';

  private trajectoriesDB: AngularFirestoreCollection<BoatTrajectoriesFromDb>;
  private knownTrajectoryNames: string[] = [];
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private store: Store<any>
  ) { 
    this.trajectoriesDB = this.db.collection<BoatTrajectoriesFromDb>(this.boatTrajectoriesDb);
  }

  getExistingRoutes(){        
    this.trajectoriesDB.valueChanges().subscribe( itemsInDb => this.handleDbContent(itemsInDb) );
  }

  getTraceRT(traceName :string){    
    let me = this;    
    this.db.collection<Point>(traceName).valueChanges().subscribe( itemsInDb => {
      if(itemsInDb && itemsInDb.length > 0){
        me.trajectoriesDB.ref.where('name', '==', traceName ).get().then( res => res.forEach(function(doc) {
          me.trajectoriesDB.doc(doc.id).set(
            {trace: itemsInDb, traceDate: new Date().toString()},
            {merge: true}
          );
        })).catch(err => console.log(err));
      }
    });      
  }

  handleDbContent(itemsInDb: BoatTrajectoriesFromDb[]){
    const currentNames = itemsInDb.map( item => item.name);
    // we have already at least one route and we have a new one
    if(this.knownTrajectoryNames.length > 0 && this.knownTrajectoryNames.length < currentNames.length){
      const newNames = currentNames.filter( name => this.knownTrajectoryNames.indexOf(name) < 0);
      if(newNames.length > 0){
        this.store.dispatch({
          type: 'UPDATE_NEW_ITEM_NAME',
          payload: newNames[0]
        })

        setTimeout( () => {
          this.store.dispatch({
            type: 'UPDATE_NEW_ITEM_NAME',
            payload: -1
          })
        }, 2500);
      }
    }

    this.store.dispatch({
      type: "UPDATE_ROUTES",
      payload: itemsInDb
    })

    this.knownTrajectoryNames = currentNames;
  }

   addTrajectory(name: string, routeDate: string, routeFile: File, traceDate: string, traceFile: File){

    let filesInfo: FileInfo[] = [ 
      {name: routeFile? routeFile.name : '', date: routeDate || new Date().toString(), file: routeFile},
      {name: traceFile? traceFile.name: '', date: traceDate || new Date().toString(), file: traceFile}
    ]   
    
    if(routeFile || traceFile){
      this.loadAndSaveRouteData(name, filesInfo);
    }
    else{
      this.store.dispatch({
        type: 'SET_SNACKBAR_MESSAGE',
        payload: 'Nothing to save'
      })
    }
  }

  loadAndSaveRouteData(name: string, info: FileInfo[]){
    var reader = new FileReader(); 
    let me = this;    
    function readFile(index, content, error) {      
      if( index >= info.length){
        if( !error ){    
          const trajectoryDataToSave: BoatTrajectoriesFromDb = {
            name: name,
            routeDate: info[0].date,
            traceDate: info[1].date,
            route: content[0],
            trace: content[1]
          }
          me.trajectoriesDB.add(
            trajectoryDataToSave
          )
          .then( value =>  { me.store.dispatch({
                type: 'SET_SNACKBAR_MESSAGE',
                payload: 'Trajectory saved'
              }); 
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

  saveRouteCreated (routeName: string, route: Point[]) {  
    this.trajectoriesDB.add({
      name: routeName,
      routeDate: new Date().toString(),
      traceDate: "",
      route: route,
      trace: []
    
    }).catch( err => console.log(err));
  }
}
