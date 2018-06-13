import { Injectable } from '@angular/core';
import folders from '../mock-data/folders.js';
import files from '../mock-data/files.js';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropDataService {

  constructor() {}

  public getFolders(): any[] {
    return folders;
  }

  public getFiles(): any[] {
    return files;
  }
}
