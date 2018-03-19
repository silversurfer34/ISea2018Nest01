import { NgModule } from '@angular/core';

import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule],
})

export class MaterialModule { }
