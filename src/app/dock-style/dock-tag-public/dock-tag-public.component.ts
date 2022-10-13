import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EVENT_NAMES, IEmailEvent } from 'src/app/_classes/IEvent';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { EventHelper } from 'src/app/_classes/_statics/EventHelper';
import { EventTypes } from 'src/app/_classes/_statics/EventTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dock-tag-public',
  templateUrl: './dock-tag-public.component.html',
  styleUrls: ['./dock-tag-public.component.scss']
})
export class DockTagPublicComponent implements OnInit {

  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  @Input() widget: WidgetModel;
  SectionTypes = SectionTypes;

  constructor(private websiteService: WebsiteService, private router: Router) { }

  ngOnInit(): void {
   
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

}
