import { App } from './app.interfaces';

export const AppInitialState: App = {
  displayedRoute: [],
  message: "",
  openUploadDialog: false,
  appSuffix: "",
  newItemId: -1,
  routesInfoFromDb: []
};
