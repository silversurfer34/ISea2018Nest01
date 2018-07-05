import { createSelector } from '@ngrx/store';
import { AppState, App } from './app.interfaces';
import { AppAction } from './app.actions';

export function AppReducer(state: App, action: AppAction): App {

  switch (action.type) {

    case 'SET_TRAJECTORY_NAME': {      
      return{
        ...state,
        trajectoryName: action.payload
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

    case 'UPDATE_NEW_ITEM_NAME': {
      return{
        ...state,
        newItemName: action.payload
      }
    }

    case 'UPDATE_ROUTES': {
      return{
        ...state,
        trajectoriesFromDb: action.payload
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

export const trajectories = (state: AppState) => state.app.trajectoriesFromDb;

export const trajectoryName = (state: AppState) => state.app.trajectoryName;

export const findAtrajectory = createSelector(
  trajectories,
  trajectoryName,
  (trajectoriesFromDb,trajectoryName) => {
    return trajectoriesFromDb.find(
      trajectory => trajectory.name == trajectoryName)
  });