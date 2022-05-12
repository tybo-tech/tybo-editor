import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
    selector: 'app-public-section',
    templateUrl: 'public-section.component.html',
    styleUrls: ['public-section.component.scss']
})
export class PublicSectionComponent  implements OnInit{
    @Input() section: SectionModel;
    @Input() website: WebsiteModel;
    @Input() page: PageModel;
    @Input() sectionIndex: number;
    stylesToPaste: any;
    columnToPaste: import("c:/ndu/apps/tybo-website-editor/src/app/_classes/ColumnModel").ColumnModel;
    widgetToPaste: import("c:/ndu/apps/tybo-website-editor/src/app/_classes/WidgetModel").WidgetModel;
    sectionContentToPaste: SectionModel;

    constructor(private viewModeService: ViewModeService, private copyService: CopyService) { }

    ngOnInit() {
      this.section.Sort();
      // this.viewModeService.deviceModeObservable.subscribe(data => {
      //   if (data) {
      //     if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      //       this.section.SelectedStyle = this.section.ItemMobileStyle;
      //     }
  
  
      //     if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      //       this.section.SelectedStyle = this.section.ItemStyle;
      //     }
      //   }
      // });
  
  
      this.copyService.copiedItemObservable.subscribe(data => {
        if (data) {
          // debugger
          this.stylesToPaste = this.copyService.getStylesToPaste(data);
          this.columnToPaste = this.copyService.getColumnToPaste(data);
          this.widgetToPaste = this.copyService.getWidgetToPaste(data);
          this.sectionContentToPaste = this.copyService.geSectionContentToPaste(data);
        }
      });
    }
}
