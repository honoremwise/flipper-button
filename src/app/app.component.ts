import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textBtnConfig = {
    text:'',
    src:'check.svg',
    buttonStyle:{
      fp_btn_type:'danger',
      shape:'circle',
      width:'52px',   
      height:'52px',
    
          }
  };

}
