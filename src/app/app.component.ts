import {Component} from '@angular/core';
import {DragAndDropDataService} from './drag-and-drop-data.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public dragFolders: any[];
    public dragFiles: any[];
    public activeFolder: any;
    public doc: Document;
    public bound: HTMLElement;
    public activeFile: any;
    show_context: boolean = false;
    context_menu_bounds: HTMLElement | null;

    constructor(dragAndDropDataService: DragAndDropDataService) {
        this.dragFolders = dragAndDropDataService.getFolders().splice(0, 10);
        this.dragFiles = dragAndDropDataService.getFiles().splice(0, 20);
        this.doc = document;
        // Set root folder
        this.activeFolder = undefined;
    }

    public onDrop($event) {
        $event.items.forEach(item => {
            item.parent_uid = $event.target.uid;
        });

        this.dragFolders = this.dragFolders.slice();
        this.dragFiles = this.dragFiles.slice();
    }

    public goToFolder(folder) {
        this.activeFolder = folder;
    }

    public goBack(activeFolder) {
        if (activeFolder.parent_uid === '0') {
            this.activeFolder = undefined;
        } else {
            this.activeFolder = this.dragFolders.find(folder => folder.uid === activeFolder.parent_uid);
        }
    }

    attachContext($event) {
        this.context_menu_bounds = document.getElementById('container');
        this.show_context = !this.show_context;
        this.activeFile = $event.file;
        console.log($event.event);

        console.log('verification', window.innerWidth - 24);
        console.log($event.bound.width);
    }
}
