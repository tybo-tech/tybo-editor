import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EVENTS, EVENT_NAMES, IEmailEvent } from 'src/app/_classes/IEvent';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { EventHelper } from 'src/app/_classes/_statics/EventHelper';
import { EventTypes } from 'src/app/_classes/_statics/EventTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';
import { WebsiteService } from 'src/app/_services/website.service';
import { environment } from 'src/environments/environment';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

@Component({
  selector: 'app-public-tag',
  templateUrl: './public-tag.component.html',
  styleUrls: ['./public-tag.component.scss']
})
export class PublicTagComponent implements OnInit {

  public width: number;
  public height: number;
  public left: number;
  public top: number;
  @Input('widget') public widget: WidgetModel;
  @Input('website') public website: WebsiteModel;
  @Input('page') public page: PageModel;
  @ViewChild("box") public box: ElementRef;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Input() dataId: any;

  public mouse: { x: number, y: number }
  public status: Status = Status.OFF;
  SectionTypes = SectionTypes;
  DeviceTypes = DeviceTypes;
  backgroundImg: any;
  showImage: boolean;
  editText: boolean;
  widgets: WidgetModel[] = [];
  showPasteStyles: boolean;
  // SelectedClass: WebstyleModel;

  constructor(private router: Router, private sanitizer: DomSanitizer, private eventService: EventService, private websiteService: WebsiteService, private copyService: CopyService) { }
  ngOnInit() {


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
    if (this.dataId)
      this.dbEvent();

    if (this.widget && this.widget.ItemType === SectionTypes.IMAGE) {
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.widget.ItemContent + ')');
    }
  }


  itemClicked() {
    if (this.widget.Events && this.widget.Events.length) {
      const currentEvent = this.widget.Events[0];
      console.log(currentEvent);
      if (currentEvent.Name === EVENT_NAMES.SEND_EMAIL.Name) { // Email
        const email: IEmailEvent = {
          FromEmail: WidgetHelper.GetFeildValue(currentEvent.Inputs.find(x => x.Name === 'FromEmail')?.SourceId || '', this.page) || '',
          ToEmail: currentEvent.Inputs.find(x => x.Name === 'ToEmail')?.Source || '',
          Subject: currentEvent.Inputs.find(x => x.Name === 'Subject')?.Source || '',
          Body: WidgetHelper.GetFeildValue(currentEvent.Inputs.find(x => x.Name === 'Body')?.SourceId || '', this.page) || '',
        }

        this.websiteService.create(`email/general-email-range.php`, [email]).subscribe(data => {
          console.log(data);

        })
      }

      if (currentEvent.Name === EVENT_NAMES.TOGGLE.Name && currentEvent.Inputs?.length) {
        // alert(currentEvent.Name);
        let elementToShow: WidgetModel = WidgetHelper.getWidget(this.page.Widgets, currentEvent.Inputs[0].SourceId || '');
        if (!elementToShow && this.website.Header)
          elementToShow = WidgetHelper.getWidget([this.website.Header], currentEvent.Inputs[0].SourceId || '');;

        if (!elementToShow)
          return;
        EventHelper.ToggleElelent(elementToShow, this.website);
        this.websiteService.updateWebsieState(this.website)
        return
      }
      if (currentEvent.Name === EVENT_NAMES.SHOW.Name && currentEvent.Inputs?.length) {
        let elementToShow: WidgetModel = WidgetHelper.getWidget(this.page.Widgets, currentEvent.Inputs[0].SourceId || '');
        if (!elementToShow && this.website.Header)
          elementToShow = WidgetHelper.getWidget([this.website.Header], currentEvent.Inputs[0].SourceId || '');;

        if (!elementToShow)
          return;
          EventHelper.ShowElelent(elementToShow, this.website);
          this.websiteService.updateWebsieState(this.website)
        return
      }


      if (currentEvent.Name === EVENT_NAMES.HIDE.Name && currentEvent.Inputs?.length) {
        let elementToShow: WidgetModel = WidgetHelper.getWidget(this.page.Widgets, currentEvent.Inputs[0].SourceId || '');
        if (!elementToShow && this.website.Header)
          elementToShow = WidgetHelper.getWidget([this.website.Header], currentEvent.Inputs[0].SourceId || '');;

        if (!elementToShow)
          return;
          EventHelper.HideElelent(elementToShow, this.website);
          this.websiteService.updateWebsieState(this.website)
        return
      }

      if (currentEvent.Name === EVENT_NAMES.HIDE.Name) {
        alert(currentEvent.Name);
        return
      }

      return;
    }
    if (this.widget.ItemEventName === EventTypes.GO_TO_LINK) { }
    if (this.widget.ItemEventName === EventTypes.GO_TO_PAGE) {
      let id = '';
      if (this.widget.UrlId)
        id = `/${this.widget.UrlValue}`
      if (environment.production) {
        this.router.navigate([`${this.widget.ItemEvent}${id}`])
      } else {
        this.router.navigate([`pages/${this.widget.ItemEvent}${id}`])
      }
    }
  }
  dbEvent() {
    if (this.dataId && this.page && this.page.PageData && this.page.TableName && this.page.UrlId && this.widget.FeildName && this.page.PageData[this.widget.FeildName]) {
      this.widget.ItemContent = this.page.PageData[this.widget.FeildName]
    } else {
      this.widget.ItemContent = this.widget.ItemContent
    }
  }
}
