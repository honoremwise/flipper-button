import {Component, OnInit, OnDestroy} from '@angular/core';
import {NdropItemComponent} from './ndrop-item.component';

@Component({
  selector: 'n-drop-file-item',
  templateUrl: './ndrop-file-item.component.html',
  styleUrls: ['./ndrop-item.component.css']
})
export class NdropFileItemComponent extends NdropItemComponent implements OnInit, OnDestroy {

  ngOnInit() {
    super.ngOnInit();
    this.elementRef.nativeElement.classList.add('n-type-file');
  }
}
