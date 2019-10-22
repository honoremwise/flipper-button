import { NgModule } from '@angular/core';
import { PharmacyPosComponent } from './pharmacy-pos.component';
import { PosModule } from './pos/pos.module';




@NgModule({
  declarations: [PharmacyPosComponent],
  imports: [
      // PosModule.forRoot(),

  ],
  exports: [PharmacyPosComponent]
})
export class PharmacyPosModule { }
