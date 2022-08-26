import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WidgetModel } from 'src/app/_classes/WidgetModel';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.scss']
})
export class BorderComponent implements OnInit {


  @Input() element: WidgetModel;
  @Output() imageChanged: EventEmitter<any> = new EventEmitter<any>();
  border = 1;
  type: string = 'all';
  borderColor: string = '#000000';
  borderTop = 0;
  borderRight = 0;
  borderBottom = 0;
  borderLeft = 0;
  direction: any;
  constructor() { }

  ngOnInit(): void {
    if (!this.element.Settings) {
      this.element.Settings = {};
    }


    if (this.element.Settings["borderTop"])
      this.borderTop = this.element.Settings["borderTop"];


    if (this.element.Settings["borderRight"])
      this.borderRight = this.element.Settings["borderRight"];


    if (this.element.Settings["borderBottom"])
      this.borderBottom = this.element.Settings["borderBottom"];


    if (this.element.Settings["borderLeft"])
      this.borderLeft = this.element.Settings["borderLeft"];

    if (this.element.Settings["borderColor"])
      this.borderColor = this.element.Settings["borderColor"];


    // this.omit();
  }

  omit() {
    if (this.type === 'all') {
      const br = { border: `${this.border}px solid ${this.borderColor}` }
      this.element.Settings["border-all"] = `${this.border},${this.borderColor}`;
      this.imageChanged.emit(br)
      return;
    }

    if (this.type === 'top') {
      const br = { 'border-top': `${this.border}px solid ${this.borderColor}` }
      this.element.Settings["border-all"] = `${this.border},${this.borderColor}`;
      this.imageChanged.emit(br)
      return;
    }


    if (this.type === 'bottom') {
      const br = { 'border-bottom': `${this.border}px solid ${this.borderColor}` }
      this.element.Settings["border-bottom"] = `${this.border},${this.borderColor}`;
      this.imageChanged.emit(br)
      return;
    }


    if (this.type === 'right') {
      const br = { 'border-right': `${this.border}px solid ${this.borderColor}` }
      this.element.Settings["border-right"] = `${this.border},${this.borderColor}`;
      this.imageChanged.emit(br)
      return;
    }


    if (this.type === 'left') {
      const br = { 'border-left': `${this.border}px solid ${this.borderColor}` }
      this.element.Settings["border-left"] = `${this.border},${this.borderColor}`;
      this.imageChanged.emit(br)
      return;
    }
  }



  typeChanged(e: string) {
    this.type = e;
  }

}
