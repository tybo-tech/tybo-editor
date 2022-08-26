import { style } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WebstyleModel } from 'src/app/_classes/WebstyleModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';
const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}
@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  public width: number;
  public height: number;
  public left: number;
  public top: number;
  @Input('widget') public widget: WidgetModel;
  @Input('website') public website: WebsiteModel;
  @Input('page') public page: PageModel;
  @ViewChild("box") public box: ElementRef;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  private boxPosition: { left: number, top: number };
  private containerPos: { left: number, top: number, right: number, bottom: number };
  public mouse: { x: number, y: number }
  public status: Status = Status.OFF;
  private mouseClick: { x: number, y: number, left: number, top: number }
  SectionTypes = SectionTypes;
  DeviceTypes = DeviceTypes;
  backgroundImg: any;
  showImage: boolean;
  showEvents: boolean;
  editText: boolean;
  widgets: WidgetModel[] = [];
  showPasteStyles: boolean;
  user: UserModel;
  // SelectedClass: WebstyleModel;

  constructor(
    private sanitizer: DomSanitizer,
    private eventService: EventService,
    private websiteService: WebsiteService,
    private copyService: CopyService,
    private syncService: SyncService
  ) { }
  ngOnInit() {
    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });
    this.loadPosition();
    // if (this.widget && this.widget.ItemClass && this.widget.ItemClass.length) {
    //   this.widget.SelectedClass = this.widget.ItemClass[0];
    // }

    this.dbEvent();

    if (this.widget && this.widget.ItemType === SectionTypes.IMAGE) {
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.widget.ItemContent + ')');

    }
    this.websiteService.pageObservable.subscribe(page => {
      if (page)
        this.widgets = page.Widgets;
    });

    this.copyService.copiedItemObservable.subscribe(data => {
      // debugger
      if (data && data.SelectorName) {
        this.showPasteStyles = true;
      }
    })
  }

  ngAfterViewInit() {
    this.loadBox();
    this.loadContainer();
  }

  loadPosition() {
    if (this.website) {
      this.website = this.website;
      if (!this.website.ViewDevice || this.website.ViewDevice === this.DeviceTypes.PC) {
        this.left = +this.widget.Settings["PcX"]
        this.top = +this.widget.Settings["PcY"]
        this.width = +this.widget.Settings["PcW"]
        this.height = +this.widget.Settings["PcH"]
      }
      if (this.website.ViewDevice === this.DeviceTypes.TABLET) {
        this.left = +this.widget.Settings["TabX"]
        this.top = +this.widget.Settings["TabY"]
        this.width = +this.widget.Settings["TabW"]
        this.height = +this.widget.Settings["TabH"]
      }
      if (this.website.ViewDevice === this.DeviceTypes.PHONE) {
        this.left = +this.widget.Settings["PhoneX"]
        this.top = +this.widget.Settings["PhoneY"]
        this.width = +this.widget.Settings["PhoneW"]
        this.height = +this.widget.Settings["PhoneH"]
      }
      this.updateStyleClass()

    }
  }

  setSettings() {
    if (!this.website)
      return;
    if (!this.website.ViewDevice || this.website.ViewDevice === this.DeviceTypes.PC) {
      this.widget.Settings["PcX"] = this.left;
      this.widget.Settings["PcY"] = this.top;
      this.widget.Settings["PcW"] = this.width;
      this.widget.Settings["PcH"] = this.height;
    }
    if (this.website.ViewDevice === this.DeviceTypes.TABLET) {
      this.widget.Settings["TabX"] = this.left;
      this.widget.Settings["TabY"] = this.top;
      this.widget.Settings["TabW"] = this.width;
      this.widget.Settings["TabH"] = this.height;
    }
    if (this.website.ViewDevice === this.DeviceTypes.PHONE) {
      this.widget.Settings["PhoneX"] = this.left;
      this.widget.Settings["PhoneY"] = this.top;
      this.widget.Settings["PhoneW"] = this.width;
      this.widget.Settings["PhoneH"] = this.height;
    }

  }

  private loadBox() {
    if (!this.box) return;
    const { left, top } = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
    // var new_row = document.createElement('div');
    // new_row.className = "resize-action";

    // this.box.nativeElement.appendChild(new_row)
  }

  private loadContainer() {
    if (!this.boxPosition) return;
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    const right = left + 600;
    const bottom = top + 450;
    this.containerPos = { left, top, right, bottom };
  }

  setStatus(event: MouseEvent, status: number) {
    if (status === 1) event.stopPropagation();
    if (status === 2) this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
    else this.loadBox();
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // event.preventDefault();
    this.mouse = { x: event.clientX, y: event.clientY };

    if (this.status === Status.RESIZE) this.resize();
    else if (this.status === Status.MOVE) this.move();
  }



  private resize() {
    if (this.resizeCondMeet()) {
      this.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
      this.setSettings();
      this.updateStyleClass();

    }
  }

  private resizeCondMeet() {
    return true;
    return (this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom);
  }

  private move() {
    if (this.moveCondMeet()) {
      this.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
      this.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
      this.setSettings();
      this.updateStyleClass()

    }
  }

  private moveCondMeet() {
    return true;
    const offsetLeft = this.mouseClick.x - this.boxPosition.left;
    const offsetRight = this.width - offsetLeft;
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.height - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft &&
      this.mouse.x < this.containerPos.right - offsetRight &&
      this.mouse.y > this.containerPos.top + offsetTop &&
      this.mouse.y < this.containerPos.bottom - offsetBottom
    );
  }
  textChanged() {
    this.onImageSelect(new ImageModel(this.widget.ItemContent))
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

  toggleOptions() {
    // debugger
    if (this.widget.ShowOptions)
      return;

    WidgetHelper.removeClass(this.page.Widgets, 'active-node')
    WidgetHelper.removeShowOptions(this.page.Widgets)
    this.widget.ItemClass.push('active-node');
    this.editText != !this.editText;
    WidgetHelper.toggleOptions(this.widgets)
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

  setEditText() {
    this.editText = true;
    setTimeout(() => {
      this.box.nativeElement.focus();
    }, 1);
  }

  copyElement() {
    this.copyService.copy(this.widget);
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

  finish() {
    this.editText = !this.editText;
    this.widget.ShowOptions = false;
    this.syncService.empyWidgets();
    this.textChanged();
  }

  updateStyleClass() {
    if (this.widget && this.widget.ItemClass && this.widget.ItemClass.length) {
      this.widget.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.widget.ItemClass[0]) || undefined;

    }
    if (this.widget && this.widget.SelectedClass) {

      if (!this.widget.SelectedClass.PcStyles)
        this.widget.SelectedClass.PcStyles = {};

      if (!this.widget.SelectedClass.PhoneStyles)
        this.widget.SelectedClass.PhoneStyles = {};

      if (!this.widget.SelectedClass.TabStyles)
        this.widget.SelectedClass.TabStyles = {};

      if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
        this.widget.SelectedClass.PcStyles['transform'] = `translate3d(${this.left}px,${this.top}px,0px)`;
        this.widget.SelectedClass.PcStyles['width'] = this.width + 'px';
        this.widget.SelectedClass.PcStyles['height'] = this.height + 'px';
        if (this.widget.ItemType === SectionTypes.IMAGE) {
          this.widget.SelectedClass.PhoneStyles['object-fit'] = 'cover';
          this.widget.SelectedClass.PhoneStyles['background-position'] = 'center';
        }
      }

      if (this.website.ViewDevice === DeviceTypes.TABLET) {
        this.widget.SelectedClass.TabStyles['transform'] = `translate3d(${this.left}px,${this.top}px,0px)`;
        this.widget.SelectedClass.TabStyles['width'] = this.width + 'px';
        this.widget.SelectedClass.TabStyles['height'] = this.height + 'px';
        if (this.widget.ItemType === SectionTypes.IMAGE) {
          this.widget.SelectedClass.PhoneStyles['object-fit'] = 'cover';
          this.widget.SelectedClass.PhoneStyles['background-position'] = 'center';
        }
      }
      if (this.website.ViewDevice === DeviceTypes.PHONE) {
        this.widget.SelectedClass.PhoneStyles['transform'] = `translate3d(${this.left}px,${this.top}px,0px)`;
        this.widget.SelectedClass.PhoneStyles['width'] = this.width + 'px';
        this.widget.SelectedClass.PhoneStyles['height'] = this.height + 'px';
        if (this.widget.ItemType === SectionTypes.IMAGE) {
          this.widget.SelectedClass.PhoneStyles['object-fit'] = 'cover';
          this.widget.SelectedClass.PhoneStyles['background-position'] = 'center';
        }

      }

      this.websiteService.updateWebsieState(this.website);
      this.syncService.updateStyleState(this.widget.SelectedClass)
      this.syncService.empyWidgets();
      if (this.widget.ParentWidget) {
        if (this.widget.GrandParent) {
          this.syncService.updateWidgetState(this.widget.ParentWidget, this.user?.UserId || this.widget.GrandParent.CreateUserId)
        }
      }

      else {
        this.syncService.updateWidgetState(this.widget, this.user?.UserId || this.widget.CreateUserId)

      }

    }
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
  dbEvent() {
    if (this.page && this.page.PageData && this.page.TableName && this.page.UrlId && this.widget.FeildName && this.page.PageData[this.widget.FeildName]) {
      this.widget.ItemContent = this.page.PageData[this.widget.FeildName]
    } else {
      this.widget.ItemContent = this.widget.ItemContent
    }
  }
}