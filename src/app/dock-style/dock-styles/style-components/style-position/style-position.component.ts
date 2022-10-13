import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-style-position',
  templateUrl: './style-position.component.html',
  styleUrls: ['./style-position.component.scss']
})
export class StylePositionComponent implements OnInit {

  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  left: number;
  right: number;
  top: number;
  bottom: number;
  zindex: number;
  position: string;
  constructor() { }

  ngOnInit(): void {
    const left: string = WidgetHelper.getStyleValue('left', this.widget, this.website);
    if (left) this.left = this.parseItem(left);

    const right: string = WidgetHelper.getStyleValue('right', this.widget, this.website);
    if (right) this.right = this.parseItem(right);


    const top: string = WidgetHelper.getStyleValue('top', this.widget, this.website);
    if (top) this.top = this.parseItem(top);


    const bottom: string = WidgetHelper.getStyleValue('bottom', this.widget, this.website);
    if (bottom) this.bottom = this.parseItem(bottom);
  }
  emit() {
    if (this.left || this.left === 0) {
      let val = {
        Key: 'left', Value: `${this.left}%`
      }
      this.styleChaged.emit(val);
    }

    if (this.right || this.right === 0) {
      let val = {
        Key: 'right', Value: `${this.right}%`
      }
      this.styleChaged.emit(val);
    }

    if (this.bottom || this.bottom === 0) {
      let val = {
        Key: 'bottom', Value: `${this.bottom}%`
      }
      this.styleChaged.emit(val);
    }

    if (this.top || this.top === 0) {
      let val = {
        Key: 'top', Value: `${this.top}%`
      }
      this.styleChaged.emit(val);
    }

  }
  parseItem(item: string): number {
    if (!item) return 0;
    return parseFloat(parseFloat(item).toFixed(2));

  }

}
