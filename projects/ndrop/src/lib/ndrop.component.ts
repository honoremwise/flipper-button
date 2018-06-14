import { Component, Input, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'N-NDrop',
  template: `
    <div>
      <div>
        Folders:
        <div class='container' [dragula]='"folders-bag"'>
          <div class="n-item n-folder-item" *ngFor='let folder of folders'>{{folder[folderNameField]}}</div>
        </div>
      </div>
      <div>
        Files:
        <div class='container' [dragula]='"files-bag"'>
          <div class="n-item n-file-item" *ngFor='let file of files'>
            <div class="n-file-preview"></div>
            <div class="n-file-name">{{file[fileNameField]}}</div>
          </div>
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

  private draggingElement: HTMLElement;
  private dragMoveCb: (event: MouseEvent) => void;

  constructor(private dragulaService: DragulaService) {

    this.dragMoveCb = this.onDragMove.bind(this);

    dragulaService.setOptions('folders-bag', {
      copy: true,
    });
    dragulaService.drag.subscribe((value) => {
      console.log(`drag:`, value);
      this.draggingElement = value[1];
      //We need to make drag move event as library does not provide one
      document.addEventListener("mousemove", this.dragMoveCb);
      this.onDragStart(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: `, value);
      this.draggingElement = undefined;
      document.removeEventListener("mousemove", this.dragMoveCb);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: `, value);
      this.onOver(value.slice(1));
    });
    // dragulaService.out.subscribe((value) => {
    //   console.log(`out: ${value[0]}`);
    //   this.onOut(value.slice(1));
    // });
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

  private onDragStart(args) {
    let [e, el] = args;
    // do something
  }

  private onDragMove(event: MouseEvent) {
    let targetElements = document.elementsFromPoint(event.pageX, event.pageY);
    let targetElement;
    for(let i = 0; i < targetElements.length; i++){
      if(targetElements[i].classList.contains("n-item") && !targetElements[i].classList.contains("gu-mirror")){
        targetElement = targetElements[i];
        break;
      }
    }

    console.log("targetElement", targetElement);
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
