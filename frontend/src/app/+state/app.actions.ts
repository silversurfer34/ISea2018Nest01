import { RouteDataFromDb } from "../datamodel/datamodel";

export interface AddRouteData {
  type: 'ADD_ROUTE_DATA';
  payload: RouteDataFromDb;
}

export interface SetSnackbarMessage {
  type: 'SET_SNACKBAR_MESSAGE';
  payload: string;
}

export interface ClearSnackbarMessage {
  type: 'CLEAR_SNACKBAR_MESSAGE';
}

export type AppAction = 
AddRouteData 
| SetSnackbarMessage
| ClearSnackbarMessage;
