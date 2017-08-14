import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { FleetMapComponent } from './fleet-map/fleet-map.component';
import { AllFleetsComponent } from './all-fleets/all-fleets.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FleetMapComponent,
    AllFleetsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
