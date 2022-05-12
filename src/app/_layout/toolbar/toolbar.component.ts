import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarModel } from 'src/app/_classes/ToolbarModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { subMenu } from 'src/app/_mocks/menus';
import { quickAdd } from 'src/app/_mocks/widgets';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  subMenu: ToolbarModel[];
  mainMenu: ToolbarModel[];
  @Output() menuEvent: EventEmitter<any> = new EventEmitter();
  // menuSections: ToolbarModel[];
  widgets: WidgetModel[];
  selectedToolbar: ToolbarModel;


  tabs = [
    { Id: 'elements', Name: '<i class="fas fa-list" style="margin-right: .5rem;"></i> Elements', Class: ['active'] },
    { Id: 'templates', Name: ' <i class="fas fa-paint-brush" style="margin-right: .5rem;"></i>   Templates', Class: [] },
    { Id: 'layers', Name: ' <i class="fas fa-layer-group"></i> Layers', Class: [] }
  ]
  tabId: string = this.tabs[0].Id;
  elements: WidgetModel[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // this.mainMenu = mainMenu;
    // this.subMenu = subMenu;
    // this.menuSections = subMenu[0].Nodes;
    this.elements = quickAdd;

    this.eventService.optionsObservable.subscribe(data => {
      if (data)
        this.menuEvent.emit(null)
    })
    // this.widgets = this.menuSections[0].Widgets;
  }
  expandToolBar(toolbar: ToolbarModel) {
    if (toolbar)
      this.selectedToolbar = toolbar;
  }

  closeToolBar(toolbar: ToolbarModel) {
    // return
    if (toolbar)
      this.selectedToolbar = null;

  }



  clickMenu(menu: WidgetModel) {
    if (menu.ItemType === SectionTypes.HEADER || menu.ItemType === SectionTypes.FOOTER) {
      this.menuEvent.emit(menu)
    }

  }

  onTab(tab) {
    this.tabs.map(t => t.Class = [])
    tab.Class = ['active'];
    this.tabId = tab.Id;
  }
}
