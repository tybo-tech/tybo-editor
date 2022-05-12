import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  @Output() valueEvent: EventEmitter<any> = new EventEmitter();
  @Input() inputUnits;
  @Input() inputValue;
  width
  items = ['%', 'px', 'vh', 'vw', 'em', 'rem', 'fr']
  constructor() { }

  ngOnInit() {
  }
  formatStyles(a,b,c){
    this.valueEvent.emit(`${this.inputValue}${this.inputUnits}`)
  }
}
