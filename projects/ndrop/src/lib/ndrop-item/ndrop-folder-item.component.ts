import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {NdropItemComponent} from './ndrop-item.component';

@Component({
  selector: 'n-drop-folder-item',
  templateUrl: './ndrop-folder-item.component.html',
  styleUrls: ['./ndrop-item.component.css']
})
export class NdropFolderItemComponent extends NdropItemComponent implements OnInit, OnDestroy {
  @Output() goToItem = new EventEmitter<any>();
  @Input() hover: boolean;

  ngOnInit() {
    super.ngOnInit();
    this.elementRef.nativeElement.classList.add('n-type-folder');
  }

  public itemDoubleClick() {
    this.goToItem.emit(this.data);
  }
}
