import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NDropModule } from 'NDrop';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
