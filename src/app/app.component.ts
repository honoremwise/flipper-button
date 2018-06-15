import { Component } from '@angular/core';
import { DragAndDropDataService } from "./drag-and-drop-data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dragFolders: any[];
  public dragFiles: any[];
  public activeFolder: any;

  constructor(dragAndDropDataService: DragAndDropDataService){
    this.dragFolders = dragAndDropDataService.getFolders().splice(0, 10);
    this.dragFiles = dragAndDropDataService.getFiles().splice(0, 20);

    //Set root folder
    this.activeFolder = undefined;
  }

  public onDrop($event){
    $event.items.forEach(item => {
      item.parent_uid = $event.target.uid;
    });

    this.dragFolders = this.dragFolders.slice();
    this.dragFiles = this.dragFiles.slice();
  }

  public goToFolder(folder){
    this.activeFolder = folder;
  }
}
