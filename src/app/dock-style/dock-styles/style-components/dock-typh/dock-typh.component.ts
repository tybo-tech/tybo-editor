import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-dock-typh',
  templateUrl: './dock-typh.component.html',
  styleUrls: ['./dock-typh.component.scss']
})
export class DockTyphComponent implements OnInit {

  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  color: string;
  align: string;
  font_size: number;
  font_weight: string;
  constructor() { }

  ngOnInit(): void {
    const color: string = WidgetHelper.getStyleValue('color', this.widget, this.website);
    if (color) this.color = color;

    const align: string = WidgetHelper.getStyleValue('text-align', this.widget, this.website);
    if (align) this.align = align;

    const font_size: string = WidgetHelper.getStyleValue('font-size', this.widget, this.website);
    if (font_size) this.font_size = parseInt(font_size);

    const font_weight: string = WidgetHelper.getStyleValue('font-weight', this.widget, this.website);
    if (font_weight) this.font_weight = font_weight;
  }
  emit() {
    if(this.color){
      let val = {
        Key: 'color', Value: `${this.color}`
      }
      this.styleChaged.emit(val);
    }
   
    if(this.align){
      let val = {
        Key: 'text-align', Value: `${this.align}`
      }
      this.styleChaged.emit(val);
    }

    if(this.font_size){
      let val = {
        Key: 'font-size', Value: `${this.font_size}px`
      }
      this.styleChaged.emit(val);
    }
   
    
    if(this.font_weight){
      let val = {
        Key: 'font-weight', Value: `${this.font_weight}`
      }
      this.styleChaged.emit(val);
    }
   

  }
}
