import { RouteDataFromDb } from "../datamodel/datamodel";


export interface LoadLqc {
  type: 'LOAD_LQC';
  payload: string;
}

export interface AddRouteData {
  type: 'ADD_ROUTE_DATA';
  payload: RouteDataFromDb;
}

export interface LqcLoadingFailed {
  type: 'LQC_LOADING_FAILED';
  payload: any;
}

export type AppAction = 
LoadLqc 
| AddRouteData 
| LqcLoadingFailed;
