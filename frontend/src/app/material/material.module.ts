import { NgModule } from '@angular/core';

import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatChipsModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule],
})

export class MaterialModule { }
