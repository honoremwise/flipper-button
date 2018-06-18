import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {NFile} from './contracts/NFile';
import {PFile} from './contracts/PFile';

@Component({
    selector: 'N-ContextMenu',
    templateUrl: './context-menu.html',
    styleUrls: ['./context-menu.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit, OnChanges {


    @Input() menus: string [];
    @Input() show_context: boolean;
    @Input() activeFile: NFile;
    @Input() bounds: any;
    doc: Document;
    constructor(public cd: ChangeDetectorRef) {
        this.doc = document;
    }

    ngOnInit() {

    }
    ngOnChanges(values) {
        this.cd.detectChanges();
    }
    // @Input()
    // public  set onContextMenu(event) {
    //     if (event) {
    //        // console.log(event);
    //        // console.log(this.bounds);
    //        console.log(this.activeFile);
    //        console.log(this.show_context);
    //     }
    //
    //     // this.context_menu =  this.doc.getElementById('context-menu'); // default when use mat-card it add 48px
    //     // console.log(this.context_menu.clientWidth - 48, this.bounds.clientWidth);
    //     // const xPosition = event.clientX - this.container.getBoundingClientRect().left - (this.context_menu.clientWidth / 2);
    //     // const yPosition = event.clientY - this.container.getBoundingClientRect().top - (this.context_menu.clientHeight / 2);
    //     // console.log(this.container.getBoundingClientRect().left,  this.container.getBoundingClientRect().top );
    // }

}
