import { NgModule } from '@angular/core';

import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatChipsModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';

@NgModule({
  imports: [MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule],
})

export class MaterialModule { }
