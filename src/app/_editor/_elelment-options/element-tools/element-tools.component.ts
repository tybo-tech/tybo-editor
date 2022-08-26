import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { EventService } from 'src/app/_services/event.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-element-tools',
  templateUrl: './element-tools.component.html',
  styleUrls: ['./element-tools.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElementToolsComponent implements OnInit {
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  user: UserModel;
  tabs = [
    { Id: 'styles', Name: '<i class="fas fa-paint-brush" style="margin-right: .5rem;"></i> Styles', Class: ['active'] },
    { Id: 'options', Name: ' <i class="fas fa-cogs" style="margin-right: .5rem;"></i>   Settings', Class: [] },
    { Id: 'data', Name: ' <i class="fas fa-database" style="margin-right: .5rem;"></i>   Data', Class: [] },
  ]
  tabId: string = this.tabs[0].Id;
  element: WidgetModel;
  constructor(private eventService: EventService, private websiteService: WebsiteService
  ) { }

  ngOnInit() {
    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });
    this.eventService.optionsObservable.subscribe(data => {
      this.element = data;
      // console.log(data);
    })
  }
  onTab(tab: any) {
    this.tabs.map(t => t.Class = [])
    tab.Class = ['active'];
    this.tabId = tab.Id;
  }
  close() {
    this.eventService.updateOptionsState(undefined);
  }

  updateWidget(element: WidgetModel) {
    if (element && element.WidgetId) {
      this.websiteService.syncWidgteNow(element, this.user?.UserId || element.CreateUserId);

    }
  }
}
