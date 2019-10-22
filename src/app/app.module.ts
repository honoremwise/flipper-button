import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PosModule } from 'projects/pharmacy-pos/src/lib/pos/pos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
