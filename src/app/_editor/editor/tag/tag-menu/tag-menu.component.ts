import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbColumnModel } from 'src/app/_classes/DbColumnModel';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
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
  @Output() setEditText: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() cloneEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() copyStyleEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() pasteStyleEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeImageEvent: EventEmitter<any> = new EventEmitter<any>();
  user: UserModel;
  SectionTypes = SectionTypes;
  showChooseTable = false;
  showFormat = false;
  showChooseInputType = false;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.websiteService.userObservable.subscribe(data => { if (data) this.user = data });

  }

  menuClicked(e: string) {
    // alert(e)
    if (e === 'edit')
      this.setEditText.emit(this.widget)
    if (e === 'delete')
      this.deleteEvent.emit(this.widget)
    if (e === 'clone')
      this.cloneEvent.emit(this.widget)
    if (e === 'click')
      this.clickEvent.emit(this.widget)
    if (e === 'copy-style')
      this.copyStyleEvent.emit(this.widget)
    if (e === 'paste-style')
      this.pasteStyleEvent.emit(this.widget)
    if (e === 'change-image')
      this.changeImageEvent.emit(this.widget)
  }
  userTable(column?: DbColumnModel) {
    if (!column) {
      this.widget.FeildName = '';
      this.dbEvent.emit(this.widget)
      this.widget.ModifyUserId = this.user.UserId || this.widget.ModifyUserId
      const iwid = WidgetHelper.mapIwidgetUpdateFromWidget(this.widget);
      this.websiteService.saveWidgetChanges(iwid)
      return;
    }
    this.widget.FeildName = column.Name;
    this.dbEvent.emit(this.widget)
    this.widget.ModifyUserId = this.user.UserId || this.widget.ModifyUserId
    const iwid = WidgetHelper.mapIwidgetUpdateFromWidget(this.widget);
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
