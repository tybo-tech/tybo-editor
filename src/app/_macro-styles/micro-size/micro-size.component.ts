import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-micro-size',
  templateUrl: './micro-size.component.html',
  styleUrls: ['./micro-size.component.scss']
})
export class MicroSizeComponent implements OnInit {


  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();

  width: any;
  height: any;
  minWidth: any;
  minHeight: any;
  maxWidth: any;
  maxHeight: any;
  alagnActions = [
    { Action: 'left', Classes: ['btn btn-dark'], Name: ['bi bi-text-left'] },
    { Action: 'center', Classes: ['btn btn-dark'], Name: ['bi bi-text-center'] },
    { Action: 'right', Classes: ['btn btn-dark'], Name: ['bi bi-text-right'] },
  ]

  constructor() { }

  ngOnInit(): void {
    const width = WidgetHelper.getStyleValue('width', this.widget, this.website);
    if (width)
      this.width = width;

    const height = WidgetHelper.getStyleValue('height', this.widget, this.website);
    if (height)
      this.height = height;

    const minWidth = WidgetHelper.getStyleValue('min-width', this.widget, this.website);
    if (minWidth)
      this.minWidth = minWidth;

    const minHeight = WidgetHelper.getStyleValue('min-height', this.widget, this.website);
    if (minHeight)
      this.minHeight = minHeight;

    const maxWidth = WidgetHelper.getStyleValue('max-width', this.widget, this.website);
    if (maxWidth)
      this.maxWidth = maxWidth;

    const maxHeight = WidgetHelper.getStyleValue('max-height', this.widget, this.website);
    if (maxHeight)
      this.maxHeight = maxHeight;
  }

  typeChanged() {
    let units = '';
    if (this.width) {
      const val: IKeyValueModel = {
        Key: 'width', Value: this.width + units
      }
      this.styleChaged.emit(val);
    }


    if (this.height) {
      const val: IKeyValueModel = {
        Key: 'height', Value: this.height + units
      }
      this.styleChaged.emit(val);
    }


    if (this.minWidth) {
      const val: IKeyValueModel = {
        Key: 'min-width', Value: this.minWidth + units
      }
      this.styleChaged.emit(val);
    }

    if (this.minHeight) {
      const val: IKeyValueModel = {
        Key: 'min-height', Value: this.minHeight + units
      }
      this.styleChaged.emit(val);
    }
    if (this.maxWidth) {
      const val: IKeyValueModel = {
        Key: 'max-width', Value: this.maxWidth + units
      }
      this.styleChaged.emit(val);
    }

    if (this.maxHeight) {
      const val: IKeyValueModel = {
        Key: 'max-height', Value: this.maxHeight + units
      }
      this.styleChaged.emit(val);
    }



  }


}
