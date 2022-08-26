import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-micro-display',
  templateUrl: './micro-display.component.html',
  styleUrls: ['./micro-display.component.scss']
})
export class MicroDisplayComponent implements OnInit {


  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();

  display: string;
  alagnActions = [
    { Action: 'left', Classes: ['btn btn-dark'], Name: ['bi bi-text-left'] },
    { Action: 'center', Classes: ['btn btn-dark'], Name: ['bi bi-text-center'] },
    { Action: 'right', Classes: ['btn btn-dark'], Name: ['bi bi-text-right'] },
  ]

  constructor() { }

  ngOnInit(): void {
    const display = WidgetHelper.getStyleValue('display', this.widget, this.website);
    if (display)
      this.display = display;
  }


  typeChanged() {
    if (this.display) {
      const val: IKeyValueModel = {
        Key: 'display', Value: this.display
      }
      this.styleChaged.emit(val);
    }
  }


}
