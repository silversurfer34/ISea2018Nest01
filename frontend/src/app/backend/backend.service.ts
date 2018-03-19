import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { RouteFromDb } from '../datamodel/datamodel';

@Injectable()
export class BackendService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getExistingRoutes(){        
    return this.db.collection<RouteFromDb>('routes').valueChanges();
  }

  addRoute(name: string, date: string, file: File, type: string){
          
    this.db.collection<RouteFromDb>('routes').add({
      name: name,
      date: date,
      fileName: file.name,
      type: type
    }).catch( err => console.log(err));
    
    this.storage.upload(file.name, file)
    .then( snapshot => {      
      console.log('file uploaded');
    })
    .catch( error => {
      console.log('error');
    });    
  }  
}
