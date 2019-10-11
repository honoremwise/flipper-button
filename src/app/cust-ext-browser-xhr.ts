import {Injectable} from '@angular/core';
import {BrowserXhr} from '@angular/http';
// @Injectable({
//     providedIn: 'root'
// })
export class CustExtBrowserXhr extends BrowserXhr {
    constructor() {
        super();
    }
    build(): any {
        console.log('building..');
        const xhr = super.build();
        xhr.withCredentials = false;             // this is all the magic we need for now
        return <any>(xhr);
    }
}
