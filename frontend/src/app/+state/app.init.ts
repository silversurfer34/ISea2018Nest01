import { App } from './app.interfaces';

export const AppInitialState: App = {
  displayedRoute: [],
  displayedTraceRT: undefined,
  message: "",
  openUploadDialog: false,
  appSuffix: "",
  newItemId: -1,
  routesInfoFromDb: [],
  loading: false
};
