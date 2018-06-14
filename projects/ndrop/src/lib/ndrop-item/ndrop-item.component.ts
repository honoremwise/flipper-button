import { Component, OnInit, OnChanges, Input, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'n-drop-item',
  templateUrl: './ndrop-item.component.html',
  styleUrls: ['./ndrop-item.component.css']
})
export class NdropItemComponent implements OnInit, OnChanges {

  @Input() type: string;
  @Input() fileNameField: string;
  @Input() item: string;
  @Input() active: boolean;
  @Input() hover: boolean;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() goToItem = new EventEmitter<any>();

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.classList.add("n-type-" + this.type);
  }

  ngOnChanges() {
  }

  public select(){
    this.selectionChange.emit(this.item);
  }

  public itemDoubleClick(){
    if(this.type === "folder"){
      this.goToItem.emit(this.item);
    }
  }
}
