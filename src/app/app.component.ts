import {Component, ViewChild} from '@angular/core';
import {DragAndDropDataService} from "./drag-and-drop-data.service";
import {NFile} from "./NFile";
import {Http, Headers} from '@angular/http';
import { NgForm } from '@angular/forms';
import { LoadersDirective } from './loaders.directive';
export class Employee {
	constructor(public name: string, public age: number){}
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public dragFolders: any[];
    public dragFiles: any[];
    public activeFolder: any;
    public activeFile: any;

    @ViewChild(LoadersDirective) v: LoadersDirective;
    
    constructor(dragAndDropDataService: DragAndDropDataService,private http: Http) {
        this.dragFolders = dragAndDropDataService.getFolders().splice(0, 10);
        this.dragFiles = dragAndDropDataService.getFiles().splice(0, 20);

        // Set root folder
        this.activeFolder = undefined;
        // this.get('http://localhost:8000/api/user').subscribe(result => {
        //     // console.log( result );
        //     console.log(result);
        // });

    }
    createAuthorizationHeader(headers: Headers) {
        headers.append('authorization',  'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ0ODliYWQ1NzMzNGY4ZTVlODBjMzBjYzViYTU3ZDljNjdmZjkzNDA3ZGY4YWQxYTQ5NjI2NWQ3NjVkOWY5MDIzZjJkNDQxOTExOWViNGY5In0.eyJhdWQiOiI3IiwianRpIjoiZDQ4OWJhZDU3MzM0ZjhlNWU4MGMzMGNjNWJhNTdkOWM2N2ZmOTM0MDdkZjhhZDFhNDk2MjY1ZDc2NWQ5ZjkwMjNmMmQ0NDE5MTE5ZWI0ZjkiLCJpYXQiOjE1MzA1OTgzODAsIm5iZiI6MTUzMDU5ODM4MCwiZXhwIjoxNTYyMTM0MzgwLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.gLkd3qAFwitEvpR5Nc37z3gWaOmcZtlU8QtQIn7WKGHhae1_OF-G8r-0ZT1bBiaaiNNdysDN-87lpy0WFtKwmnqtNxfKIMUy5QFJ4X3Iie25SB5YlUVg_VEMP-aBD5KmPhbIIJFaSChYVPU3V9sdEkZw8rMnguNjaDIYe7Z-cC-zdoAe9CHeS1WLZV78D05BquMcjW9vFjZ0QxZyZfT6Ov0UBj_PDSjbiVWEXoV7Wc0cxpW9-lXWVVVHU_ShHFvx_y6WEop102zrDFiMBDuwU7bTIrRLtHVVRT0bHDJwkQXLwJhQCzegN7i2-4boTxLTNVx-pLRPxR0Q1_L2JeikvrkzciM3L_5Rk04XXnjzQ7gHkDiP0wUO9daw8bQ-PPT7qcPh0DSFv2-srGqWpQSvKre-Mt2FYdtfPJzPSSR50dENaiiTpflth4pwuGcbugZjyCJEp4ekhlhdSa_t4mNpSFsir8Cn7F-jwdiMuTIa55A2FDTRA0WiyySF2QAnM7nQ1SY5Z-WHnkSyjXSj_yt3VOsU3stujLAl_Q-cAVhBe2_wjpsadwQfwD1y6jYfeqd56atwFx6Jv9CuQm3XQHzTHXiSqOl_kYFCZnUbvoTjpweSrg7sEaGi05iFoant9sU5IZgJoQAHTEUd-VnaSMvwyOXYTdIvY8kShR8jb_o0xA4');
        // headers.append('Accept', 'application/json');
        // headers.append('Content-Type', 'application/json');
        //   btoa('username:password')); 
      }
      get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
          headers: headers
        });
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

    didCLick(file:NFile) {
        // console.log(file);
        this.activeFile = file;
    }


    //experimenting angular change detection
    emp = new Employee('Mahesh', 20);	
    msg: string = 'Hello World!';
  
    onFormSubmit(empForm: NgForm) {
        
        let name = empForm.controls['name'].value;
        let age = empForm.controls['age'].value;
        this.emp = new Employee(name, age);
    }  
}
