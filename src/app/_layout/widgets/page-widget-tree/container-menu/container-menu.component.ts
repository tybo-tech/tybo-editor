import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-container-menu',
  templateUrl: './container-menu.component.html',
  styleUrls: ['./container-menu.component.scss']
})
export class ContainerMenuComponent implements OnInit {
  @Input() widget: WidgetModel;
  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  @Output() menuEvent: EventEmitter<any> = new EventEmitter<any>()
  user: UserModel;
  SectionTypes = SectionTypes;
  showChooseTable = false;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.websiteService.userObservable.subscribe(data => { if (data) this.user = data });

  }

  menuClicked(e: string) {
    // alert(e)
    this.menuEvent.emit(e)
  }
  userTable(table: DbTableModel) {
    if (!table)
      return;
    this.widget.DbTable = table.Name;
    this.widget.ModifyUserId = this.user.UserId || this.widget.ModifyUserId
    const iwid = WidgetHelper.mapIwidgetUpdateFromWidget(this.widget);
    this.websiteService.saveWidgetChanges(iwid)


    if (!this.website.TableIdListString.find(x => x === table.TableId)) {
      this.website.TableIdListString.push(table.TableId)
      this.websiteService.saveWebsiteChanges({
        Name: this.website.Name,
        Title: this.website.Title,
        Url: this.website.Url,
        Logo: this.website.Logo,
        Category: this.website.Category,
        SubCategory: this.website.SubCategory,
        Icon: this.website.Icon,
        ItemClass: this.website.ItemClass,
        TableIdListString: this.website.TableIdListString,
        ModifyUserId: this.user?.UserId || this.website.ModifyUserId,
        StatusId: this.website.StatusId,
        WebsiteId: this.website.WebsiteId
      });
    }
  }
}
