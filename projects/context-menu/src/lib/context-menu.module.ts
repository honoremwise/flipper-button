import { NgModule } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import {MatCardModule, MatIconModule, MatMenuModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule
  ],
  declarations: [ContextMenuComponent],
  exports: [ContextMenuComponent]
})
export class ContextMenuModule { }
