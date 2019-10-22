import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PharmacyPosModule } from 'pharmacy-pos';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
    PharmacyPosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
