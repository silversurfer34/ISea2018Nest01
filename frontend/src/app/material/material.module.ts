import { NgModule } from '@angular/core';

import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule} from '@angular/material';

@NgModule({
  imports: [MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  exports: [MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
})

export class MaterialModule { }
