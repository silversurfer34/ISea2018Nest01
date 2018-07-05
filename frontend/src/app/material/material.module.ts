import { NgModule } from '@angular/core';

import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatChipsModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressBarModule, MatProgressSpinnerModule, MatMenu, MatMenuModule} from '@angular/material';

@NgModule({
  imports: [MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule,MatMenuModule],
  exports: [MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatChipsModule, MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule,MatMenuModule],
})

export class MaterialModule { }
