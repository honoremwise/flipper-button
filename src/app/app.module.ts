import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FlipperButtonModule} from 'flipper-button';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
   
    FlipperButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
