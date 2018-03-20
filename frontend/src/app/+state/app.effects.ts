import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';
import { map, debounceTime } from 'rxjs/operators';
import { async } from 'rxjs/scheduler/async';

import { Effect, Actions } from '@ngrx/effects';

import { AppState } from './app.interfaces';
import { LoadLqc } from './app.actions';
import { BackendService } from '../backend/backend.service';

@Injectable()
export class AppEffects {
  @Effect()
  updateClusterNumber$ = this.actions.ofType('MARKER_EDITED').pipe(
    debounceTime(500, async),
    map((action: LoadLqc) => {      
      return {
        type: 'UPDATE_MARKER',
        payload: action.payload
      };
    })
  );

  constructor(
    private actions: Actions,    
    private service: BackendService
  ) {}
}
