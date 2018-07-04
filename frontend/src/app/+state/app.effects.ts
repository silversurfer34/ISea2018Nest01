import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';
import { map, debounceTime } from 'rxjs/operators';
import { async } from 'rxjs/scheduler/async';

import { Effect, Actions } from '@ngrx/effects';

import { AppState } from './app.interfaces';
import { BackendService } from '../backend/backend.service';

@Injectable()
export class AppEffects {
  @Effect()
  showProgressBar$ = this.actions
    .ofType(
      'LOAD_ROUTE_DATA_FROM_DB',
      'NEW_ROUTE_INCOMING'
    )
    .pipe(
      map((action) => {
        return {
          type: 'LOADING',
          payload: true
        };
      })
    );

  @Effect()
  hideProgressBar$ = this.actions
    .ofType(
      'SET_SNACKBAR_MESSAGE',
      'UPDATE_ROUTES'      
    )
    .pipe(
      map((action) => {
        return {
          type: 'LOADING',
          payload: false
        };
      })
    );
  constructor(
    private actions: Actions,    
    private service: BackendService
  ) {}
}
