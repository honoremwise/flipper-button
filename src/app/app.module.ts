import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DropdemoComponent } from './dropdemo/dropdemo.component';
import { PharmacyPosDemoComponent } from './pharmacy-pos-demo/pharmacy-pos-demo.component';
import { NgxsModule, NgxsModuleOptions, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from 'projects/pharmacy-pos/src/lib/importables/auth/auth.module';
import { RouterModule } from "@angular/router";
import { PosModule } from 'projects/pharmacy-pos/src/lib/pos/pos.module';
// export const ngxsConfig: NgxsModuleOptions = {
//   developmentMode: !environment.production,
//   selectorOptions: {
//     suppressErrors: false, 
//     injectContainerState: false
//   },
//   compatibility: { 
//     strictContentSecurityPolicy: true
//   },
//   executionStrategy: NoopNgxsExecutionStrategy
// };
@NgModule({

  declarations: [
    AppComponent,
    DropdemoComponent,
    PharmacyPosDemoComponent
  ],
  imports: [
     HttpClientModule,
    BrowserModule,
     RouterModule,
     AppRoutingModule,
    // AuthModule,
    // PosModule,
    // NgxsModule.forRoot([], ngxsConfig),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
