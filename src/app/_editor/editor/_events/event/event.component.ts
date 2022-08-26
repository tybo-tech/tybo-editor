import { Component, Input, OnInit } from '@angular/core';
import { IEvent, IEventInput } from 'src/app/_classes/IEvent';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: IEvent;
  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  @Input() widget: WidgetModel;
  @Input() user: UserModel;


  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
  }
  toggleViewOptions(e: IEventInput) { }
  saveEvent(event?: IEvent) {
    this.event.WebsiteId = this.website.WebsiteId;
    this.event.PageId = this.page.PageId;
    this.event.WidgetId = this.widget.WidgetId;
    this.event.CreateUserId = this.user.UserId;
    this.event.ModifyUserId = this.user.UserId;
    this.event.StatusId = 1;
    this.event.OrderNumber = 1;
    if (!this.event.EventId)
      this.event.EventId = HelperClass.getId('event');
    this.websiteService.create(`events/save-events.php`, [event || this.event]).subscribe((data: IEvent) => {
      if (data && data.WebsiteId && data.Name && data.Id) {
        this.event = data;
        console.log(this.event);
      }
    })
  }
  saveInputs() { }
  hideInputs() {
    this.event.Inputs.map(x => x.ViewOptions = false)
  }
}
