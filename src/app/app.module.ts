import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NDropModule} from 'NDrop';
import {NChipsModule} from "NChips";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NDropModule,
        NChipsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
