import { NgModule } from '@angular/core';
import { NSelectFilesDirective } from './nselect-files.directive';
import { HttpClientModule } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';
import { BrowserModule } from '@angular/platform-browser';
import { FileDropDirective } from './file-drop.directive';


@NgModule({
  imports: [
    HttpClientModule,
    DragulaModule,
    BrowserModule
  ],
  declarations: [NSelectFilesDirective, FileDropDirective],
  exports: [NSelectFilesDirective, FileDropDirective]
})
export class NUploadModule { }
