import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { ELEMENT_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-html-element',
  templateUrl: './html-element.component.html',
  styleUrls: ['./html-element.component.scss']
})
export class HtmlElementComponent implements OnInit {
  @Input() page: PageModel;
  @Input() type: any;
  @Input() ItemStyle: any;
  @Input() value: any;
  @Input() parent: WidgetModel;
  @Input() items: any;
  @Input() itemCol: any;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  @Output() colEvent: EventEmitter<any> = new EventEmitter();
  @Output() fillBGEvent: EventEmitter<any> = new EventEmitter();
  @Output() onImageChange: EventEmitter<any> = new EventEmitter();
  @Output() copyEvent: EventEmitter<any> = new EventEmitter();
  @Output() onStyleChange: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() sideMenuEvent: EventEmitter<any> = new EventEmitter();
  showIcons: boolean;
  show: boolean;
  showImage: boolean;
  showTextOption: boolean;
  showMiniMenu: boolean;
  stylesToPaste: any;
  listItems: string[];
  miniMenu = ELEMENT_MINI_MENU;
  types = [
    { Name: 'Heading 1', Value: 'h1', Class: ['bold'] },
    { Name: 'Heading 2', Value: 'h2', Class: ['bold2'] },
    { Name: 'Heading 3', Value: 'h3', Class: ['bold3'] },
    { Name: 'Heading 4', Value: 'h4', Class: ['bold4'] },
    { Name: 'Heading 5', Value: 'h5', Class: ['bold5'] },
    { Name: 'Heading 6', Value: 'h6', Class: ['bold6'] },
    { Name: 'Paragraph', Value: 'p', Class: ['bold6'] },
    { Name: 'Link tag', Value: 'a', Class: ['bold6'] },
  ]
  showOptions: boolean;
  selectedTextColor: string;
  startPoints: { x: number; y: number; };
  website: WebsiteModel;
  // <app-html-element [type] = "'image'" [value]= "'val'"
  constructor(private copyService: CopyService, private eventService: EventService, private websiteService: WebsiteService) { }

  ngOnInit() {
    this.websiteService.websiteObservable.subscribe(data => {
      if (data)
        this.website = data;
    })

    this.eventService.optionsObservable.subscribe(data => {
      if (!data)
        this.show = false;
    })

    this.copyService.copiedItemObservable.subscribe(data => {
      if (data)
        this.stylesToPaste = data;
    })

    if (this.type === 'list') {
      this.listItems = JSON.parse(this.value);
    }

    if (this.parent && this.parent.SelectedStyle && this.parent.SelectedStyle["color"]) {
      this.selectedTextColor = this.parent.SelectedStyle["color"];
    }

    if (this.parent && this.parent.ItemType === SectionTypes.BURGER_MENU) {
      this.miniMenu.push({ Name: `<i class="fas fa-bars"></i> Open menu`, Action: 'open-menu' })
    }
  }
  onHover(e: any) {
    this.show = e;
    // if (e)
    //   this.eventService.updateOptionsState(this.parent)
    // else
    //   this.eventService.updateOptionsState(undefined);
  }

  toggleOptions() {
    // debugger
    this.eventService.updateOptionsState(undefined);
    setTimeout(() => {
      this.showOptions = true;
      this.show = true;
      if (this.showOptions) {
        this.eventService.updateOptionsState(this.parent)
      }
      else
        this.eventService.updateOptionsState(undefined);
    }, 100)
  }
  onChange(e: any) {
    this.value = e.Url || e;
    this.valueChanged.emit(this.value)
  }
  colChanged() {
    this.colEvent.emit(this.itemCol);
  }
  fillBG() {
    this.fillBGEvent.emit(this.value);
  }

  onImageSelect(image: ImageModel) {
    this.showImage = false;
    this.onImageChange.emit(image.Url);
  }

  selectMenu(action: any) {
    if (action === 'copy-styles') {
      if (this.parent && this.parent.ItemClass && this.parent.ItemClass.length && this.website && this.website.WebsiteStyles && this.website.WebsiteStyles.length) {
        const itemClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.parent.ItemClass[0]);
        if (itemClass) {
          if (this.website.ViewDevice === DeviceTypes.PC)
            this.copyService.copy(itemClass.PcStyles);

          if (this.website.ViewDevice === DeviceTypes.TABLET)
            this.copyService.copy(itemClass.TabStyles);

          if (this.website.ViewDevice === DeviceTypes.PHONE)
            this.copyService.copy(itemClass.PhoneStyles);

        }
      }
    }
    if (action === 'copy-element') {

    }
    if (action === 'paste-styles') {
      if (this.parent && this.parent.ItemClass && this.parent.ItemClass.length && this.website && this.website.WebsiteStyles && this.website.WebsiteStyles.length) {
        const itemClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.parent.ItemClass[0]);
        if (itemClass) {
          console.log(this.stylesToPaste);

          if (this.website.ViewDevice === DeviceTypes.PC)
            itemClass.PcStyles = this.stylesToPaste;

          if (this.website.ViewDevice === DeviceTypes.TABLET)
            itemClass.TabStyles = this.stylesToPaste;

          if (this.website.ViewDevice === DeviceTypes.PHONE)
            itemClass.PhoneStyles = this.stylesToPaste;

        }
      }
      this.websiteService.updateWebsieState(this.website);
    }
    if (action === 'delete') {
      this.deleteEvent.emit(action)
    }
    if (action === 'select-image') {
      this.showImage = true;
    }
    if (action === 'open-menu') {
      this.sideMenuEvent.emit(true);
    }
    this.valueChanged.emit(this.value)
    this.showMiniMenu = false;
  }
  closeMenu() {
    this.showMiniMenu = false;
  }

  toogleMiniMenu(pointerEvent: MouseEvent) {
    pointerEvent.preventDefault();
    this.showMiniMenu = true;
    return false;
  }

  styleChange(e: any) {
    this.onStyleChange.emit(e)
  }

  getSelectedText(event: string) {
    let selection = document.getSelection();
    if (selection && selection.toString().length) {
      const text = selection.toString();
      if (event === 'color') {
        document.execCommand('forecolor', false, this.selectedTextColor);
      }
      console.log(event, text);

    } else {
      if (!this.parent.SelectedStyle)
        this.parent.SelectedStyle = {};
      this.parent.SelectedStyle["color"] = this.selectedTextColor;
    }
  }

  textStyleChange(e: any) {
    if (e === 'align-center') {
      if (!this.parent.SelectedStyle)
        this.parent.SelectedStyle = {};
      this.parent.SelectedStyle["text-align"] = 'center';
    }
    if (e === 'align-left') {
      if (!this.parent.SelectedStyle)
        this.parent.SelectedStyle = {};
      this.parent.SelectedStyle["text-align"] = 'left';
    }
    if (e === 'align-right') {
      if (!this.parent.SelectedStyle)
        this.parent.SelectedStyle = {};
      this.parent.SelectedStyle["text-align"] = 'right';
    }
  }

  onDrop(innElement: Element, dropWidget: WidgetModel) {
    if (!this.page)
      return;
    // debugger
    const draggable = document.querySelector('.dragging');
    if (draggable) {
      const sectionType = draggable.getAttribute('id');
      if (!sectionType) {
        draggable.classList.remove('dragging');
        innElement.classList.remove('over');
        return;
      }

      // Attempt to move item within same container
      // const a = HelperClass.getSubMenuItem(containerWidget.Children, sectionType);
      const parent = HelperClass.getSubMenuItem(this.page.Widgets, dropWidget.ParentId)
      if (parent && parent.Children && parent.Children.find(x => x.WidgetId === sectionType)) {
        const itemBeingMoved = parent.Children.find(x => x.WidgetId === sectionType)
        if (itemBeingMoved) {
          let indexOfItemBeingMoved = parent.Children.indexOf(itemBeingMoved);
          let indexOfItemAtPostion = parent.Children.indexOf(dropWidget);
          if (indexOfItemBeingMoved >= 0 && indexOfItemAtPostion >= 0) {
            const prevY = innElement.getBoundingClientRect().y;
            let startPoint = localStorage.getItem("startPoint");
            if (startPoint) {
              this.startPoints = JSON.parse(startPoint)
              if (prevY - this.startPoints.y > 0) {
                // Down
                parent.MoveWidgetDown(itemBeingMoved, indexOfItemBeingMoved, indexOfItemBeingMoved, indexOfItemAtPostion);
              } else {
                //Up
                parent.MoveWidgetUp(itemBeingMoved, indexOfItemBeingMoved, indexOfItemBeingMoved, indexOfItemAtPostion);
              }
            }

            // let temp = parent.Children[indexOfItemAtPostion];
            // parent.Children[indexOfItemAtPostion] = itemBeingMoved;
            // parent.Children[indexOfItemBeingMoved] = temp;

          }
          console.log('a:::: ', itemBeingMoved);
        }
      }


    }
  }

  onPoints(startPoint: { x: number, y: number }) {
    // debugger
    if (startPoint)
      localStorage.setItem("startPoint", JSON.stringify(startPoint))
  }

  onShowIcons() {
    this.showIcons = !this.showIcons;
  }

  iconsEvent(e: string) {
    this.value += `<i class="ml-3 fa ${e}"></i>`;
    this.showIcons = false;
  }
}
