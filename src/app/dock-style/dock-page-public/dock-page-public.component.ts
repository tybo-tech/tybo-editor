import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';


@Component({
  selector: 'app-dock-page-public',
  templateUrl: './dock-page-public.component.html',
  styleUrls: ['./dock-page-public.component.scss']
})
export class DockPagePublicComponent implements OnInit {
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  @Input() widget: WidgetModel;
  SectionTypes = SectionTypes;
  constructor() { }

  ngOnInit(): void {
    WidgetHelper.proccessWidget(this.widget, this.website, this.page);
  }


}
