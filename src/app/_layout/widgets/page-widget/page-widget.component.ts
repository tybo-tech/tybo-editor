import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-page-widget',
  templateUrl: './page-widget.component.html',
  styleUrls: ['./page-widget.component.scss']
})
export class PageWidgetComponent implements OnInit {
  @Input() widget: WidgetModel;
  @Input() page: PageModel;
  SectionTypes = SectionTypes;
  website: WebsiteModel;
  stylesToPaste: any;
  constructor(private w: WebsiteService) { }

  ngOnInit(): void {
    this.w.websiteObservable.subscribe(ww => {
      if (ww)
        this.website = ww;
    })
  }
  onStyleChange(event: any) {
    if (!event)
      return
    if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      this.widget.ItemMobileStyle = event;
    }


    if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      this.widget.ItemStyle = event;
    }
  }

  onImageChange(event: string, widget: WidgetModel) {
    widget.ItemContent = event;
  }
  valueChanged(event: string, widget: WidgetModel) {
    widget.ItemContent = event;
  }
  deleteEvent(e: any) {
    if (e) {
      alert(e)
      // this.container.DeleteWidget(this.index);
      // if (this.widget._id)
      //     this.websiteService.delete(`widgets/${this.widget._id}`).subscribe(data => {
      //         console.log(data);
      //     })
    }
  }

  onCopyEvent(event: any) {
    if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      this.widget.ItemMobileStyle = this.stylesToPaste;
    }

    if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      this.widget.ItemStyle = this.stylesToPaste;
    }

    this.widget.SelectedStyle = this.stylesToPaste;
  }
}
