import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbCollectionModel } from 'src/app/_classes/DbCollectionModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { EventService } from 'src/app/_services/event.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-page-public-tree',
  templateUrl: './page-public-tree.component.html',
  styleUrls: ['./page-public-tree.component.scss']
})
export class PagePublicTreeComponent implements OnInit, AfterViewInit {

  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  @Input() widget: WidgetModel;
  @Input() dataId: string;
  @ViewChild('section') section: ElementRef;
  SectionTypes = SectionTypes;
  selectedTreeNode: WidgetModel;
  isPublic = true;

  constructor(private router: Router, private eventService: EventService, private websiteService: WebsiteService) { }


  ngOnInit(): void {
    console.log(this.dataId);
    
    this.page.Widgets = WidgetHelper.removeDynamicWidgets(this.page.Widgets);

    this.widget = WidgetHelper.proccessWidget(this.widget, this.website, this.page);

  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   if (this.section) {
    //     console.log(this.section.nativeElement.offsetWidth);

    //   }

    // }, 1);
  }
  widgetClicked(event: string, widget: WidgetModel) {
    if (event && widget) {
      // alert(widget.ItemEvent)
      if (widget.ItemEvent && widget.RouteId)
        this.navigate(widget.ItemEvent + ("/" + widget.RouteId || ''))

      if (widget.ItemEvent && !widget.RouteId)
        this.navigate(widget.ItemEvent)

    }
  }
  navigate(url: string) {
    if (url) {
      if (!url.includes("pages") && url != '/') {
        this.page.Widgets = WidgetHelper.removeDynamicWidgets(this.page.Widgets);
        url = `/pages${url}`;
        this.router.navigate([url.trim()]);
      }
    }
  }
}
