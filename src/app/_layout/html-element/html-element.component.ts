import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { ELEMENT_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-html-element',
  templateUrl: './html-element.component.html',
  styleUrls: ['./html-element.component.scss']
})
export class HtmlElementComponent implements OnInit {
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
  ]
  showOptions: boolean;
  selectedTextColor: string;
  // <app-html-element [type] = "'image'" [value]= "'val'"
  constructor(private copyService: CopyService, private eventService: EventService) { }

  ngOnInit() {
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
    //   this.eventService.updateOptionsState(null);
  }

  toggleOptions() {
    // debugger
    this.eventService.updateOptionsState(null);
    setTimeout(() => {
      this.showOptions = true;
      if (this.showOptions) {
        if (!this.parent.ItemStyle)
          this.parent.ItemStyle = {};

        if (!this.parent.ItemMobileStyle)
          this.parent.ItemMobileStyle = {};

        if (!this.parent.SelectedStyle)
          this.parent.SelectedStyle = {};

        if (!this.parent.EventStyles)
          this.parent.EventStyles = {};

        this.eventService.updateOptionsState(this.parent)
      }
      else
        this.eventService.updateOptionsState(null);
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
      this.copyService.copy(this.ItemStyle);
    }
    if (action === 'copy-element') {
      this.copyService.copy(this.parent);
    }
    if (action === 'paste-styles') {
      this.ItemStyle = this.stylesToPaste;
      this.copyEvent.emit(this.stylesToPaste)
    }
    if (action === 'delete') {
      // this.value = null;
      this.deleteEvent.emit(this.value)
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
}
