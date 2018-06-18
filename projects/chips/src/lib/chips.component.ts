import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NFile} from './contracts/NFile';
import {PFile} from './contracts/PFile';
@Component({
  selector: 'N-Chips',
  template: `
      <mat-chip-list class="button-position w-100">
          <mat-chip color="primary" class="text-center tip_menu_bar">
              <button class="btn  btn-sm btn-circle file_bt_non_top_right border" matTooltip="Open">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">open_in_new</i>
              </button> &nbsp;
              <button  matTooltip="Remove start..." class="btn  btn-sm btn-circle file_bt_non_top_right border">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px;color:#ffd700;">star</i>
              </button> &nbsp;
              <button  matTooltip="Add start..." class="btn  btn-sm btn-circle file_bt_non_top_right border">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px;color:#fff;">star</i>
              </button> &nbsp;
              <button  class="btn  btn-sm btn-circle file_bt_non_top_right border" matTooltip="Hosting ">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">public</i>
              </button> &nbsp;
              <button class="btn  btn-circle file_bt_non_top_right border" matTooltip="Delete ">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">delete</i>
              </button> &nbsp;
              <button class="btn  btn-circle file_bt_non_top_right border" matTooltip="Delete forever?">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">delete</i>
              </button> &nbsp;
              <button  class="btn  btn-circle file_bt_non_top_right border" matTooltip="Rename ">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">create</i>
              </button> &nbsp;
              <button  class="btn  btn-circle file_bt_non_top_right border" matTooltip="Download file">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">cloud_download</i>
              </button> &nbsp;
              <button  class="btn  btn-circle file_bt_non_top_right border" matTooltip="View properties...">
                  <i class="material-icons" style="text-align:center;margin-left:3px;margin-top:3px">info</i>
              </button>
              &nbsp;
          </mat-chip>
      </mat-chip-list>
  `,
  styleUrls: ['./chips.css']
})
export class ChipsComponent implements OnInit {
    @Input() selectedFile: NFile;
    @Input() abilities: {canS: true, canN: true, canH: true, CanR: true};
    @Output() requiredAction = new EventEmitter<{action: string, file: NFile}>();
  constructor() {
  }

  ngOnInit() {
      this.selectedFile = new PFile();
  }
  takeAction(action: string , file: NFile) {
      this.requiredAction.emit({action: action, file: file});
  }
}
