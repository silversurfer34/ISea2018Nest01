import { RouteDataFromDb, RouteInfoFromDb } from "../datamodel/datamodel";

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

export interface OpenUploadDialog {
  type: 'OPEN_UPLOAD_DIALOG';
  payload: boolean;
}

export interface AppTitleSuffix {
  type: 'APP_TITLE_SUFFIX';
  payload: string;
}

export interface UpdateNewItemId {
  type: 'UPDATE_NEW_ITEM_ID',
  payload: number;
}

export interface UpdateRoutes {
  type: 'UPDATE_ROUTES',
  payload: RouteInfoFromDb[];
}

export type AppAction = 
AddRouteData 
| SetSnackbarMessage
| ClearSnackbarMessage
| OpenUploadDialog
| AppTitleSuffix
| UpdateNewItemId
| UpdateRoutes;
