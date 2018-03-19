import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouteFromDb } from '../datamodel/datamodel';

@Injectable()
export class BackendService {

  constructor(
    private db: AngularFirestore    
  ) { }

  getExistingRoutes(){    
    return this.db.collection<RouteFromDb>('routes').valueChanges();
  }
}
