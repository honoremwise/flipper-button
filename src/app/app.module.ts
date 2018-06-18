import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NDropModule} from 'NDrop';
import {ContextMenuModule} from 'ContextMenu';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NDropModule,
        ContextMenuModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
