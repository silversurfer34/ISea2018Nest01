import { RouteDataFromDb } from "../datamodel/datamodel";

export interface App {
  displayedRoute: RouteDataFromDb[];
  message: string; 
  openUploadDialog: boolean;
}

export interface AppState {
  readonly app: App;  
}
