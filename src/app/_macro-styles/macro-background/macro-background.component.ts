import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';

@Component({
  selector: 'app-macro-background',
  templateUrl: './macro-background.component.html',
  styleUrls: ['./macro-background.component.scss']
})
export class MacroBackgroundComponent implements OnInit {
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();

  type: string;
  color: string;

  constructor() { }

  ngOnInit(): void {

    if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
      this.type = this.widget.Settings["PcBgType"];
      this.color = this.widget.Settings["PcBgColor"];
    }

    if (this.website.ViewDevice === DeviceTypes.TABLET) {
      this.type = this.widget.Settings["TabBgType"];
      this.color = this.widget.Settings["TabBgColor"];
    }
    if (this.website.ViewDevice === DeviceTypes.PHONE) {
      this.type = this.widget.Settings["PhoneBgType"];
      this.color = this.widget.Settings["PhoneBgColor"];
    }
  }
  selectOption(value: any) {
    console.log(value);
    const val: IKeyValueModel = {
      Key: 'background', Value: value
    }
    this.styleChaged.emit(val);

  }
  typeChanged() {
    if (this.type === 'none')
      this.color = this.type;
    if (this.type && this.color) {
      const val: IKeyValueModel = {
        Key: 'background', Value: this.color
      }
      this.styleChaged.emit(val);
      if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
        this.widget.Settings["PcBgType"] = this.type;
        this.widget.Settings["PcBgColor"] = this.color;
      }

      if (this.website.ViewDevice === DeviceTypes.TABLET) {
        this.widget.Settings["TabBgType"] = this.type;
        this.widget.Settings["TabBgColor"] = this.color;
      }
      if (this.website.ViewDevice === DeviceTypes.PHONE) {
        this.widget.Settings["PhoneBgType"] = this.type;
        this.widget.Settings["PhoneBgColor"] = this.color;
      }
    }
  }
}
