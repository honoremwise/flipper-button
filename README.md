[see it in action ](https://drive.google.com/file/d/1ZSIZOevWuzOFyJ0ngSuAr5lJ-oGtaulC/view)

# DragNDrop
- Provide cool drag and drop with animation on list of item(1) for example files and item(2) for example folders
- inspired by google drive drag and drop
- it is built in with example so that you can get clue of how you might use it on your project.
# Installation
- clone a repository
- npm install
- ng build --prod NDrop
- ng serve (to see the sample app)

# add to your project
- npm -i --save ndrop
```import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

.....
import { HttpClientModule } from '@angular/common/http';
import {NDropModule} from 'ndrop';
@NgModule({
    declarations: [
        AppComponent,
        ChildComponent,
        LoadersDirective
    ],
    imports: [
        BrowserModule,
        NDropModule,
        FormsModule
    ],
    // {provide: BrowserXhr, useClass:CustExtBrowserXhr}
    
    providers: [],

    bootstrap: [AppComponent]
})
export class AppModule {
}
```
#on your html
```
<N-NDrop
  [files]="dragFiles"
  [folders]="dragFolders"
  [activeFolder]="activeFolder"
  [environment]="'api'"
  [postUrl]="'your api url'"
  [bearerToken]="'Bearer  your bearer token'"
  (drop)="onDrop($event)"
  (goToFolder)="goToFolder($event)"
  (goBack)="goBack($event)"
  (didClick)="didCLick($event)"
>
</N-NDrop> 
```
#notice
-keep in mind that you may need to see how you can change built in api to your own
-default build in api use yegobox fileSystem api for data but the repo contain also mock data so you can start contributing without any api datas.