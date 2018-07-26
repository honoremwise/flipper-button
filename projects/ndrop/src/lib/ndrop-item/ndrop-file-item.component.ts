import {Component, OnInit, OnDestroy} from '@angular/core';
import {NdropItemComponent} from './ndrop-item.component';
import {FileType} from './class/File-type';
@Component({
  selector: 'n-drop-file-item',
  templateUrl: './ndrop-file-item.component.html',
  styleUrls: ['./ndrop-item.component.css']
})
export class NdropFileItemComponent extends NdropItemComponent implements OnInit, OnDestroy {
  file_type: FileType;
  ngOnInit() {
    super.ngOnInit();
    this.elementRef.nativeElement.classList.add('n-type-file');
  }
  getMimeIcon(file) {
    this.file_type = new FileType;
    return this.file_type.getMimeClass(file);
}
}
