import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-style-fill',
  templateUrl: './style-fill.component.html',
  styleUrls: ['./style-fill.component.scss']
})
export class StyleFillComponent implements OnInit {
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  background: string;
  constructor() { }

  ngOnInit(): void {
    const background: string = WidgetHelper.getStyleValue('background', this.widget, this.website);
    if (background) this.background = background;
  }
  emit() {
    let val = {
      Key: 'background', Value: `${this.background}`
    }
    this.styleChaged.emit(val);
  }
}
