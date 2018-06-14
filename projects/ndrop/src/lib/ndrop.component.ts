import { Component, Input, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'N-NDrop',
  template: `
    <div>
      <div>
        Folders:
        <div class='n-items-container' [dragula]='"folders-bag"'>
          <n-drop-item *ngFor="let folder of folders" [item]="folder" [type]="'folder'" [fileNameField]="fileNameField"></n-drop-item>
        </div>
      </div>
      <div>
        Files:
        <div class='n-items-container' [dragula]='"files-bag"'>
          <n-drop-item *ngFor="let file of files" [item]="file" [type]="'file'" [fileNameField]="fileNameField"></n-drop-item>
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
  private dragTarget: HTMLElement;
  private dragMoveCb: (event: MouseEvent) => void;

  constructor(private dragulaService: DragulaService) {
    this.dragMoveCb = this.onDragMove.bind(this);

    let dragOptions = {
      copy: true,
    };

    dragulaService.setOptions('folders-bag', dragOptions);
    dragulaService.setOptions('files-bag', dragOptions);

    dragulaService.drag.subscribe((value) => {
      // console.log(`drag:`, value);
      this.onDragStart(value);
    });
    dragulaService.drop.subscribe((value) => {
      // console.log(`drop: `, value);
      this.onDrop();
    });
    dragulaService.over.subscribe((value) => {
      // console.log(`over: `, value);
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

  private onDragStart(value) {
    this.draggingElement = value[1];
    //We need to make drag move event as library does not provide one
    document.addEventListener("mousemove", this.dragMoveCb);
  }

  private onDragMove(event: MouseEvent) {
    let targetElements = document.elementsFromPoint(event.pageX, event.pageY);
    let dragTarget, element;
    for(let i = 0; i < targetElements.length; i++){
      element = targetElements[i];
      if(element !== this.draggingElement &&
        element.tagName === "N-DROP-ITEM" &&
        element.classList.contains("n-type-folder") &&
        !element.classList.contains("gu-mirror")){
        dragTarget = <HTMLElement>targetElements[i];
        break;
      }
    }

    if(dragTarget && dragTarget !== this.dragTarget){
      this.dragTarget = dragTarget;
      console.log("hover target");
    }else if(!dragTarget && this.dragTarget){
      console.log("unhover target");
      this.dragTarget = undefined;
    }
  }

  private onDrop() {
    if(this.dragTarget){
      console.log("draggingElement", this.draggingElement);
      console.log("dragTarget", this.dragTarget);
      this.dragTarget = undefined;
    }


    this.draggingElement = undefined;
    document.removeEventListener("mousemove", this.dragMoveCb);
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
