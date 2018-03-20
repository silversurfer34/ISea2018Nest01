import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UploadRouteComponent } from './upload-route/upload-route.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';  

  constructor(
    private store: Store<any>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){
    this.store.select('app', 'message').map( msg => {
      if(msg){
        this.snackbar.open( msg, '', {duration: 1500}).afterDismissed().map( val => {          
          this.store.dispatch({
            type: 'CLEAR_SNACKBAR_MESSAGE'
          })
        }).subscribe();
      }
    }).subscribe();

    this.store.select('app', 'openUploadDialog').subscribe( val => { if(val){this.launchDialog()} });
  }

  launchDialog() {
    let dialogRef = this.dialog.open(UploadRouteComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch({
        type: 'OPEN_UPLOAD_DIALOG',
        payload: false
      });
    });
  }

  openUploadDialog(){
    this.store.dispatch({
      type: 'OPEN_UPLOAD_DIALOG',
      payload: true
    })
  }
}
