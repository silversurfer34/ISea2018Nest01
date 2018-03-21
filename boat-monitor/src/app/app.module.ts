import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOh39h8mm8x3tsXOidh6weLnbZEC6gebU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
