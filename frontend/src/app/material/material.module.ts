import { NgModule } from '@angular/core';

import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule],
  exports: [MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule],
})

export class MaterialModule { }
