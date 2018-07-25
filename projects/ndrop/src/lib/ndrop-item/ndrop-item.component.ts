import {OnInit, OnDestroy, Input, ElementRef, Output, EventEmitter, Component} from '@angular/core';
import {NDropComponent} from '../ndrop.component';

@Component({
  selector: 'n-drop-item',
  template: '',
  styleUrls: ['./ndrop-item.component.css']
})
export class NdropItemComponent implements OnInit, OnDestroy {

  @Input() fileNameField: string;
  @Input() data: any;
  @Input() active: boolean;
  @Input() disabled: boolean;
  @Output() selectionChange = new EventEmitter<any>();

  constructor(public elementRef: ElementRef, protected parentDropZone: NDropComponent) {
  }

  ngOnInit() {
    this.parentDropZone.registerItemComponent(this);
  }

  ngOnDestroy() {
    this.parentDropZone.unregisterItemComponent(this);
  }

  public select() {
    this.selectionChange.emit(this.data);
  }
}
