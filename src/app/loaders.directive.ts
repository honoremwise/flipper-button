import { Directive } from '@angular/core';

@Directive({
  selector: '[appLoaders]'
})
export class LoadersDirective {

  constructor() { }
  canI() {
    console.log('can i for sure...');
  }

}
