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
    this.dragFolders = dragAndDropDataService.getFolders();
    this.dragFiles = dragAndDropDataService.getFiles();

    //Set root folder
    this.activeFolder = undefined;
  }
}
