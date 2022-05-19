import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { MENU_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Input() column: ColumnModel;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  stylesToPaste: any;
  showMenu: boolean = false;
  showToggle: boolean;
  miniMenu = MENU_MINI_MENU;
  isBurgerMenu: boolean;
  menuItemWrapper?: WidgetModel;
  menuItems: WidgetModel[];
  constructor(
    private copyService: CopyService,
    private viewModeService: ViewModeService
  ) { }


  ngOnInit() {
    console.log("Menu:", this.widget);
    this.widget.ShowMiniMenu = false;
    this.widget.ShowOptions = false;
    if (this.widget.ItemType === SectionTypes.BURGER_MENU) {
      this.isBurgerMenu = true;
      // debugger
      this.menuItemWrapper = this.widget.Children.find(x => x.ItemType === SectionTypes.MENU_WRAPPER);
      this.menuItems = this.widget.Children.filter(x => x.ItemType === SectionTypes.MENU_ITEM);
    }

    // this.viewModeService.deviceModeObservable.subscribe(data => {
    //   // debugger
    //   if (data) {
    //     this.widget = this.viewModeService.selectStyles(this.widget, this.website);
    //   }
    // });


    this.copyService.copiedItemObservable.subscribe(data => {
      if (data)
        this.stylesToPaste = data;
    });
  }
  onRightClick(pointerEvent: MouseEvent) {
    pointerEvent.preventDefault()
    this.column.Widgets.map(c => c.ShowMiniMenu = false);
    this.widget.ShowMiniMenu = true;
    return false;
  }
  OnCopyEvent(event: string, widget: WidgetModel, itemName: string) {
    // debugger
    if (itemName === 'ItemHeading')
      widget.HeadingStyles = event;

    if (itemName === 'ItemContent')
      widget.ContentStyles = event;

    if (itemName === 'ImageUrl')
      widget.ImageStyles = event;
  }

  // onRightClick(pointerEvent: MouseEvent, widget: WidgetModel, index: number) {
  //   pointerEvent.preventDefault();
  //   const __target = <HTMLDivElement>pointerEvent.target;
  //   const classes = Array.from(__target.classList).find(x => x === 'contextmenu_card');
  //   if (!classes)
  //     return;

  //   this.widget.Children.map(c => c.ShowMiniMenu = false);
  //   widget.ShowMiniMenu = true;
  //   return false;
  // }

  selectMenu(action: string, widget: WidgetModel) {
    if (action === 'copy-styles') {
      this.copyService.copy(widget.ItemStyle);
      // this.stylesToPaste = widget.ItemStyle;
    }
    if (action === 'paste-styles') {
      widget.ItemStyle = this.stylesToPaste;
    }
  }

  closeMenu() {
    this.column.Widgets.map(c => c.ShowMiniMenu = false);
  }
  showULStyleMenu(e: boolean, widget: WidgetModel) {
    widget.ShowOptions = e;
  }
  valueChanged(event: string, widget: WidgetModel, itemName: string) {
    if (itemName === 'ItemHeading')
      widget.ItemHeading = event;

    if (itemName === 'ItemContent')
      widget.ItemContent = event;

    if (itemName === 'ImageUrl')
      widget.ImageUrl = event;

    if (itemName === 'ItemEventName')
      widget.ItemEventName = event;
  }

  showStyleMenu(e: boolean) {
    this.widget.ShowOptions = e;
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



  miniMenuEvent(event: any) {
    // alert(event:any)
    if (event === "close") {
      this.closeMenu();
      return;
    }

    if (event === 'delete') {
      this.deleteEvent.emit(this.widget)
    }

    // if (event === 'position-up') {
    //     alert('Event not handled')

    // }

  }
  onMenuEvent(e: any) {
    if (e) {
      if (!this.menuItemWrapper || !this.menuItems || !this.menuItems.length)
        return

      // this.menuItemWrapper = this.viewModeService.selectStyles(this.menuItemWrapper, this.website);
      // this.menuItems.forEach(mi => this.viewModeService.selectStyles(mi, this.website));

      console.log(this.menuItems);
      console.log(this.menuItemWrapper);
      this.showMenu = true;


    }
  }

  onDeleteMenu(e: any) {
    if (e) {
      this.deleteEvent.emit(this.widget)
    }
  }
}
