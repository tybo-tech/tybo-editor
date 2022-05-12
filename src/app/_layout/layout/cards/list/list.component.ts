import { Component, Input, OnInit } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { CopyService } from 'src/app/_services/copy.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  cardType: number;
  stylesToPaste: any;
  constructor(
    private copyService: CopyService
  ) { }


  ngOnInit() {
    this.copyService.copiedItemObservable.subscribe(data => {
      if (data)
        this.stylesToPaste = data;
    });

    if (this.widget.ItemCategory === SectionTypes.MENU && this.website && this.website.Pages) {
      this.widget.Children = [];
      this.website.Pages.forEach(page => {
        const menuItem: WidgetModel = new WidgetModel(HelperClass.getId('menu'), 'master-column','master-page',  'Item', SectionTypes.MENU_ITEM, ``);
        menuItem.ItemContent = page.Name;
        this.widget.Children.push(menuItem);
      })
    }
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

  OnCopyEvent(event: string, widget: WidgetModel, itemName: string) {
    // debugger
    if (itemName === 'ItemHeading')
      widget.HeadingStyles = event;

    if (itemName === 'ItemContent')
      widget.ContentStyles = event;

    if (itemName === 'ImageUrl')
      widget.ImageStyles = event;
  }

  onRightClick(pointerEvent: PointerEvent, widget: WidgetModel, index: number) {
    pointerEvent.preventDefault();
    const __target = <HTMLDivElement>pointerEvent.target;
    const classes = Array.from(__target.classList).find(x => x === 'contextmenu_card');
    if (!classes)
      return;

    this.widget.Children.map(c => c.ShowMiniMenu = false);
    widget.ShowMiniMenu = true;
    return false;
  }

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
    this.widget.Children.map(c => c.ShowMiniMenu = false);
  }
  showULStyleMenu(e: boolean, widget: WidgetModel) {
    widget.ShowOptions = e;
  }

}
