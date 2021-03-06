import { BoatTrajectoriesFromDb, Point } from "../datamodel/datamodel";

export interface App {
  trajectoryName: string;
  message: string; 
  openUploadDialog: boolean;
  appSuffix: string;
  newItemName: string;
  trajectoriesFromDb: BoatTrajectoriesFromDb[];
  loading: boolean;
}

export interface AppState {
  readonly app: App;  
}
