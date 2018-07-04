import { App } from './app.interfaces';

export const AppInitialState: App = {
  trajectoryName: "",
  message: "",
  openUploadDialog: false,
  appSuffix: "",
  newItemName: "",
  trajectoriesFromDb: [],
  loading: false
};
