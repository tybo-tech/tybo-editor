import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WidgetModel } from 'src/app/_classes/WidgetModel';

@Component({
  selector: 'app-edgets',
  templateUrl: './edgets.component.html',
  styleUrls: ['./edgets.component.scss']
})
export class EdgetsComponent implements OnInit {

  @Input() element: WidgetModel;
  @Output() imageChanged: EventEmitter<any> = new EventEmitter<any>();
  borderRadius = 1;
  type: string = 'all';
  tl = 0;
  tr = 0;
  bl = 0;
  br = 0;
  direction: any;
  constructor() { }

  ngOnInit(): void {
    if (!this.element.Settings) {
      this.element.Settings = {};
    }


    if (this.element.Settings["tl"])
      this.tl = this.element.Settings["tl"];


    if (this.element.Settings["tr"])
      this.tr = this.element.Settings["tr"];


    if (this.element.Settings["bl"])
      this.bl = this.element.Settings["bl"];


    if (this.element.Settings["br"])
      this.br = this.element.Settings["br"];


    // this.omit();
  }

  omit() {
    if (this.type === 'tl')
      this.tl = this.borderRadius
    if (this.type === 'tr')
      this.tr = this.borderRadius
    if (this.type === 'bl')
      this.bl = this.borderRadius
    if (this.type === 'br')
      this.br = this.borderRadius

    if (this.type === 'all') {
      this.tl = this.borderRadius
      this.tr = this.borderRadius
      this.br = this.borderRadius
      this.bl = this.borderRadius
    }

    const br = `${this.tl}px ${this.tr}px ${this.br}px ${this.bl}px`
    this.element.Settings["border-radius"] = br;
    this.element.Settings["tl"] = this.tl;
    this.element.Settings["tr"] = this.tr;
    this.element.Settings["bl"] = this.bl;
    this.element.Settings["br"] = this.br;
    console.log(br, this.element.Settings);
    this.imageChanged.emit(br)
  }



  typeChanged(e: string) {
    this.type = e;
  }

}
