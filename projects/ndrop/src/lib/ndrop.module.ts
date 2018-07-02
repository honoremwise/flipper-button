import {NgModule} from '@angular/core';
import {NDropComponent} from './ndrop.component';
import {NdropFileItemComponent} from './ndrop-item/ndrop-file-item.component';
import {NdropFolderItemComponent} from './ndrop-item/ndrop-folder-item.component';
import {NdropItemComponent} from './ndrop-item/ndrop-item.component';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';
import {BrowserModule} from '@angular/platform-browser';
// import {SafePipe} from './pipes/safe.pipe';

@NgModule({
    imports: [
        DragulaModule,
        BrowserModule
    ],
    declarations: [
        NDropComponent,
        NdropFileItemComponent,
        NdropFolderItemComponent,
        NdropItemComponent,
        // SafePipe
    ],
    exports: [NDropComponent]
})
export class NDropModule {
}
