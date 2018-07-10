import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NDropModule} from 'NDrop';
import {NChipsModule} from "NChips";
import {NUploadModule} from 'NUpload';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { LoadersDirective } from './loaders.directive';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
    declarations: [
        AppComponent,
        ChildComponent,
        LoadersDirective,
        
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        NDropModule,
        NChipsModule,
        HttpModule,
        FormsModule,
        InfiniteScrollModule,
        NUploadModule
    ],
    // {provide: BrowserXhr, useClass:CustExtBrowserXhr}
    
    providers: [],

    bootstrap: [AppComponent]
})
export class AppModule {
}
