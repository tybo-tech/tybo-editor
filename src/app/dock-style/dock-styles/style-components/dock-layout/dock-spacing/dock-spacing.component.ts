import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-dock-spacing',
  templateUrl: './dock-spacing.component.html',
  styleUrls: ['./dock-spacing.component.scss']
})
export class DockSpacingComponent implements OnInit {
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;

  padding_left: number;
  padding_top: number;
  padding_right: number;
  padding_bottom: number;

  margin_left: number;
  margin_top: number;
  margin_right: number;
  margin_bottom: number;

  constructor() { }

  ngOnInit(): void {
    const padding_left: string = WidgetHelper.getStyleValue('padding-left', this.widget, this.website);
    if (padding_left) this.padding_left = this.parseItem(padding_left);

    const padding_top: string = WidgetHelper.getStyleValue('padding-top', this.widget, this.website);
    if (padding_top) this.padding_top = this.parseItem(padding_top);

    const padding_right: string = WidgetHelper.getStyleValue('padding-right', this.widget, this.website);
    if (padding_right) this.padding_right = this.parseItem(padding_right);

    const padding_bottom: string = WidgetHelper.getStyleValue('padding-bottom', this.widget, this.website);
    if (padding_bottom) this.padding_bottom = this.parseItem(padding_bottom);

    const margin_left: string = WidgetHelper.getStyleValue('margin-left', this.widget, this.website);
    if (margin_left) this.margin_left = this.parseItem(margin_left);

    
    const margin_top: string = WidgetHelper.getStyleValue('margin_top', this.widget, this.website);
    if (margin_top) this.margin_top = this.parseItem(margin_top);
    
    const margin_right: string = WidgetHelper.getStyleValue('margin_right', this.widget, this.website);
    if (margin_right) this.margin_right = this.parseItem(margin_right);

    
    const margin_bottom: string = WidgetHelper.getStyleValue('margin_bottom', this.widget, this.website);
    if (margin_bottom) this.margin_bottom = this.parseItem(margin_bottom);
  }
  changed(value: string, key: string) {
    console.log(key, ' : ', value);
    let val = {
      Key: key, Value: value
    }
    this.styleChaged.emit(val);

  }

  parseItem(item: string): number {
    if (!item) return 0;
    return parseFloat(parseFloat(item).toFixed(2));

  }
}
