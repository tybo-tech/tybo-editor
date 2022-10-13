import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-page-widget',
  templateUrl: './page-widget.component.html',
  styleUrls: ['./page-widget.component.scss']
})
export class PageWidgetComponent implements OnInit {
  @Input() widget: WidgetModel;
  @Input() page: PageModel;
  @Input() isPublic: boolean;
  @Input() dataId: any;
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
 

  onImageChange(event: string, widget: WidgetModel) {
    widget.ItemContent = event;
  }
  valueChanged(event: string, widget: WidgetModel) {
    // debugger
    if (widget.ParentWidget && widget.ParentWidget.Children) {
      const child = widget.ParentWidget.Children.find(x => x.WidgetId === widget.RelatedId);
      if (child) {
        child.ItemContent = event;
        Emitters.dyanamicEmmiter.emit(true);
      }
      return
    }
    widget.ItemContent = event;
  }
  deleteEvent(e: any) {
    if (!e)
      return;
    if (e === 'delete' && this.page) {
      const childrenToDelete = WidgetHelper.getChildrenToDelete([], this.widget);
      childrenToDelete.forEach(c => {
        this.website.WidgetsToDelete.push(c);
      });
      console.log(this.website);
      
      this.page.RecursiveWidget(this.page.Widgets, this.widget.WidgetId);
    }
  }


}
