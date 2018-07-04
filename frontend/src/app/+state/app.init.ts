import { App } from './app.interfaces';

export const AppInitialState: App = {
  displayedTrajectory: undefined,
  displayedTraceRT: undefined,
  message: "",
  openUploadDialog: false,
  appSuffix: "",
  newItemName: "",
  trajectoriesFromDb: [],
  loading: false
};
