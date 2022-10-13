import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbColumnModel } from 'src/app/_classes/DbColumnModel';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { ItemCategories } from 'src/app/_classes/_statics/ItemCategories';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-tag-menu',
  templateUrl: './tag-menu.component.html',
  styleUrls: ['./tag-menu.component.scss']
})
export class TagMenuComponent implements OnInit {

  @Input() widget: WidgetModel;
  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  @Output() dbEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() menuEvent: EventEmitter<string> = new EventEmitter<string>();
  user: UserModel;
  SectionTypes = SectionTypes;
  showChooseTable = false;
  showFormat = false;
  ItemCategories = ItemCategories;
  showChooseInputType = false;
  showChooseField = false;
  table: DbTableModel;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.websiteService.userObservable.subscribe(data => { if (data) this.user = data });
    if (this.widget.GrandParent?.DbTable && this.website) {
      this.loadFieldList(this.widget.GrandParent?.DbTable);
    }

  }
  loadFieldList(tableName: string) {
    const table = this.website.DbTables.find(x => x.Name.toLowerCase() === tableName.toLocaleLowerCase());
    if (table) {
      this.table = table;
      console.log(table);
      
    }
  }

  triggerMenuEvent(e: string) {
    if (e)
      this.menuEvent.emit(e)
  }

  selectField(column?: DbColumnModel) {
    if (!column) {
      this.widget.ParentWidget.FeildName = '';
      this.dbEvent.emit(this.widget)
      this.widget.ModifyUserId = this.user.UserId || this.widget.ModifyUserId
      const iwid = WidgetHelper.mapIwidgetUpdateFromWidget(this.widget.ParentWidget);
      this.websiteService.saveWidgetChanges(iwid)
      return;
    }
    this.widget.ParentWidget.FeildName = column.Name;
    this.dbEvent.emit(this.widget)
    this.widget.ModifyUserId = this.user.UserId || this.widget.ModifyUserId
    const iwid = WidgetHelper.mapIwidgetUpdateFromWidget(this.widget.ParentWidget);
    this.websiteService.saveWidgetChanges(iwid)
  }
  selectFormat(e: string) {
    this.showFormat = false;
    this.widget.ItemFormat = e;
    this.dbEvent.emit(this.widget)
    this.widget.ModifyUserId = this.user.UserId || this.widget.ModifyUserId
    const iwid = WidgetHelper.mapIwidgetUpdateFromWidget(this.widget);
    this.websiteService.saveWidgetChanges(iwid)
  }
}
