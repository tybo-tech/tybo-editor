import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { MENU_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
  selector: 'app-public-menu',
  templateUrl: './public-menu.component.html',
  styleUrls: ['./public-menu.component.scss']
})
export class PublicMenuComponent implements OnInit {


  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Input() column: ColumnModel;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  stylesToPaste: any;
  showMenu: boolean;
  showToggle: boolean;
  miniMenu = MENU_MINI_MENU;
  isBurgerMenu: boolean;
  menuItemWrapper: WidgetModel;
  menuItems: WidgetModel[];

  constructor(
    private router: Router
  ) { }


  ngOnInit() {
    console.log("Menu:", this.widget);
    this.widget.ShowMiniMenu = false;
    this.widget.ShowOptions = false;

    if (this.widget.ItemType === SectionTypes.BURGER_MENU) {
      this.isBurgerMenu = true;
      this.menuItemWrapper = this.widget.Children.find(x => x.ItemType === SectionTypes.MENU_WRAPPER);
      this.menuItems = this.widget.Children.filter(x => x.ItemType === SectionTypes.MENU_ITEM);
    }

    this.widget.Children.forEach(c => {
      if (!c.SelectedStyle)
        c.SelectedStyle = {};
    })
  }
  linkClick(e, navItem: WidgetModel) {
    if (e) {
      // debugger
      if (this.isBurgerMenu) {
        // alert('SHow burger menu');
        this.showMenu = true;
        return;
      }

      let url = navItem.ItemEvent;
      if (!url)
        return;


      if (!url.includes("pages") && url != '/')
        url = `/pages${url}`;
      this.router.navigate([url.trim()]);
    }
  }
}
