import { createSelector } from '@ngrx/store';
import { AppState, App } from './app.interfaces';
import { AppAction } from './app.actions';

export function AppReducer(state: App, action: AppAction): App {

  switch (action.type) {
    case 'ADD_ROUTE_DATA': {      
      return{
        ...state,
        displayedRoute: [action.payload]
      }
    }

    case 'SET_SNACKBAR_MESSAGE': {
      return {
        ...state,
        message: action.payload
      }
    }

    case 'CLEAR_SNACKBAR_MESSAGE': {
      return {
        ...state,
        message: ''
      }
    }

    case 'OPEN_UPLOAD_DIALOG': {
      return {
        ...state,
        openUploadDialog: action.payload
      }
    }
      
    default: {
      return state;
    }
  }
}