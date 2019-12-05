import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textBtnConfig = {
    text:'honore',
    buttonStyle:{
      fp_btn_type:'yellow',
      shape:'',
      width:'',   
      height:'', 
    }
  };

}
