import { Component, Input, OnInit } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-styles',
  templateUrl: './dock-styles.component.html',
  styleUrls: ['./dock-styles.component.scss']
})
export class DockStylesComponent implements OnInit {
  widget: WidgetModel;
  @Input() website: WebsiteModel;
  SectionTypes = SectionTypes;
  constructor(private eventService: EventService, private websiteService: WebsiteService, private syncService: SyncService) { }

  ngOnInit(): void {
    this.eventService.optionsObservable.subscribe(data => {
      this.widget = data;
    })
  }

  close(){
    this.eventService.updateOptionsState(undefined);
  }
  styleChaged(style: IKeyValueModel) {
    if (!this.website)
      return;
    if (this.deleteZeroBorder(style)) {
      WidgetHelper.removeCassClass(this.website, this.widget, style.Key)
      this.websiteService.updateWebsieState(this.website);
      return;
    }
    if (this.deleteZeroPadding(style)) {
      WidgetHelper.removeCassClass(this.website, this.widget, style.Key)
      this.websiteService.updateWebsieState(this.website);
      return;
    }


    const styles = WidgetHelper.updateCassClass(this.website, this.widget, style.Key, style.Value, '');
    if (styles && this.widget.SelectedClass) {
      this.websiteService.updateWebsieState(this.website);
      this.syncService.updateStyleState(this.widget.SelectedClass)
    }

  }

  deleteZeroBorder(style: IKeyValueModel) {
    if (
      (style.Key === 'border-right' ||
        style.Key === 'border-left' ||
        style.Key === 'border' ||
        style.Key === 'border-top' ||
        style.Key === 'border-bottom') &&

        style.Value == "0px"
    ) {
      return true;
    }
    return false
  }
  deleteZeroPadding(style: IKeyValueModel) {
    if (
      (style.Key === 'padding-right' ||
        style.Key === 'padding-left' ||
        style.Key === 'padding' ||
        style.Key === 'padding-top' ||
        style.Key === 'padding-bottom') &&

      style.Value == "0px"
    ) {
      return true;
    }
    return false
  }
}
