import { RouteDataFromDb, RouteInfoFromDb } from "../datamodel/datamodel";

export interface App {
  displayedRoute: RouteDataFromDb[];
  message: string; 
  openUploadDialog: boolean;
  appSuffix: string;
  newItemId: number;
  routesInfoFromDb: RouteInfoFromDb[];
}

export interface AppState {
  readonly app: App;  
}
