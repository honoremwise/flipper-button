import { NgModule } from '@angular/core';
import { NDropComponent } from './ndrop.component';
import { NdropItemComponent } from './ndrop-item/ndrop-item.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    DragulaModule,
    BrowserModule
  ],
  declarations: [NDropComponent, NdropItemComponent],
  exports: [NDropComponent, NdropItemComponent]
})
export class NDropModule { }
