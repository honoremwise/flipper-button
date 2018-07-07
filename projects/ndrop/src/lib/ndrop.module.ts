import {NgModule} from '@angular/core';
import {NDropComponent} from './ndrop.component';
import {NdropFileItemComponent} from './ndrop-item/ndrop-file-item.component';
import {NdropFolderItemComponent} from './ndrop-item/ndrop-folder-item.component';
import {NdropItemComponent} from './ndrop-item/ndrop-item.component';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
// import {SafePipe} from './pipes/safe.pipe';

@NgModule({
    imports: [
        HttpClientModule,
        DragulaModule,
        BrowserModule,
        InfiniteScrollModule
    ],
    declarations: [
        
        NDropComponent,
        NdropFileItemComponent,
        NdropFolderItemComponent,
        NdropItemComponent,
        
        // SafePipe
    ],
    providers:[],
    exports: [NDropComponent]
})
export class NDropModule {
}
