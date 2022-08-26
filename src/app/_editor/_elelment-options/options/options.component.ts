import { Component, Input, OnInit } from '@angular/core';
import { DbColumnModel } from 'src/app/_classes/DbColumnModel';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { IOptions, IInput } from 'src/app/_classes/IOptions';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DataKeys } from 'src/app/_classes/_statics/DataTypes';
import { EventTypes } from 'src/app/_classes/_statics/EventTypes';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  styles: IOptions[] = CONFIG_ITEMS;
  @Input() element: WidgetModel;
  @Input() type: any;
  pages: PageModel[];
  page?: PageModel;
  user: UserModel;
  tables: DbTableModel[];
  table?: DbTableModel;
  EventTypes = EventTypes;
  constructor(private websiteService: WebsiteService, private syncService: SyncService) {

  }

  ngOnInit() {
    console.log(this.element);
    if (this.element)
      this.websiteService.websiteObservable.subscribe(data => {
        if (data) {
          this.pages = data.Pages;
          this.tables = data.DbTables;
          this.eventChanged()
        }
      })

    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });

    this.styles[0].Url = this.element.ItemEvent
  }

  eventChanged() {
    if (this.element.ItemEvent && this.tables && this.tables.length) {
      const page = this.pages?.find(x => x.Url === this.element.ItemEvent);
      if (page && page.UrlId && page.TableName) {
        this.table = this.tables.find(x => x.Name === page.TableName);
      }


    }
    if (this.element.ParentWidget) {
      this.element.ParentWidget.ItemEventName = this.element.ItemEventName
      this.element.ParentWidget.ItemEvent = this.element.ItemEvent
      this.element.ParentWidget.UrlId = this.element.UrlId
      this.syncService.empyWidgets();
      this.syncService.updateWidgetState(this.element.ParentWidget, this.user?.UserId || this.element.CreateUserId)
      return
    }
    this.syncService.empyWidgets();
    this.syncService.updateWidgetState(this.element, this.user?.UserId || this.element.CreateUserId)
  }
}



export const CONFIG_ITEMS: IOptions[] =
  [
    {
      SectionName: 'Click',
      IsOpen: true,
      Type: EventTypes.GO_TO_LINK,
      Inputs: undefined,
      Url: '',
      EventOptions: [{ Action: 'None' }, { Action: EventTypes.GO_TO_PAGE }, { Action: EventTypes.GO_TO_LINK }]
    }
  ];

