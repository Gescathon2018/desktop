import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlinkAdminComponent } from './blink-admin/blink-admin.component';
import {NgxElectronModule} from 'ngx-electron';


@NgModule({
  declarations: [
    AppComponent,
    BlinkAdminComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    ClarityModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
