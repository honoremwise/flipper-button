import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NDropModule} from 'NDrop';
import {NChipsModule} from "NChips";
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { LoadersDirective } from './loaders.directive';

import {CustExtBrowserXhr} from './cust-ext-browser-xhr';
@NgModule({
    declarations: [
        AppComponent,
        ChildComponent,
        LoadersDirective
    ],
    imports: [
        BrowserModule,
        NDropModule,
        NChipsModule,
        HttpModule,
        FormsModule
    ],
    // {provide: BrowserXhr, useClass:CustExtBrowserXhr}
    
    providers: [],

    bootstrap: [AppComponent]
})
export class AppModule {
}
