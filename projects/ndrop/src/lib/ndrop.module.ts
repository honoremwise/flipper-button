import { NgModule } from '@angular/core';
import { NDropComponent } from './ndrop.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    DragulaModule,
    BrowserModule
  ],
  declarations: [NDropComponent],
  exports: [NDropComponent]
})
export class NDropModule { }
