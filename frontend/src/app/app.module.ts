import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { BackendService } from './backend/backend.service';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './+state/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './+state/app.effects';
import { AppInitialState } from './+state/app.init';
import { UploadRouteComponent } from './upload-route/upload-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { StyledMapDirective } from './map/styled-map.directive';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadRouteComponent,
    MapComponent,
    StyledMapDirective,
    ProgressBarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    StoreModule.forRoot({app: AppReducer}, {initialState: {app: AppInitialState} }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBU2GjyIqw3fTy7e8cGV0O9zPOAnh4-XFk'
    })
  ],
  providers: [BackendService],
  entryComponents: [UploadRouteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
