import { NgModule } from '@angular/core';
import { NChipsComponent } from './nchips.component';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatChipsModule, MatListModule} from "@angular/material";


@NgModule({
  imports: [
      MatChipsModule,
      MatListModule,
      MatButtonModule,
      CommonModule
  ],
  declarations: [NChipsComponent],
  exports: [NChipsComponent]
})
export class NChipsModule { }
