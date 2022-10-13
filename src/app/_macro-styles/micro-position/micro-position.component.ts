import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-micro-position',
  templateUrl: './micro-position.component.html',
  styleUrls: ['./micro-position.component.scss']
})
export class MicroPositionComponent implements OnInit {



  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();

  position: string;
  zindex: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  constructor() { }
  ngOnInit(): void {
    const position = WidgetHelper.getStyleValue('position', this.widget, this.website);
    if (position)
      this.position = position;

    const zindex = WidgetHelper.getStyleValue('z-index', this.widget, this.website);
    if (zindex)
      this.zindex = zindex;

    const left = WidgetHelper.getStyleValue('left', this.widget, this.website);
    if (zindex)
      this.left = left;

    const right = WidgetHelper.getStyleValue('right', this.widget, this.website);
    if (zindex)
      this.right = right;

    const top = WidgetHelper.getStyleValue('top', this.widget, this.website);
    if (top)
      this.top = top;

    const bottom = WidgetHelper.getStyleValue('bottom', this.widget, this.website);
    if (bottom)
      this.bottom = bottom;
  }


  typeChanged() {
    if (this.position) {
      const val: IKeyValueModel = {
        Key: 'position', Value: this.position
      }
      this.styleChaged.emit(val);
    }


    if (this.zindex) {
      const val: IKeyValueModel = {
        Key: 'z-index', Value: this.zindex + ''
      }
      this.styleChaged.emit(val);
    }

    if (this.right) {
      const val: IKeyValueModel = {
        Key: 'right', Value: this.right
      }
      this.styleChaged.emit(val);
    }


    if (this.bottom) {
      const val: IKeyValueModel = {
        Key: 'bottom', Value: this.bottom
      }
      this.styleChaged.emit(val);
    }


    if (this.top) {
      const val: IKeyValueModel = {
        Key: 'top', Value: this.top
      }
      this.styleChaged.emit(val);
    }


    if (this.left) {
      const val: IKeyValueModel = {
        Key: 'left', Value: this.left
      }
      this.styleChaged.emit(val);
    }
  }


}
