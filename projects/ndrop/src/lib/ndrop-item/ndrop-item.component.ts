import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'n-drop-item',
  templateUrl: './ndrop-item.component.html',
  styleUrls: ['./ndrop-item.component.css']
})
export class NdropItemComponent implements OnInit {

  @Input() type: string;
  @Input() fileNameField: string;
  @Input() item: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.classList.add("n-type-" + this.type)
  }

}
