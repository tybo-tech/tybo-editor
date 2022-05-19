import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { CopyService } from 'src/app/_services/copy.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() widget: WidgetModel;
  cardType: number;
  stylesToPaste: any;
  constructor(
    private copyService: CopyService
  ) { }


  ngOnInit() {
    this.copyService.copiedItemObservable.subscribe(data => {
      if (data)
        this.stylesToPaste = data;
    })
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
  showSectionStyleMenu(e: boolean, widget: WidgetModel) {
    widget.ShowOptions = e;
  }

  onRightClick(pointerEvent: MouseEvent, widget: WidgetModel, index: number) {
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


  onCardDrop(container: Element, card: WidgetModel) {
    // debugger
    const draggable = document.querySelector('.dragging');
    console.log(draggable, card);

    if (draggable && card) {
      const sectionType = draggable.getAttribute('id');
      if (!sectionType)
        return;


      if (sectionType === SectionTypes.TEXT) {
        card.ItemContent = "I ma text , click here to edit";
      }


      if (sectionType === SectionTypes.IMAGE) {
        card.ImageUrl = 'assets/images/mock/27.png';
      }


      if (sectionType === SectionTypes.BUTTON) {
        card.ItemEventName = 'Click me';
      }

      draggable.classList.remove('dragging');
      container.classList.remove('over');

    }
  }

  onImageChange(event: string, card: WidgetModel) {
    card.ImageUrl = event;
  }
}
