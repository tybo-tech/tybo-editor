import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-style-size',
  templateUrl: './style-size.component.html',
  styleUrls: ['./style-size.component.scss']
})
export class StyleSizeComponent implements OnInit {

  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;

  width: number;
  height: number;
  
  min_width: number;
  min_height: number;
  
  max_width: number;
  max_height: number;

  constructor() { }

  ngOnInit(): void {
    const width: string = WidgetHelper.getStyleValue('width', this.widget, this.website);
    if (width) this.width = this.parseItem(width);

    const height: string = WidgetHelper.getStyleValue('height', this.widget, this.website);
    if (height) this.height = this.parseItem(height);

    const min_width: string = WidgetHelper.getStyleValue('min-width', this.widget, this.website);
    if (min_width) this.min_width = this.parseItem(min_width);

    const min_height: string = WidgetHelper.getStyleValue('min-height', this.widget, this.website);
    if (min_height) this.min_height = this.parseItem(min_height);

    const max_width: string = WidgetHelper.getStyleValue('max-width', this.widget, this.website);
    if (max_width) this.max_width = this.parseItem(max_width);

    const max_height: string = WidgetHelper.getStyleValue('max-height', this.widget, this.website);
    if (max_height) this.max_height = this.parseItem(max_height);

  }
  emit() {
    if (this.width || this.width === 0) {
      let val = {
        Key: 'width', Value: `${this.width}%`
      }
      this.styleChaged.emit(val);
    }

    if (this.height || this.height === 0) {
      let val = {
        Key: 'height', Value: `${this.height}px`
      }
      this.styleChaged.emit(val);
    }else{
      let val = {
        Key: 'height', Value: `none`
      }
      this.styleChaged.emit(val);
    }

    if (this.min_width || this.min_width === 0) {
      let val = {
        Key: 'min-width', Value: `${this.min_width}%`
      }
      this.styleChaged.emit(val);
    }

    if (this.min_height || this.min_height === 0) {
      let val = {
        Key: 'min-height', Value: `${this.min_height}px`
      }
      this.styleChaged.emit(val);
    }


    if (this.max_width || this.max_width === 0) {
      let val = {
        Key: 'max-width', Value: `${this.max_width}%`
      }
      this.styleChaged.emit(val);
    }

    if (this.max_height || this.max_height === 0) {
      let val = {
        Key: 'max-height', Value: `${this.max_height}px`
      }
      this.styleChaged.emit(val);
    }




  }
  parseItem(item: string): number {
    if (!item) return 0;
    return parseFloat(parseFloat(item).toFixed(2));

  }


}
