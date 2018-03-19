import { NgModule } from '@angular/core';

import {MatButtonModule, MatToolbarModule, MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatSidenavModule],
  exports: [MatButtonModule, MatToolbarModule, MatSidenavModule],
})

export class MaterialModule { }
