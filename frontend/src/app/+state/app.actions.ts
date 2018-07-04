import { BoatTrajectoriesFromDb, Point} from "../datamodel/datamodel";

export interface SetTrajectoryName {
  type: 'SET_TRAJECTORY_NAME';
  payload: string;
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

export interface UpdateNewItemName {
  type: 'UPDATE_NEW_ITEM_NAME',
  payload: string;
}

export interface UpdateRoutes {
  type: 'UPDATE_ROUTES',
  payload: BoatTrajectoriesFromDb[];
}

export interface Loading{
  type: 'LOADING',
  payload: boolean;
}

export interface LoadBoatTrajectoriesFromDb{
  type: 'LOAD_ROUTE_DATA_FROM_DB'  
}

export interface NewRouteIncoming{
  type: 'NEW_ROUTE_INCOMING'
}

export type AppAction = 
SetTrajectoryName
| SetSnackbarMessage
| ClearSnackbarMessage
| OpenUploadDialog
| AppTitleSuffix
| UpdateNewItemName
| UpdateRoutes
| LoadBoatTrajectoriesFromDb
| NewRouteIncoming
| Loading;
