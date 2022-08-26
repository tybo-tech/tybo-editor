import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IEvent, IEventInput } from 'src/app/_classes/IEvent';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-event-inputs',
  templateUrl: './event-inputs.component.html',
  styleUrls: ['./event-inputs.component.scss']
})
export class EventInputsComponent implements OnInit {
  @Input() input: IEventInput;
  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  @Input() event: IEvent;

  @Output() hideInputs: EventEmitter<any> = new EventEmitter();
  @Output() saveInputs: EventEmitter<any> = new EventEmitter();
  inputWidgets: WidgetModel[];
  constructor() { }

  ngOnInit(): void {
    if (this.page) {
      console.log(this.input);
      console.log(this.event);
      if (this.event.Name === 'Toggle element') {
        this.inputWidgets = WidgetHelper.IsolateWidget([], this.page.Widgets) || [];
        if (this.website.Header) {
          const fromHeader = WidgetHelper.IsolateWidget([], [this.website.Header]) || [];
          if (fromHeader.length)
            fromHeader.forEach(i => {
              this.inputWidgets.push(i)
            })
        }
      } else {
        this.inputWidgets = WidgetHelper.getByType([], this.page.Widgets, SectionTypes.TEXTBOX) || [];
      }
    }
  }
  toggleViewOptions(input: IEventInput) {
    if (input.ViewOptions) {
      input.ViewOptions = !input.ViewOptions;
      return;
    }
    this.hideInputs.emit()
    input.ViewOptions = !input.ViewOptions;
  }
  saveInputsEvent(){
    this.saveInputs.emit()
  }
}