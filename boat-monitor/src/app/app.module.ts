import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';

import { PositionService } from './services/position.service';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { BoatMapComponent } from './boat-map/boat-map.component';



@NgModule({
  declarations: [
    AppComponent,
    BoatMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOh39h8mm8x3tsXOidh6weLnbZEC6gebU'
    })
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
