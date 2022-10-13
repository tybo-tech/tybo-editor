import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { GroupHelper } from 'src/app/_classes/_statics/GroupHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { GroupService } from 'src/app/_services/group.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-stack',
  templateUrl: './dock-stack.component.html',
  styleUrls: ['./dock-stack.component.scss']
})
export class DockStackComponent implements OnInit {
  show: any;
  selectedWidgets: WidgetModel[];
  @Input() website: WebsiteModel;
  @Input() page: PageModel;

  constructor(private groupService: GroupService, private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.groupService.groupObservable.subscribe(data => {
      this.show = data;
    })
  }
  stack() {
    this.selectedWidgets = WidgetHelper.GetSelectedWidgets(this.page.Widgets);
    const container = GroupHelper.GroupItems(this.selectedWidgets, this.website, this.page);
    if (container) {
      this.websiteService.saveAddedWidget(container, this.website);
      this.websiteService.saveWidgetsRange(container.Children, this.website);

    }
    this.websiteService.updateWebsieState(this.website)

  }
}
