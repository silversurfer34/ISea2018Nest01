import { RouteDataFromDb } from "../datamodel/datamodel";

export interface App {
  displayedRoute: RouteDataFromDb[]
  
}

export interface AppState {
  readonly app: App;  
}
