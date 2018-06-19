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
  ],
  viewProviders: [DragulaService]
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
  public disabledItems: any[] = [];
  public hoveredFolder: any;
  public dragOptions = {
    copy: true,
  };

  private draggingElement: HTMLElement;
  private dragTarget: HTMLElement;
  private dragMoveCb: (event: MouseEvent) => void;
  private keyDownCb: (event: MouseEvent) => void;
  private keyUpCb: (event: MouseEvent) => void;
  private mouseupCb: (event: MouseEvent) => void;
  private foldersComponents: NdropItemComponent[] = [];
  private filesComponents: NdropItemComponent[] = [];
  private ctrlBtnCode = NDropComponent.isMacintosh() ? 91 : 17;
  private ctrlBtnPressed: boolean = false;
  private cursorElements: Array<{ originalElement: HTMLElement, cloneElement: HTMLElement }> = [];
  private transitionEvent: string = NDropComponent.whichTransitionEvent();
  private returnCursoresAnimationTimer: any;

  public static isMacintosh() {
    return navigator.platform.indexOf('Mac') > -1;
  }

  public static whichTransitionEvent(): string {
    let t;
    const el = document.createElement('fakeelement');
    const transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }


  constructor(private dragulaService: DragulaService) {
    this.dragMoveCb = this.onDragMove.bind(this);
    this.keyDownCb = this.onKeyDown.bind(this);
    this.keyUpCb = this.onKeyUp.bind(this);
    this.mouseupCb = this.onMouseUp.bind(this);

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
    document.addEventListener('mouseup', this.mouseupCb);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.folders || changes.files || changes.activeFolder) {
      this.selectItemsInLevel(this.activeFolder);
      this.deselectItems();
      if (this.returnCursoresAnimationTimer) {
        clearTimeout(this.returnCursoresAnimationTimer);
        this.returnCursoresAnimationTimer = undefined;
        this.removeCursorClones();
        this.endDragProcess();
      }
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

  private onMouseUp() {
    if (!this.draggingElement) {
      this.deselectItems();
    }
  }

  private deselectItems() {
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

    this.disabledItems = this.selectedItems.slice();
    this.attachCursorClonesToMouse(event.clientX, event.clientY);
  }

  private createCursorClones() {
    const selected = this.selectedItems.slice();
    const items = this.foldersComponents.concat(this.filesComponents);

    for (let i = 0; i < items.length; i++) {
      if (selected.indexOf(items[i].data) !== -1) {
        const cursorElement = items[i].elementRef.nativeElement.querySelector('.n-cursor-block');
        const clone = cursorElement.cloneNode(true);
        clone.classList.add('n-name-active');
        this.cursorElements.push({
          originalElement: cursorElement,
          cloneElement: clone
        });
        selected.splice(selected.indexOf(items[i].data), 1);
      }
      if (selected.length === 0) {
        break;
      }
    }

    this.cursorElements.forEach((elements, index: number) => {
      const rect: ClientRect = elements.originalElement.getBoundingClientRect();
      // Set styles to new created nodes with transition for smooth animation to mouse
      const styles = {
        position: 'fixed',
        left: rect.left + 'px',
        top: rect.top + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        borderRadius: '6px',
        transformOrigin: 'left',
        border: '1px solid #e8eaed',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
        boxShadow: 'none'
      };

      // Set box shadow to the top element
      if (index === this.cursorElements.length - 1) {
        styles.boxShadow = '0px 0px 3px 1px rgba(0,0,0,.2)';
      }

      Object.assign(elements.cloneElement.style, styles);
      document.body.appendChild(elements.cloneElement);
    });
  }

  private attachCursorClonesToMouse(x: number, y: number) {
    this.cursorElements.forEach((elements, index: number) => {
      const styles: any = {
        transform: 'scale(0.8)',
      };
      // move last element a bit for styling
      if (this.cursorElements.length > 1 && index === 0) {
        styles.left = x - 3 + 'px';
        styles.top = y - 3 + 'px';
      } else {
        styles.left = x + 'px';
        styles.top = y + 'px';
      }

      // If transition is set and element is near the mouse we don't need transition any more
      if (elements.cloneElement.style.transition !== 'unset') {
        const elementCoordinates = elements.cloneElement.getBoundingClientRect();

        if (this.isElementInArea(x, y, elementCoordinates.left, elementCoordinates.top, 15)) {
          styles.transition = 'unset';
        }
      }

      Object.assign(elements.cloneElement.style, styles);
    });
  }

  private isElementInArea(areaX: number, areaY: number, elementX: number, elementY: number, areaSize: number = 0): boolean {
    const xLeftEdge = areaX - areaSize;
    const xRightEdge = areaX + areaSize;
    const yLeftEdge = areaY - areaSize;
    const yRightEdge = areaY + areaSize;
    return elementX >= xLeftEdge && elementX <= xRightEdge && elementY >= yLeftEdge && elementY <= yRightEdge;
  }

  private onDrop() {
    if (this.dragTarget) {
      this.drop.emit({
        items: this.selectedItems,
        target: this.getDataFromElement(this.foldersComponents, this.dragTarget)
      });
      this.dragTarget = undefined;
    }

    // We need to trigger this only if drop event was't applied, else we need to endDragProcess on data change
    this.returnCursoresAnimationTimer = setTimeout(() => {
      this.returnCursorClones().then(() => {
        this.endDragProcess();
      });
    });
  }

  private returnCursorClones(): Promise<void> {
    return new Promise(resolve => {
      this.cursorElements.forEach(elements => {
        const targetRect: ClientRect = elements.originalElement.getBoundingClientRect();
        // Set styles to new created nodes with transition for smooth animation to mouse
        const styles = {
          left: targetRect.left + 'px',
          top: targetRect.top + 'px',
          transform: 'scale(1)',
          boxShadow: 'none',
          transition: 'left 0.15s, top 0.15s'
        };

        // This is browser issue - sometimes browser triggers it's 'transitioend' callback before transition happening
        // so we can try to trigger animation one more time
        let retrigerTransition = false;

        const transitionCb = (event: TransitionEvent) => {

          if (this.areCursorElementReplaced(elements.cloneElement, elements.originalElement) || retrigerTransition) {
            event.srcElement.removeEventListener(this.transitionEvent, transitionCb);
            document.body.removeChild(event.srcElement);
            this.cursorElements.splice(this.cursorElements.indexOf(elements), 1);
            if (this.cursorElements.length === 0) {
              resolve();
            }
          } else {
            retrigerTransition = true;
            elements.cloneElement.style.top = styles.top;
            elements.cloneElement.style.left = styles.left;
          }
        };

        elements.cloneElement.addEventListener(this.transitionEvent, transitionCb, false);
        Object.assign(elements.cloneElement.style, styles);
      });
    });
  }

  private areCursorElementReplaced(element: HTMLElement, target: HTMLElement): boolean {
    const targetRect = target.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return this.isElementInArea(targetRect.left, targetRect.top, elementRect.left, elementRect.top);
  }

  private removeCursorClones() {
    this.cursorElements.forEach(e => {
      document.body.removeChild(e.cloneElement);
    });
    this.cursorElements.splice(0, this.cursorElements.length);
  }

  private endDragProcess() {
    this.draggingElement = undefined;
    this.hoveredFolder = undefined;
    this.disabledItems = [];
    this.cursorElements.forEach(elements => {
      document.body.removeChild(elements.cloneElement);
    });
    this.cursorElements.splice(0, this.cursorElements.length);
    document.removeEventListener('mousemove', this.dragMoveCb);
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
