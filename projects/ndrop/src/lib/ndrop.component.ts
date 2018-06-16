import {
  Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {NdropItemComponent} from './ndrop-item/ndrop-item.component';
import {NdropFolderItemComponent} from './ndrop-item/ndrop-folder-item.component';
import {NdropFileItemComponent} from './ndrop-item/ndrop-file-item.component';

@Component({
  selector: 'N-NDrop',
  templateUrl: './ndrop.component.html',
  styleUrls: [
    'ngdrop.styles.css'
  ]
})
export class NDropComponent implements OnInit, OnChanges {

  @Input() folders: any[];
  @Input() files: any[];
  @Input() activeFolder: any;

  // Application can specify keys from their items models
  @Input() idField: string = 'uid';
  @Input() parentIdField: string = 'parent_uid';
  @Input() fileNameField: string = 'name';
  @Input() folderNameField: string = 'name';

  @Output() drop = new EventEmitter<{ items: any[], target: any }>();
  @Output() goToFolder = new EventEmitter<{ folder: any }>();
  @Output() goBack = new EventEmitter<{ currentFolder: any }>();

  public levelFolders: any[];
  public levelFiles: any[];
  public selectedItems: any[] = [];
  public hoveredFolder: any;

  private draggingElement: HTMLElement;
  private dragTarget: HTMLElement;
  private dragMoveCb: (event: MouseEvent) => void;
  private keyDownCb: (event: MouseEvent) => void;
  private keyUpCb: (event: MouseEvent) => void;
  private mouseDownCb: (event: MouseEvent) => void;
  private foldersComponents: NdropItemComponent[] = [];
  private filesComponents: NdropItemComponent[] = [];
  private ctrlBtnCode = NDropComponent.isMacintosh() ? 91 : 17;
  private ctrlBtnPressed: boolean = false;
  private cursorElements: Array<{ originalElement: HTMLElement, cloneElement: HTMLElement }> = [];

  public static isMacintosh() {
    return navigator.platform.indexOf('Mac') > -1;
  }

  constructor(private dragulaService: DragulaService) {
    this.dragMoveCb = this.onDragMove.bind(this);
    this.keyDownCb = this.onKeyDown.bind(this);
    this.keyUpCb = this.onKeyUp.bind(this);
    this.mouseDownCb = this.onMouseDown.bind(this);

    const dragOptions = {
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

    document.addEventListener('keydown', this.keyDownCb);
    document.addEventListener('keyup', this.keyUpCb);
    document.addEventListener('mouseup', this.mouseDownCb);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.folders || changes.files || changes.activeFolder) {
      this.selectItemsInLevel(this.activeFolder);
    }
  }

  public registerFolder(folder: NdropFolderItemComponent) {
    this.foldersComponents.push(folder);
  }

  public registerFile(file: NdropFileItemComponent) {
    this.filesComponents.push(file);
  }

  public unregisterFolder(folder: NdropFolderItemComponent) {
    this.foldersComponents.splice(this.foldersComponents.indexOf(folder), 1);
  }

  public unregisterFile(file: NdropFileItemComponent) {
    this.filesComponents.splice(this.filesComponents.indexOf(file), 1);
  }

  public itemSelection(item) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      if (this.ctrlBtnPressed) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems.splice(0, this.selectedItems.length, item);
      }
    } else if (this.selectedItems.length > 0) {
      this.selectedItems.splice(this.selectedItems.indexOf(index), 1);
    }
  }

  public goToItem(folder) {
    this.goToFolder.emit(folder);
  }

  public goBackBtnClicked() {
    this.goBack.emit(this.activeFolder);
  }

  private onKeyDown(event: MouseEvent) {
    if (event.which === this.ctrlBtnCode) {
      this.ctrlBtnPressed = true;
    }
  }

  private onKeyUp() {
    this.ctrlBtnPressed = false;
  }

  private onMouseDown() {
    this.selectedItems.splice(0, this.selectedItems.length);
  }

  private getDataFromElement(componentsList: NdropItemComponent[], element: HTMLElement) {
    for (let i = 0; i < componentsList.length; i++) {
      if (componentsList[i].elementRef.nativeElement === element) {
        return componentsList[i].data;
      }
    }
  }

  private selectItemsInLevel(activeFolder: any) {
    // parent id is 0 for the root files and folders
    const activeFolderId = activeFolder ? activeFolder[this.idField] : '0';
    this.levelFolders = this.folders.filter(folder => folder[this.parentIdField] === activeFolderId);
    this.levelFiles = this.files.filter(file => file[this.parentIdField] === activeFolderId);
  }

  // todo check why this method calls 2 times
  private onDragStart(value) {
    this.draggingElement = value[1];
    const draggingElementComponents = this.draggingElement.classList.contains('n-type-folder') ?
      this.foldersComponents : this.filesComponents;
    const draggedData = this.getDataFromElement(draggingElementComponents, this.draggingElement);
    if (this.selectedItems.indexOf(draggedData) === -1) {
      this.selectedItems.splice(0, this.selectedItems.length, draggedData);
    }
    this.createCursorClones();
    // We need to make drag move event as library does not provide one
    document.addEventListener('mousemove', this.dragMoveCb);
  }

  private onDragMove(event: MouseEvent) {
    const targetElements = document.elementsFromPoint(event.pageX, event.pageY);
    let dragTarget, element;
    for (let i = 0; i < targetElements.length; i++) {
      element = targetElements[i];
      if (element !== this.draggingElement &&
        element.classList.contains('n-type-folder') &&
        !element.classList.contains('gu-mirror')) {
        dragTarget = <HTMLElement>targetElements[i];
        break;
      }
    }

    if (dragTarget && dragTarget !== this.dragTarget) {
      this.dragTarget = dragTarget;
      this.hoveredFolder = this.getDataFromElement(this.foldersComponents, this.dragTarget);
    } else if (!dragTarget && this.dragTarget) {
      this.hoveredFolder = undefined;
      this.dragTarget = undefined;
    }
    this.attachCursorClonesToMouse(event.clientX, event.clientY);
  }

  private createCursorClones() {
    const selected = this.selectedItems.slice();
    const items = this.foldersComponents.concat(this.filesComponents);

    for (let i = 0; i < items.length; i++) {
      if (selected.indexOf(items[i].data) !== -1) {
        const cursorElement = items[i].elementRef.nativeElement.querySelector('.n-cursor-block');
        this.cursorElements.push({
          originalElement: cursorElement,
          cloneElement: cursorElement.cloneNode(true)
        });
        selected.splice(selected.indexOf(items[i].data), 1);
      }
      if (selected.length === 0) {
        break;
      }
    }

    this.cursorElements.forEach(e => {
      const rect: ClientRect = e.originalElement.getBoundingClientRect();
      const styles = {
        position: 'fixed',
        left: rect.left + 'px',
        top: rect.top + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        borderRadius: '6px',
        transition: '0.1s'
      };
      Object.assign(e.cloneElement.style, styles);
      document.body.appendChild(e.cloneElement);
    });
  }

  private attachCursorClonesToMouse(x: number, y: number) {
    this.cursorElements.forEach(e => {
      const styles = {
        left: x + 'px',
        top: y + 'px',
      };
      Object.assign(e.cloneElement.style, styles);
    });
  }

  private onDrop() {
    if (this.dragTarget) {
      this.drop.emit({
        items: this.selectedItems,
        target: this.getDataFromElement(this.foldersComponents, this.dragTarget)
      });
      this.dragTarget = undefined;
    }

    this.selectedItems.splice(0, this.selectedItems.length);
    this.draggingElement = undefined;
    this.hoveredFolder = undefined;
    document.removeEventListener('mousemove', this.dragMoveCb);
    this.removeCursorClones();
  }

  private removeCursorClones() {
    this.cursorElements.forEach(e => {
      document.body.removeChild(e.cloneElement);
    });
    this.cursorElements.splice(0, this.cursorElements.length);
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
