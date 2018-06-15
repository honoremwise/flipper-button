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

  public select() {
    this.selectionChange.emit(this.data);
  }

  ngOnInit() {
    this.elementRef.nativeElement.classList.add('n-type-folder');
    this.parentDropZone.registerFolder(this);
  }

  ngOnDestroy() {
    this.parentDropZone.unregisterFolder(this);
  }

  public itemDoubleClick() {
    this.goToItem.emit(this.data);
  }
}
