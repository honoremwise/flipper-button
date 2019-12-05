import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'flipper-button',
  templateUrl: './flipper-button.component.html',
  styleUrls: ['./flipper-button.component.css']
})
export class FlipperButtonComponent implements OnInit {
@Input() buttonColor:string;
@Input() buttonConfig:any;
@Input() displayText:string;

styleConfig={
  success: {
    position: 'relative',
    width: '150px',
    height: '60px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: '20px',
    borderRadius: '10px',
    marginTop: '30px'
  },
  danger:{
    position: 'relative',
    width: '150px',
    height: '60px',
    border: 'solid 1px #8b0404',
    backgroundColor: '#dc3545',
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: '20px',
    borderRadius: '10px',
    marginTop: '30px'
  },
  primary:{
    position: 'relative',
    width: '150px',
    height: '60px',
    backgroundColor: '#dc3545',
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: '20px',
    borderRadius: '10px',
    marginTop: '30px'
  },
  warning:{
    position: 'relative',
    width: '150px',
    height: '60px',
    backgroundColor:'#ffc107',
    color: '#fff', 
    fontFamily: 'sans-serif',
    fontSize: '20px',
    borderRadius: '10px',
    marginTop: '30px'
  },
  info:{
    position: 'relative',
    width: '150px',
    height: '60px',
    border: 'solid 1px #0093ee',
    backgroundColor: '#c5d9e8',
    color: '#0093ee',
    fontFamily: 'sans-serif',
    fontSize: '20px',
    borderRadius: '10px',
    marginTop: '30px'
  },
  white:{
    position: 'relative',
    width: '150px',
    height: '60px',
    border: 'solid 1px #0093ee',
    backgroundColor: '#FFFFFF',
    color: '#0093ee',
    fontFamily: 'sans-serif',
    fontSize: '20px',
    borderRadius: '10px',
    marginTop: '30px'
  },
}
//blue 1
//red 2
  constructor() { }

  ngOnInit() {
    console.log(this.buttonConfig);
    if(this.buttonConfig && this.buttonConfig.buttonStyle.shape=='circle' && this.buttonConfig.buttonStyle.width=='' && this.buttonConfig.buttonStyle.height==''){
      this.styleConfig.info.borderRadius="50%";
      this.styleConfig.info.width ="60px";
      this.styleConfig.info.height="60px";
    
      this.styleConfig.success.borderRadius="50%";
      this.styleConfig.success.width ="60px";
      this.styleConfig.success.height="60px";
  
      this.styleConfig.warning.borderRadius="50%";
      this.styleConfig.warning.width ="60px";
      this.styleConfig.warning.height="60px";
    }
       if(this.buttonConfig.buttonStyle.width!=''){
      this.styleConfig.info.width=this.buttonConfig.buttonStyle.width;
         }
    if(this.buttonConfig.buttonStyle.height!=''){
      this.styleConfig.info.height=this.buttonConfig.buttonStyle.height;
   
  } 
  if( this.buttonConfig.buttonStyle.shape!='' && this.buttonConfig.buttonStyle.height!='') {
    this.styleConfig.info.borderRadius="50%";
    this.styleConfig.info.height=this.buttonConfig.buttonStyle.height;
    this.styleConfig.info.width=this.buttonConfig.buttonStyle.height;
  } 
  if( this.buttonConfig.buttonStyle.shape=='circle' && this.buttonConfig.buttonStyle.width!='') {
    this.styleConfig.info.borderRadius="50%";
    this.styleConfig.info.width=this.buttonConfig.buttonStyle.width;
    this.styleConfig.info.height=this.buttonConfig.buttonStyle.width;
    
      } 
  }

}
