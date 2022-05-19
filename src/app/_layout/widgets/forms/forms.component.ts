import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { FORMS_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  @Input() column: ColumnModel;
  @Input() index: number;
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  stylesToPaste: any;
  showMenu: boolean;
  showToggle: boolean;
  miniMenu = FORMS_MINI_MENU;

  constructor(
    private copyService: CopyService,
    private viewModeService: ViewModeService
  ) { }


  ngOnInit() {
    this.widget.ShowMiniMenu = false;
    this.widget.ShowOptions = false;
    this.viewModeService.deviceModeObservable.subscribe(data => {
      if (data) {
        if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
          this.widget.SelectedStyle = this.widget.ItemMobileStyle;
          this.showMenu = false;
          this.showToggle = true;
        }


        if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
          this.widget.SelectedStyle = this.widget.ItemStyle;
          this.showMenu = true;
          this.showToggle = false;
        }
      }
    });
    this.copyService.copiedItemObservable.subscribe(data => {
      if (data)
        this.stylesToPaste = data;
    });
  }
  onRightClick(pointerEvent: MouseEvent) {
    pointerEvent.preventDefault();
    const __target = <HTMLDivElement>pointerEvent.target;
    const classes = Array.from(__target.classList).find(x => x === 'contextmenu_from');
    if (!classes)
      return;

    this.widget.Children.map(c => c.ShowMiniMenu = false);
    this.widget.ShowMiniMenu = true;
    return false;
  }

  showStyleMenu(e: boolean) {
    this.widget.ShowOptions = e;
  }


  onStyleChange(event:any) {
    if (!event)
      return

    if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      this.widget.ItemMobileStyle = event;
    }


    if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      this.widget.ItemStyle = event;
    }

  }

  miniMenuEvent(event:any) {
    if (event === "close") {
      this.closeMenu();
      return;
    }

    if (event === 'delete' && this.column) {
      this.column.DeleteWidget(this.index);
    }


    if (event == 'copy-styles') {
      this.copyService.copy(this.widget.ItemStyle);
    }
    if (event == 'paste-styles') {

      if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
        this.widget.ItemMobileStyle = this.stylesToPaste;
      }

      if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
        this.widget.ItemStyle = this.stylesToPaste;
      }

      this.widget.SelectedStyle = this.stylesToPaste;
    }

    if (event === 'position-up') {
      alert('Event not handled')
    }
    this.closeMenu();
  }

  closeMenu() {
    this.widget.ShowMiniMenu = false;
  }

}
