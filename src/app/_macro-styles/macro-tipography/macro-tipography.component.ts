import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-macro-tipography',
  templateUrl: './macro-tipography.component.html',
  styleUrls: ['./macro-tipography.component.scss']
})
export class MacroTipographyComponent implements OnInit {

  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();

  type: string;
  alignText: string;
  color: string;
  background: any;
  weight: any;
  size: any;
  alagnActions = [
    { Action: 'left', Classes: ['btn btn-dark'], Name: ['bi bi-text-left'] },
    { Action: 'center', Classes: ['btn btn-dark'], Name: ['bi bi-text-center'] },
    { Action: 'right', Classes: ['btn btn-dark'], Name: ['bi bi-text-right'] },
  ]

  constructor() { }

  ngOnInit(): void {
    const color = WidgetHelper.getStyleValue('color', this.widget, this.website);
    if (color)
      this.color = color;

    const background = WidgetHelper.getStyleValue('background', this.widget, this.website);
    if (background)
      this.background = background;

    const weight = WidgetHelper.getStyleValue('font-weight', this.widget, this.website);
    if (weight)
      this.weight = weight;

    const size = WidgetHelper.getStyleValue('font-size', this.widget, this.website);
    if (size)
      this.size = parseInt(size);



    const align = WidgetHelper.getStyleValue('text-align', this.widget, this.website);
    if (align) {
      this.alignText = align;
      if (this.alignText === 'left') {
        this.alagnActions[0].Classes = ['btn btn-dark active']
      }
      if (this.alignText === 'center') {
        this.alagnActions[1].Classes = ['btn btn-dark active']
      }
      if (this.alignText === 'right') {
        this.alagnActions[2].Classes = ['btn btn-dark active']
      }
    }
  }

  togleClass(){
    this.alagnActions = [
      { Action: 'left', Classes: ['btn btn-dark'], Name: ['bi bi-text-left'] },
      { Action: 'center', Classes: ['btn btn-dark'], Name: ['bi bi-text-center'] },
      { Action: 'right', Classes: ['btn btn-dark'], Name: ['bi bi-text-right'] },
    ]
    if (this.alignText === 'left') {
      this.alagnActions[0].Classes = ['btn btn-dark active']
    }
    if (this.alignText === 'center') {
      this.alagnActions[1].Classes = ['btn btn-dark active']
    }
    if (this.alignText === 'right') {
      this.alagnActions[2].Classes = ['btn btn-dark active']
    }
  }
  typeChanged() {
    if (this.color) {
      const val: IKeyValueModel = {
        Key: 'color', Value: this.color
      }
      this.styleChaged.emit(val);
    }

    if (this.background) {
      const val: IKeyValueModel = {
        Key: 'background', Value: this.background
      }
      this.styleChaged.emit(val);
    }


    if (this.size) {
      const val: IKeyValueModel = {
        Key: 'font-size', Value: this.size + 'px'
      }
      this.styleChaged.emit(val);
    }

    if (this.alignText) {
      const val: IKeyValueModel = {
        Key: 'text-align', Value: this.alignText
      }
      this.styleChaged.emit(val);
    }

    if (this.weight) {
      const val: IKeyValueModel = {
        Key: 'font-weight', Value: this.weight
      }
      this.styleChaged.emit(val);
    }
  }

}
