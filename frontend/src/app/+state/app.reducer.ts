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

    case 'UPDATE_TRACE_RT_DATA': {      
      return{
        ...state,
        displayedTraceRT: action.payload
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

    case 'APP_TITLE_SUFFIX':{
      return{
        ...state,
        appSuffix: action.payload
      }
    }

    case 'UPDATE_NEW_ITEM_ID': {
      return{
        ...state,
        newItemId: action.payload
      }
    }

    case 'UPDATE_ROUTES': {
      return{
        ...state,
        routesInfoFromDb: action.payload
      }
    }

    case 'LOADING': {
      return {
        ...state,
        loading: action.payload
      };
    }
      
    default: {
      return state;
    }
  }
}