import { createSelector } from '@ngrx/store';
import { AppState, App } from './app.interfaces';
import { AppAction } from './app.actions';

export function AppReducer(state: App, action: AppAction): App {

  switch (action.type) {
    case 'ADD_ROUTE_DATA': {    
      console.log(action.payload)  ;
      state.displayedRoute.push(action.payload);      
      return state;
    }
      
    default: {
      return state;
    }
  }
}