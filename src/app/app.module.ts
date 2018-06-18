import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NDropModule} from 'NDrop';
import {ContextMenuModule} from 'ContextMenu';
import {ChipsModule} from 'Chips';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NDropModule,
        ContextMenuModule,
        ChipsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
