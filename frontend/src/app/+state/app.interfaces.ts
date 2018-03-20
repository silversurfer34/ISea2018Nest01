import { RouteDataFromDb } from "../datamodel/datamodel";

export interface App {
  displayedRoute: RouteDataFromDb[];
  message: string;  
}

export interface AppState {
  readonly app: App;  
}
