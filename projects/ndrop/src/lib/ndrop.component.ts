import { Component, Input, OnInit, Output, EventEmitter, QueryList,
         ViewChildren, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NdropItemComponent } from './ndrop-item/ndrop-item.component';

@Component({
  selector: 'N-NDrop',
  template: `
    <div>
      <div>
        Folders:
        <div class='n-items-container' [dragula]='"folders-bag"'>
          <n-drop-item *ngFor="let folder of levelFolders" 
                       [item]="folder" [type]="'folder'" 
                       [fileNameField]="fileNameField"
                       [active]="selectedItems.indexOf(folder) !== -1"
                       [hover]="hoveredFolder === folder"
                       (selectionChange)="itemSelection($event)"
                       (goToItem)="goToItem($event)"
          ></n-drop-item>
        </div>
      </div>
      <div>
        Files:
        <div class='n-items-container' [dragula]='"files-bag"'>
          <n-drop-item *ngFor="let file of levelFiles"
                       [item]="file" 
                       [type]="'file'" 
                       [fileNameField]="fileNameField"
                       [active]="selectedItems.indexOf(file) !== -1"
                       (selectionChange)="itemSelection($event)"
          ></n-drop-item>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    'ngdrop.styles.css'
  ]
})
export class NDropComponent implements OnInit, AfterViewChecked, OnChanges {

  @ViewChildren(NdropItemComponent) dragItems: QueryList<NdropItemComponent>;

  @Input() folders: any[];
  @Input() files: any[];
  @Input() activeFolder: any;

  //Application can specify keys from their items models
  @Input() idField: string = "uid";
  @Input() parentIdField: string = "parent_uid";
  @Input() fileNameField: string = "name";
  @Input() folderNameField: string = "name";

  @Output() drop = new EventEmitter<{ items: any[], target: any }>();
  @Output() goToFolder = new EventEmitter<{ folder: any }>();

  public levelFolders: any[];
  public levelFiles: any[];
  public selectedItems: any[] = [];
  public hoveredFolder: any;

  private draggingElement: HTMLElement;
  private dragTarget: HTMLElement;
  private dragMoveCb: (event: MouseEvent) => void;
  private foldersComponents: NdropItemComponent[];

  constructor(private dragulaService: DragulaService) {
    this.dragMoveCb = this.onDragMove.bind(this);

    let dragOptions = {
      copy: true,
    };

    dragulaService.setOptions('folders-bag', dragOptions);
    dragulaService.setOptions('files-bag', dragOptions);

    dragulaService.drag.subscribe((value) => {
      this.onDragStart(value);
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop();
    });
    // dragulaService.over.subscribe((value) => {
    //   this.onOver(value.slice(1));
    // });
    // dragulaService.out.subscribe((value) => {
    //   console.log(`out: ${value[0]}`);
    //   this.onOut(value.slice(1));
    // });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.folders || changes.files || changes.activeFolder){
      this.selectItems(this.activeFolder);
    }
  }

  ngAfterViewChecked() {
    this.foldersComponents = this.dragItems.filter(item => item.type === "folder");
  }

  private getFolderFromTargetElement(targetElement: HTMLElement){
    for(let i = 0; i < this.foldersComponents.length; i++){
      if(this.foldersComponents[i].elementRef.nativeElement === targetElement){
        return this.foldersComponents[i].item;
      }
    }
  }

  public itemSelection(item){
    let index = this.selectedItems.indexOf(item);
    if(index === -1){
      this.selectedItems.splice(0, this.selectedItems.length, item);
    }else if(this.selectedItems.length > 0){
      this.selectedItems.splice(index, 1);
    }
  }

  public goToItem(folder){
    this.goToFolder.emit(folder);
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
      this.hoveredFolder = this.getFolderFromTargetElement(this.dragTarget);
    }else if(!dragTarget && this.dragTarget){
      this.hoveredFolder = undefined;
      this.dragTarget = undefined;
    }
  }

  private onDrop() {
    if(this.dragTarget){
      this.drop.emit({items: this.selectedItems, target: this.getFolderFromTargetElement(this.dragTarget)});
      this.dragTarget = undefined;
    }

    this.selectedItems = [];
    this.draggingElement = undefined;
    this.hoveredFolder = undefined;
    document.removeEventListener("mousemove", this.dragMoveCb);
  }

  // private onOver(args) {
  //   let [e, el, container] = args;
  //   // do something
  // }
  //
  // private onOut(args) {
  //   let [e, el, container] = args;
  //   // do something
  // }
}
