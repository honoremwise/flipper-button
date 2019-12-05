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
@Input() btn_shape:any;

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
// getting the button shape from the input
this.btn_shape=this.buttonConfig.buttonStyle.fp_btn_type;
if(this.buttonConfig && this.buttonConfig.buttonStyle.shape=='circle' && this.buttonConfig.buttonStyle.width=='' && this.buttonConfig.buttonStyle.height==''){
      this.styleConfig[this.btn_shape].borderRadius="50%";
      this.styleConfig[this.btn_shape].width ="60px";
      this.styleConfig[this.btn_shape].height="60px";
    
      
    }
  if(this.buttonConfig.buttonStyle.width!=''){
      this.styleConfig[this.btn_shape].width=this.buttonConfig.buttonStyle.width;
         }
    if(this.buttonConfig.buttonStyle.height!=''){
      this.styleConfig[this.btn_shape].height=this.buttonConfig.buttonStyle.height;
   
  } 
  if( this.buttonConfig.buttonStyle.shape!='' && this.buttonConfig.buttonStyle.height!='') {
    this.styleConfig[this.btn_shape].borderRadius="50%";
    this.styleConfig[this.btn_shape].height=this.buttonConfig.buttonStyle.height;
    this.styleConfig[this.btn_shape].width=this.buttonConfig.buttonStyle.height;
  } 
  if( this.buttonConfig.buttonStyle.shape=='circle' && this.buttonConfig.buttonStyle.width!='') {
    this.styleConfig[this.btn_shape].borderRadius="50%";
    this.styleConfig[this.btn_shape].width=this.buttonConfig.buttonStyle.width;
    this.styleConfig[this.btn_shape].height=this.buttonConfig.buttonStyle.width;
    
      } 
  }

}
