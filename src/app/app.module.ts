import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DropdemoComponent } from './dropdemo/dropdemo.component';
import { PharmacyPosModule } from 'pharmacy-pos';
import { PharmacyPosDemoComponent } from './pharmacy-pos-demo/pharmacy-pos-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdemoComponent,
    PharmacyPosDemoComponent
  ],
  imports: [
    BrowserModule,
    PharmacyPosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
