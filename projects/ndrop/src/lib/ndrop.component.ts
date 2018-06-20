import {
  Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {NdropItemComponent} from './ndrop-item/ndrop-item.component';

@Component({
  selector: 'N-NDrop',
  templateUrl: './ndrop.component.html',
  styleUrls: [
    'ngdrop.styles.css'
  ],
  viewProviders: [DragulaService]
})
export class NDropComponent implements OnInit, OnChanges {

  public static FoldersCounterClass: string = 'n-folders-counter';
  public static TypeFolderClass: string = 'n-type-folder';
  public static TypeCursorClass: string = 'n-cursor-block';
  public static ItemNameActiveStateClass: string = 'n-name-active';

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
  private elementToDataReferenceMap: Map<HTMLElement, any> = new Map();
  private dataToElementReferenceMap: Map<any, HTMLElement> = new Map();
  private ctrlBtnCode = NDropComponent.isMacintosh() ? 91 : 17;
  private ctrlBtnPressed: boolean = false;
  private shiftBtnPressed: boolean = false;
  private cursorElements: Array<{ originalElement: HTMLElement, cloneElement: HTMLElement }> = [];
  private transitionEvent: string = NDropComponent.whichTransitionEvent();
  private returnCursorsAnimationTimer: any;
  private lastSelectedItem: any;

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
      if (this.returnCursorsAnimationTimer) {
        clearTimeout(this.returnCursorsAnimationTimer);
        this.returnCursorsAnimationTimer = undefined;
        this.removeCursorClones();
        this.endDragProcess();
      }
    }
  }

  public registerItemComponent(item: NdropItemComponent) {
    this.elementToDataReferenceMap.set(item.elementRef.nativeElement, item.data);
    this.dataToElementReferenceMap.set(item.data, item.elementRef.nativeElement);
  }

  public unregisterItemComponent(item: NdropItemComponent) {
    this.elementToDataReferenceMap.delete(item.elementRef.nativeElement);
    this.dataToElementReferenceMap.delete(item.data);
  }

  public itemSelection(item) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      if (this.ctrlBtnPressed) {
        // ctrl selection
        this.selectedItems.push(item);
        this.lastSelectedItem = item;
      } else if (this.shiftBtnPressed) {
        // shift selection
        const items = this.levelFolders.concat(this.levelFiles);
        const lastSelectedIndex = items.indexOf(this.lastSelectedItem);
        const selectedIndex = items.indexOf(item);
        if (lastSelectedIndex < selectedIndex) {
          this.selectedItems = items.slice(lastSelectedIndex, selectedIndex + 1);
        } else {
          this.selectedItems = items.slice(selectedIndex, lastSelectedIndex + 1);
        }
      } else {
        // simple selection
        this.selectedItems.splice(0, this.selectedItems.length, item);
        this.lastSelectedItem = item;
      }
    } else if (this.selectedItems.length > 0) {
      // deselection
      if (this.shiftBtnPressed) {
        this.selectedItems.splice(0, this.selectedItems.length);
        this.lastSelectedItem = undefined;
      } else if (this.ctrlBtnPressed) {
        this.selectedItems.splice(index, 1);
        if (item === this.lastSelectedItem) {
          this.lastSelectedItem = this.selectedItems[this.selectedItems.length - 1];
        }
      } else {
        this.selectedItems.splice(0, this.selectedItems.length, item);
        this.lastSelectedItem = item;
      }
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

    if (event.which === 16) {
      this.shiftBtnPressed = true;
    }
  }

  private onKeyUp() {
    this.ctrlBtnPressed = false;
    this.shiftBtnPressed = false;
  }

  private onMouseUp() {
    if (!this.draggingElement) {
      this.deselectItems();
    }
  }

  private deselectItems() {
    this.selectedItems.splice(0, this.selectedItems.length);
  }

  private getDataFromElement(element: HTMLElement) {
    return this.elementToDataReferenceMap.get(element);
  }

  private selectItemsInLevel(activeFolder: any) {
    // parent id is 0 for the root files and folders
    const activeFolderId = activeFolder ? activeFolder[this.idField] : '0';
    this.levelFolders = this.folders.filter(folder => folder[this.parentIdField] === activeFolderId);
    this.levelFiles = this.files.filter(file => file[this.parentIdField] === activeFolderId);
  }

  private onDragStart(value) {
    this.draggingElement = value[1];
    const draggedData = this.getDataFromElement(this.draggingElement);
    // if drag started from element that wasn't selected, select only that element then
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
        element.classList.contains(NDropComponent.TypeFolderClass) &&
        !element.classList.contains('gu-mirror')) {
        dragTarget = <HTMLElement>targetElements[i];
        break;
      }
    }

    if (dragTarget && dragTarget !== this.dragTarget) {
      this.dragTarget = dragTarget;
      const hoveredFolder = this.getDataFromElement(this.dragTarget);
      if (this.selectedItems.indexOf(hoveredFolder) === -1) {
        this.hoveredFolder = hoveredFolder;
      }
    } else if (!dragTarget && this.dragTarget) {
      this.hoveredFolder = undefined;
      this.dragTarget = undefined;
    }

    this.disabledItems = this.selectedItems.slice();
    this.attachCursorClonesToMouse(event.clientX, event.clientY);
  }

  private createCursorClones() {

    this.selectedItems.forEach((data, index) => {
      const selectedElement = this.dataToElementReferenceMap.get(data);
      const cursorElement = <HTMLElement>selectedElement.querySelector('.' + NDropComponent.TypeCursorClass);
      const cloneElement = <HTMLElement>cursorElement.cloneNode(true);
      cloneElement.classList.add(NDropComponent.ItemNameActiveStateClass);

      const rect: ClientRect = cursorElement.getBoundingClientRect();
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
      if (index === this.selectedItems.length - 1) {
        styles.boxShadow = '0px 0px 3px 1px rgba(0,0,0,.2)';

        // if there is multiple elements selected append folders counter
        if (this.selectedItems.length > 1) {
          const foldersCounter = this.createFolderCounter();
          cloneElement.appendChild(foldersCounter);
          setTimeout(() => {
            foldersCounter.style.opacity = '1';
          });
        }
      }

      Object.assign(cloneElement.style, styles);
      document.body.appendChild(cloneElement);

      this.cursorElements.push({
        originalElement: cursorElement,
        cloneElement: cloneElement
      });
    });
  }

  private createFolderCounter(): HTMLElement {
    const counter = document.createElement('SPAN');
    const styles = {
      position: 'absolute',
      right: '-14px',
      top: '-14px',
      background: '#d64228',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      display: 'flex',
      color: 'wheat',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px',
      opacity: '0',
      transition: '0.5s'
    };
    Object.assign(counter.style, styles);
    counter.classList.add(NDropComponent.FoldersCounterClass);
    counter.innerText = this.selectedItems.length + '';
    return counter;
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
      const targetData = this.getDataFromElement(this.dragTarget);
      if (this.selectedItems.indexOf(targetData) === -1) {
        this.drop.emit({
          items: this.selectedItems,
          target: targetData
        });
      }
      this.dragTarget = undefined;
    }

    // We need to trigger this only if drop event was't applied, else we need to endDragProcess on data change
    this.returnCursorsAnimationTimer = setTimeout(() => {
      this.returnCursorClones();
      this.endDragProcess();
    });
  }

  private returnCursorClones() {
    // fallback for situations when transitionCb is not triggered - browser issue;
    const timerId = setTimeout(() => {
      this.removeCursorClones();
    }, 500);
    this.cursorElements.forEach((elements, index) => {
      const targetRect: ClientRect = elements.originalElement.getBoundingClientRect();
      // Set styles to new created nodes with transition for smooth animation to mouse
      const styles = {
        left: targetRect.left + 'px',
        top: targetRect.top + 'px',
        transform: 'scale(1)',
        boxShadow: 'none',
        transition: 'left 0.15s, top 0.15s'
      };

      const transitionCb = (event: TransitionEvent) => {
        if (this.areCursorElementReplaced(elements.cloneElement, elements.originalElement)) {
          event.srcElement.removeEventListener(this.transitionEvent, transitionCb);
          document.body.removeChild(event.srcElement);
          this.cursorElements.splice(this.cursorElements.indexOf(elements), 1);
          if (this.cursorElements.length === 0) {
            clearTimeout(timerId);
          }
        }
      };
      elements.cloneElement.addEventListener(this.transitionEvent, transitionCb, false);
      Object.assign(elements.cloneElement.style, styles);

      // if there is multiple elements selected hide folders counter
      if (this.cursorElements.length > 1 && index === this.cursorElements.length - 1) {
        const foldersCounter = <HTMLElement>elements.cloneElement.querySelector('.' + NDropComponent.FoldersCounterClass);
        foldersCounter.style.display = 'none';
      }
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
