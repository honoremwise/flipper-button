import { NgModule } from '@angular/core';
import { NDropComponent } from './ndrop.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  imports: [
    DragulaModule
  ],
  declarations: [NDropComponent],
  exports: [NDropComponent]
})
export class NDropModule { }
