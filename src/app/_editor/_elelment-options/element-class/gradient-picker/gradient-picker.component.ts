import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WidgetModel } from 'src/app/_classes/WidgetModel';

@Component({
  selector: 'app-gradient-picker',
  templateUrl: './gradient-picker.component.html',
  styleUrls: ['./gradient-picker.component.scss']
})
export class GradientPickerComponent implements OnInit {

  @Input() element: WidgetModel;
  @Output() imageChanged: EventEmitter<any> = new EventEmitter<any>();
  showImage: boolean
  color1: string;
  color2: string;
  colorFrom: string = ' rgba(81, 12, 12, .5)';
  colorTo: string = 'rgba(81, 36, 36,.65)';
  opercity = '.5';
  direction: string = 'to bottom right';
  constructor() { }

  ngOnInit(): void {
    if (!this.element.Settings) {
      this.element.Settings = {};
    }


    if (this.element.Settings["background-opacity"])
      this.opercity = this.element.Settings["background-opacity"];

    if (this.element.Settings["color-to"])
      this.colorTo = this.element.Settings["color-to"];

    if (this.element.Settings["color-from"])
      this.colorFrom = this.element.Settings["color-from"];

    if (this.element.Settings["color1"])
      this.color1 = this.element.Settings["color1"];

    if (this.element.Settings["color2"])
      this.color2 = this.element.Settings["color2"];

    if (this.element.Settings["direction"])
      this.direction = this.element.Settings["direction"];

    this.omit();
  }

  omit() {
    console.log(this.element.Settings);
    this.element.Settings["background-opacity"] = this.opercity;
    this.element.Settings["color-to"] = this.colorTo;
    this.element.Settings["color-from"] = this.colorFrom;
    this.element.Settings["color1"] = this.color1;
    this.element.Settings["color2"] = this.color2;
    this.element.Settings["direction"] = this.direction;
    const color = `linear-gradient(${this.direction},${this.colorFrom}, ${this.colorTo});`
    this.imageChanged.emit(color)
  }
  // onImageSelect() {
  //   this.showImage = false;
  //   const color = `linear-gradient(${this.direction},${this.colorFrom}, ${this.colorTo});`
  //   this.imageChanged.emit(color)
  // }
  colorChanged() {
    if (this.color1) {
      this.colorFrom = this.hexToRgbA(this.color1);
      this.element.Settings["color-from"] = this.colorFrom;
    }
    if (this.color2) {
      this.colorTo = this.hexToRgbA(this.color2);
      this.element.Settings["color-to"] = this.colorTo;
    }

    this.element.Settings["background-opacity"] = this.opercity;
    this.omit();

  }
  hexToRgbA(hex: string) {
    let color: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      color = hex.substring(1).split('');
      if (color.length == 3) {
        color = [color[0], color[0], color[1], color[1], color[2], color[2]];
      }
      color = '0x' + color.join('');
      return 'rgba(' + [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',') + `,${this.opercity})`;
    }
    return hex;
  }

  directionChanged(e: string) {
    this.direction = e;
    this.element.Settings["gradient-direction"] = this.direction;
    this.colorChanged();
  }
}
