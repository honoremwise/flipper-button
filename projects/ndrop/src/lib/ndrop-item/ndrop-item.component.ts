import {Component, OnInit, OnChanges, OnDestroy, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {NDropComponent} from "../ndrop.component";

@Component({
  selector: 'n-drop-item',
  templateUrl: './ndrop-item.component.html',
  styleUrls: ['./ndrop-item.component.css']
})
export class NdropItemComponent implements OnInit, OnDestroy {

  @Input() type: string;
  @Input() fileNameField: string;
  @Input() data: any;
  @Input() active: boolean;
  @Input() hover: boolean;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() goToItem = new EventEmitter<any>();

  constructor(public elementRef: ElementRef, private parentDropZone: NDropComponent) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.classList.add("n-type-" + this.type);
    if (this.type === "folder") {
      this.parentDropZone.registerFolder(this);
    } else {
      this.parentDropZone.registerFile(this);
    }
  }

  ngOnDestroy() {
    if (this.type === "folder") {
      this.parentDropZone.unregisterFolder(this);
    } else {
      this.parentDropZone.unregisterFile(this);
    }
  }

  public select() {
    this.selectionChange.emit(this.data);
  }

  public itemDoubleClick() {
    if (this.type === "folder") {
      this.goToItem.emit(this.data);
    }
  }
}
