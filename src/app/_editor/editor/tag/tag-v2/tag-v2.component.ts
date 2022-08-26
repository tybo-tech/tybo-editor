import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'tag-v2',
  templateUrl: './tag-v2.component.html',
  styleUrls: ['./tag-v2.component.scss']
})
export class TagV2Component implements OnInit {
  @Input('widget') public widget: WidgetModel;
  @Input('website') public website: WebsiteModel;
  @Input('page') public page: PageModel;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  SectionTypes = SectionTypes;
  backgroundImg: any;
  editText: any;
  showImage: boolean;
  user: UserModel;
  showEvents: boolean;
  constructor(
    private sanitizer: DomSanitizer,
    private eventService: EventService,
    private websiteService: WebsiteService,
    private copyService: CopyService,
    private syncService: SyncService
  ) { }

  ngOnInit(): void {

    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });
    if (this.widget && this.widget.ItemType === SectionTypes.IMAGE) {
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.widget.ItemContent + ')');

    }
    
  }
  toggleOptions() {
    // debugger
    if (this.widget.ShowOptions)
      return;

    WidgetHelper.removeClass(this.page.Widgets, 'active-node')
    if (this.website.Header){
      WidgetHelper.removeClass([this.website.Header], 'active-node')
      WidgetHelper.removeShowOptions([this.website.Header])
    }
    WidgetHelper.removeShowOptions(this.page.Widgets)
    this.widget.ItemClass.push('active-node');
    this.editText != !this.editText;
    WidgetHelper.toggleOptions(this.page.Widgets)
    this.eventService.updateOptionsState(undefined);
    setTimeout(() => {
      this.widget.ShowOptions = true;
      if (this.widget.ShowOptions) {
        this.eventService.updateOptionsState(this.widget)
      }
      else
        this.eventService.updateOptionsState(undefined);
    }, 100)
  }

  dbEvent() {
    if (this.page && this.page.PageData && this.page.TableName && this.page.UrlId && this.widget.FeildName && this.page.PageData[this.widget.FeildName]) {
      this.widget.ItemContent = this.page.PageData[this.widget.FeildName]
    } else {
      this.widget.ItemContent = this.widget.ItemContent
    }
  }

  changeImageEvent(){
    this.showImage = true;
  }

  onImageSelect(image: ImageModel) {
    // debugger
    this.showImage = false;
    if (this.widget.ParentWidget) {
      if (this.widget.GrandParent) {
        this.widget.ParentWidget.ItemContent = image.Url;
        this.websiteService.syncWidgteNow(this.widget.ParentWidget, this.user?.UserId || this.widget.GrandParent.CreateUserId)
        this.widget.GrandParent.Children = WidgetHelper.removeDynamicWidgets(this.widget.GrandParent.Children);
        WidgetHelper.proccessWidget(this.widget.GrandParent, this.website, this.page);
        // this.syncService.updateWidgetState(this.widget.ParentWidget, this.user?.UserId || this.widget.GrandParent.CreateUserId)
      }
      return;
    }
    this.widget.ItemContent = image.Url
    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.widget.ItemContent + ')');
    this.syncService.updateWidgetState(this.widget, this.user?.UserId || this.widget.CreateUserId)
  }

  delete() {


    if (this.widget.ParentWidget) {
      // debugger
      if (this.widget.GrandParent) {
        this.websiteService.create(`widgets/delete-widgets-range.php`, [this.widget.ParentWidget]).subscribe(data => { });
        const template = this.widget.GrandParent?.Children?.find(x => x.IsTemplate);
        if (template) {
          template.Children = template.Children?.filter(x => x.WidgetId !== this.widget.ParentWidget.WidgetId) || [];
        }
        this.widget.GrandParent.Children = WidgetHelper.removeDynamicWidgets(this.widget.GrandParent.Children);
        WidgetHelper.proccessWidget(this.widget.GrandParent, this.website, this.page);
      }
    }
    else {
      this.deleteEvent.emit('delete')
      this.websiteService.create(`widgets/delete-widgets-range.php`, [this.widget]).subscribe(data => { });
    }
  }

  clone() {
    const parent: WidgetModel = WidgetHelper.getWidget(this.page.Widgets, this.widget.ParentId);
    if (parent) {
      const copy = WidgetHelper.pasteWidget(this.widget, parent, this.website);
      if (copy) {
        parent.Children.push(copy);
        this.websiteService.saveAddedWidget(copy, this.website);
      }
    }



  }
  onClickEvent() {
    this.showEvents = true;
  }

  copyStyles() {
    if (this.widget && this.widget.SelectedClass)
      this.copyService.copy(this.widget.SelectedClass);
  }
  pasteStyles() {

    this.copyService.copiedItemObservable.subscribe(data => {
      if (data && data.SelectorName) {
        if (this.widget && this.widget.SelectedClass) {
          this.widget = WidgetHelper.pasteStyles(this.widget, data, this.website)
          this.syncService.updateWidgetState(this.widget, this.user?.UserId || this.widget.CreateUserId)
          this.websiteService.updateWebsieState(this.website);
        }
      }
    })
  }

  setEditText() {
    this.editText = true;
    // setTimeout(() => {
    //   this.box.nativeElement.focus();
    // }, 1);
  }
}
