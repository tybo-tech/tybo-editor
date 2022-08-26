import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EVENTS, IEvent, IEventInput } from 'src/app/_classes/IEvent';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-widget-events',
  templateUrl: './widget-events.component.html',
  styleUrls: ['./widget-events.component.scss']
})
export class WidgetEventsComponent implements OnInit {
  @Input() widget: WidgetModel;
  @Input() page: PageModel;
  @Input() user: UserModel;
  @Input() website: WebsiteModel;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  inputs: any[] = [];
  events: IEvent[] = EVENTS;
  selectedItem: IEvent;
  addEvent: boolean = false;
  inputWidgets: WidgetModel[];
  constructor(
    private websiteService: WebsiteService
  ) { }

  ngOnInit(): void {
    console.log(this.widget);
    
    if (this.page)
      this.inputWidgets = WidgetHelper.getByType([], this.page.Widgets, SectionTypes.TEXTBOX);
  }
  close() {
    this.onClose.emit(false)
  }

  toggeEventOptions(e: IEvent) {
    if (e.ShowOEvents)
      return;
    e.ShowOEvents = true;
  }

  selectItem(event: IEvent) {
    if (event.Events.length) {
      this.events.map(x => x.ShowOEvents = false)
      this.events.map(x => x.ShowInputs = false)
      event.ShowOEvents = true;
    }
    if (event.Inputs.length) {
      this.events.map(x => x.ShowInputs = false)
      this.events.map(x => x.ShowOEvents = false)
      event.ShowInputs = true;
    }
    // this.events.map(x => x.ShowInputs = false)
    // this.events.map(x => x.Events.map(e => e.ShowInputs = false))
    // event.ShowInputs = true;
    // this.selectedItem = item;
    // this.selectedItem.WebsiteId = this.website.WebsiteId;
    // this.selectedItem.PageId = this.page.PageId;
    // this.selectedItem.WidgetId = this.widget.WidgetId;
    // this.selectedItem.CreateUserId = this.user.UserId;
    // this.selectedItem.ModifyUserId = this.user.UserId;
    // this.selectedItem.StatusId = 1;
    // this.selectedItem.OrderNumber = 1;
    // if (!this.selectedItem.EventId)
    //   this.selectedItem.EventId = HelperClass.getId('event');
  }

  selectChildEvent(event: IEvent, events: IEvent[]) {
    if (event.Events.length) {
      events.map(x => x.ShowOEvents = false)
      events.map(x => x.ShowInputs = false)
      event.ShowOEvents = true;
    }
    if (event.Inputs.length) {
      events.map(x => x.ShowInputs = false)
      events.map(x => x.ShowOEvents = false)
      event.ShowInputs = true;
    }
  }
  toggleViewOptions(input: IEventInput) {
    this.events.map(x => x.Inputs.map(i => i.ViewOptions = false))
    input.ViewOptions = !input.ViewOptions;
  }
  saveEvent(event?: IEvent) {
    this.websiteService.create(`events/save-events.php`, [event || this.selectedItem]).subscribe((data: IEvent) => {
      if (data && data.WebsiteId && data.Name && data.Id) {
        this.selectedItem = data;
        console.log(this.selectedItem);
      }
    })
  }
}


