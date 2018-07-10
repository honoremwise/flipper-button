import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileDropDirective } from './file-drop.directive';
import { NSelectFilesDirective } from './nselect-files.directive';


@NgModule({
  imports: [ CommonModule ],
  declarations: [ FileDropDirective, NSelectFilesDirective ],
  exports: [ FileDropDirective, NSelectFilesDirective ]
})
export class FileUploadModule {
}
