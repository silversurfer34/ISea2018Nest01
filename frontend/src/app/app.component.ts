import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';  

  constructor(
    private store: Store<any>,
    private snackbar: MatSnackBar
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
  }
}
