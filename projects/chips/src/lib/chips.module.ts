import { NgModule } from '@angular/core';
import { ChipsComponent } from './chips.component';
import {MatChipsModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [
      MatChipsModule,
      MatListModule
  ],
  declarations: [ChipsComponent],
  exports: [ChipsComponent]
})
export class ChipsModule { }
