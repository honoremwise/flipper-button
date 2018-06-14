import { Component, Input, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'N-NDrop',
  template: `
    <div>
      <div class='wrapper'>
        <div class='container' [dragula]='"folders-bag"'>
          <div *ngFor='let folder of folders'>{{folder[folderNameField]}}</div>
        </div>
        <div class='container' [dragula]='"files-bag"'>
          <div *ngFor='let file of files'>{{file[fileNameField]}}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    'ngdrop.styles.css'
  ]
})
export class NDropComponent implements OnInit {

  @Input() folders: any[];
  @Input() files: any[];
  @Input() activeFolder: any;

  //Application can specify keys from their items models
  @Input() idField: string = "uid";
  @Input() parentIdField: string = "parent_uid";
  @Input() fileNameField: string = "name";
  @Input() folderNameField: string = "name";

  public levelFolders: any[];
  public levelFiles: any[];

  constructor(private dragulaService: DragulaService) {

    // dragulaService.setOptions('folders-bag', {
    //   copy: true,
    // });
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
    this.selectItems(this.activeFolder);

  }

  private selectItems(activeFolder: any) {
    //parent id is 0 for the root files and folders
    let activeFolderId = activeFolder ? activeFolder[this.idField] : "0";
    this.levelFolders = this.folders.filter(folder => folder[this.parentIdField] === activeFolderId);
    this.levelFiles = this.files.filter(file => file[this.parentIdField] === activeFolderId);
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }

  private onDrop(args) {
    let [e, el] = args;
    // do something
  }

  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }
}
