import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UploadRouteComponent } from './upload-route/upload-route.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';  
  private appSuffix$: Observable<string>;
  constructor(
    private store: Store<any>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
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
    this.appSuffix$ = this.store.select('app', 'appSuffix');
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

  goHome(){
    this.store.dispatch({
      type: 'APP_TITLE_SUFFIX',
      payload: 'Home'
    });
    this.router.navigateByUrl('/');
  }
}
