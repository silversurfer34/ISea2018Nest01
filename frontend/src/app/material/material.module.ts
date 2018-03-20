import { NgModule } from '@angular/core';

import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatChipsModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  exports: [MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
})

export class MaterialModule { }
