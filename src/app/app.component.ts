import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textBtnConfig = {
    text:'Test',
    src:'check.svg',
    buttonStyle:{
      fp_btn_type:'info',
      shape:'circle',
      width:'',   
      height:'',
    
          }
  };

}
