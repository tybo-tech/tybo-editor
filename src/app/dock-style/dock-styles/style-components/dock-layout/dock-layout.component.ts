import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayModel } from 'src/app/_classes/DisplayModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { DisplayKeys } from 'src/app/_classes/_statics/DisplayKeys';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-layout',
  templateUrl: './dock-layout.component.html',
  styleUrls: ['./dock-layout.component.scss']
})
export class DockLayoutComponent implements OnInit {

  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  gab: number;
  options: DisplayModel[] = [
    new DisplayModel(DisplayKeys.FLEX_DIRECTION_ROW.Value, '', 'assets/images/arrow-right.svg', '', []),
    new DisplayModel(DisplayKeys.FLEX_DIRECTION_COLUMN.Value, '', 'assets/images/arrow-down.svg', '', []),
    new DisplayModel(DisplayKeys.FLEX_DIRECTION_ROW_REVERSE.Value, '', 'assets/images/arrow-left.svg', '', []),
    new DisplayModel(DisplayKeys.FLEX_DIRECTION_COLUMN_REVERSE.Value, '', 'assets/images/arrow-up.svg', '', [])
  ];


  alignsVertical: DisplayModel[] = [
    new DisplayModel(DisplayKeys.FLEX_ALIGN_START.Value, '', 'assets/images/align-top.svg', '', []),
    new DisplayModel(DisplayKeys.FLEX_ALIGN_CENTER.Value, '', 'assets/images/align-center-v.svg', '', []),
    new DisplayModel(DisplayKeys.FLEX_ALIGN_END.Value, '', 'assets/images/align-bottom.svg', '', []),
  ];


  alignsHorizontal: DisplayModel[] = [
    new DisplayModel(DisplayKeys.ALIGN_LEFT, '', 'assets/images/align-left.svg', '', []),
    new DisplayModel(DisplayKeys.ALIGN_CENTER_HORIZONTALY, '', 'assets/images/align-center-h.svg', '', []),
    new DisplayModel(DisplayKeys.ALIGN_RIGHT, '', 'assets/images/align-right.svg', '', []),
    new DisplayModel(DisplayKeys.ALIGN_TOP, '', 'assets/images/align-top.svg', '', []),
    new DisplayModel(DisplayKeys.ALIGN_CENTER_VERTICALY, '', 'assets/images/align-center-v.svg', '', []),
    new DisplayModel(DisplayKeys.ALIGN_BOTTOM, '', 'assets/images/align-bottom.svg', '', []),
  ];
  constructor(private websiteService: WebsiteService, private syncService: SyncService) { }

  ngOnInit(): void {
    // console.log(this.options.map(x=>x.DisplayId));

  }
  displayClick(display: DisplayModel) {
    debugger
    if (this.widget.SelectedClass) {
      display.DisplayClick(this.widget, this.website);
      this.websiteService.updateWebsieState(this.website);
      this.syncService.updateStyleState(this.widget.SelectedClass)
    }
  }
  emit(){}
}
