import { RouteDataFromDb, RouteInfoFromDb, Point } from "../datamodel/datamodel";

export interface App {
  displayedRoute: RouteDataFromDb[];
  displayedTraceRT: Point[];
  message: string; 
  openUploadDialog: boolean;
  appSuffix: string;
  newItemId: number;
  routesInfoFromDb: RouteInfoFromDb[];
  loading: boolean;
}

export interface AppState {
  readonly app: App;  
}
