import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NFile} from './contracts/NFile';
import {PFile} from './contracts/PFile';

@Component({
  selector: 'A-NChips',
  template:  `
      <mat-chip-list class="button-position w-100" style="margin-top: -10px"
                     *ngIf="selectedFile.isSelected && selectedFile.is_inbin == false">
          <mat-chip color="primary" class="text-center tip_menu_bar">
              <button class="btn  btn-sm btn-circle file_bt_non_top_right border-extra" matTooltip="Open">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">open_in_new</i>
              </button> &nbsp;
              <button (click)="removeStar(selectedFile)"
                      *ngIf="selectedFile.is_starred && selectedFile.is_inbin==false"
                      matTooltip="Remove start..." class="btn  btn-sm btn-circle file_bt_non_top_right border-extra">
                  <i class="material-icons"
                     style="text-align:center;margin-left:3px;margin-top:3px;color:#ffd700;">star</i>
              </button> &nbsp;
              <button (click)="addStar(selectedFile)"
                      *ngIf="selectedFile && !selectedFile.is_starred && selectedFile.is_inbin==false"
                      matTooltip="Add start..." class="btn  btn-sm btn-circle file_bt_non_top_right border-extra">
                  <i class="material-icons"
                     style="text-align:center;margin-left:3px;margin-top:3px;color:#fff;">star</i>
              </button> &nbsp;
              <button *ngIf="selectedFile && selectedFile.kind=='Folder' && selectedFile.is_hosted==0 && selectedFile.is_inbin==false"
                      (click)="hosting(selectedFile)" class="btn  btn-sm btn-circle file_bt_non_top_right border-extra"
                      matTooltip="Hosting ">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">public</i>
              </button> &nbsp;
              <button (click)="addToBin(selectedFile)"
                      *ngIf="selectedFile && selectedFile.file_access!='Read' && selectedFile.is_inbin==false"
                      class="btn  btn-circle file_bt_non_top_right border-extra" matTooltip="Delete ">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">delete</i>
              </button> &nbsp;&nbsp;&nbsp;
              <!--<button (click)="addToBin(selectedFile)" *ngIf="selectedFile && selectedFile.file_access!='Read' && selectedFile.is_inbin==true" class="btn  btn-circle file_bt_non_top_right border" matTooltip="Delete forever?">-->
              <!--<i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">delete</i>-->
              <!--</button> &nbsp;-->
              <button (click)="rename(selectedFile)" *ngIf="selectedFile.is_inbin==false"
                      class="btn  btn-circle file_bt_non_top_right border-extra" matTooltip="Rename ">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">create</i>
              </button> &nbsp;&nbsp;&nbsp;
              <button (click)="downloadFile(selectedFile)" *ngIf="selectedFile.is_inbin==false"
                      class="btn  btn-circle file_bt_non_top_right border-extra" matTooltip="Download file">
                  <i class="material-icons"
                     style="text-align:center;margin-left:3px;margin-top:3px">cloud_download</i>
              </button> &nbsp;&nbsp;&nbsp;
              <button (click)="toggleProperties(selectedFile)"
                      class="btn  btn-circle file_bt_non_top_right border-extra" matTooltip="View properties...">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">info</i>
              </button>
              &nbsp;
          </mat-chip>
      </mat-chip-list>
  `,
  styleUrls: ['./chips.css']
})
export class NChipsComponent implements OnInit {

    @Input()  selectedFile: NFile;
    @Input()  abilities: { canS: true, canN: true, canH: true, CanR: true };
    @Output() requiredAction = new EventEmitter<{ action: string, file: NFile }>();
    @Output() onAddStar = new EventEmitter<{file: NFile}>();
    @Output() onRemoveStar = new EventEmitter<{file: NFile}>();
    @Output() onHosting = new EventEmitter<{file: NFile}>();
    @Output() onAddToBin = new EventEmitter<{file: NFile}>();
    @Output() onRename = new EventEmitter<{file: NFile}>();
    @Output() onDownload = new EventEmitter<{file: NFile}>();
    @Output() onToggleProperties = new EventEmitter<{file: NFile}>();
    constructor() {
    }
    ngOnInit() {
        this.selectedFile = new PFile();
    }
    takeAction(action: string, file: NFile) {
        this.requiredAction.emit({action: action, file: file});
    }
    addStar(file: NFile) {
        this.onAddStar.emit({file: file});
    }
    removeStar(file: NFile) {
        this.onRemoveStar.emit({file: file});
    }
    hosting(file: NFile) {
        this.onHosting.emit({file: file});
    }
    addToBin(file: NFile) {
        this.onAddToBin.emit({file: file});
    }
    rename(file: NFile) {
        this.onRename.emit({file: file});
    }
    downloadFile(file: NFile) {
        this.onDownload.emit({file: file});
    }
    toggleProperties(file: NFile) {
        this.onToggleProperties.emit({file: file});
    }

}
