import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
  selector: 'app-public-form',
  templateUrl: './public-form.component.html',
  styleUrls: ['./public-form.component.scss']
})
export class PublicFormComponent implements OnInit {

  @Input() column: ColumnModel;
  @Input() index: number;
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;

  constructor(
    private viewModeService: ViewModeService
  ) { }


  ngOnInit() {
    this.widget.ShowMiniMenu = false;
    this.widget.ShowOptions = false;
    // this.viewModeService.deviceModeObservable.subscribe(data => {
    //   if (data) {
    //     if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
    //       this.widget.SelectedStyle = this.widget.ItemMobileStyle;
    //       this.showMenu = false;
    //       this.showToggle = true;
    //     }


    //     if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
    //       this.widget.SelectedStyle = this.widget.ItemStyle;
    //       this.showMenu = true;
    //       this.showToggle = false;
    //     }
    //   }
    // });
 
  }

}
