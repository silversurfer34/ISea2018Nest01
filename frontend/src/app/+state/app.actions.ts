import { RouteDataFromDb, RouteInfoFromDb,TraceRTDataFromDb } from "../datamodel/datamodel";

export interface AddRouteData {
  type: 'ADD_ROUTE_DATA';
  payload: RouteDataFromDb;
}

export interface UpdateTraceRTData {
  type: 'UPDATE_TRACE_RT_DATA';
  payload: TraceRTDataFromDb;
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

export interface Loading{
  type: 'LOADING',
  payload: boolean;
}

export interface LoadRouteDataFromDb{
  type: 'LOAD_ROUTE_DATA_FROM_DB'  
}

export interface NewRouteIncoming{
  type: 'NEW_ROUTE_INCOMING'
}

export type AppAction = 
AddRouteData 
| UpdateTraceRTData
| SetSnackbarMessage
| ClearSnackbarMessage
| OpenUploadDialog
| AppTitleSuffix
| UpdateNewItemId
| UpdateRoutes
| LoadRouteDataFromDb
| NewRouteIncoming
| Loading;
