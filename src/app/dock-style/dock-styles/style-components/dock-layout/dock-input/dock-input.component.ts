import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dock-input',
  templateUrl: './dock-input.component.html',
  styleUrls: ['./dock-input.component.scss']
})
export class DockInputComponent implements OnInit {
  @Input() currentValue: any;
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('keydown', (e)=>this.keyEvent(e))
  }
  keyEvent(e: KeyboardEvent): any {
  if(e.keyCode === 38){
    // up
    this.currentValue = parseFloat(this.currentValue) || 0;
    this.currentValue+=1;
  }
  if(e.keyCode === 40){
    // up
    this.currentValue = parseFloat(this.currentValue) || 0;
    this.currentValue-=1;
  }
  }
  textChanged(){
 this.changed.emit(this.currentValue + 'px');
    
  }
}
