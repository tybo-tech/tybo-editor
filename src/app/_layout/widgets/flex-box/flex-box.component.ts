import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
  selector: 'app-flex-box',
  templateUrl: './flex-box.component.html',
  styleUrls: ['./flex-box.component.scss']
})
export class FlexBoxComponent implements OnInit {

  showJson
  @Input() section: SectionModel;
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  @Input() sectionIndex: number;
  cardType: number;
  cardClass: string;
  currentElement: HTMLDivElement;
  pY: number;
  pX: number;
  pageContent: any;
  index: number;
  column: ColumnModel;
  stylesToPaste: any;
  columnToPaste: ColumnModel;
  childStylesToPaste: any;
  widgetToPaste: WidgetModel;
  sectionContentToPaste: SectionModel;
  DeviceTypes = DeviceTypes;
  sectionStyles: any;
  gridStyle: any;
  constructor(private copyService: CopyService, private viewModeService: ViewModeService) { }
  ngAfterViewInit(): void {
    const dragableCards = document.querySelectorAll(".dragable-card");
    Array.from(dragableCards).forEach(dragableCard => {
      dragableCard.addEventListener('dragstart', (e) => {
        dragableCard.classList.add('moving');

      })
    })
  }

  ngOnInit() {
    if (!this.section)
      return;



    this.viewModeService.deviceModeObservable.subscribe(data => {
      if (data) {
        this.website = data;
        if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
          this.sectionStyles = this.section.ItemMobileStyle;
          this.gridStyle = this.section.MobileGridStyle || {};
        }


        if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
          this.sectionStyles = this.section.ItemStyle;
          this.gridStyle = this.section.GridStyle;
        }

        this.section.Columns.forEach(col=>{
          col.Widgets.forEach(wid=>{
            if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
              wid.SelectedStyle = wid.ItemMobileStyle;
            }
    
    
            if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
              wid.SelectedStyle = wid.ItemStyle;
            }
          })
        })
      }
    })
    // if (!this.section.ItemMobileStyle["background"])
    //   this.section.ItemMobileStyle["background"] = "red";
    this.copyService.copiedItemObservable.subscribe(data => {
      if (data) {
        // debugger
        this.stylesToPaste = this.copyService.getStylesToPaste(data);
        this.columnToPaste = this.copyService.getColumnToPaste(data);
        this.widgetToPaste = this.copyService.getWidgetToPaste(data);
        this.sectionContentToPaste = this.copyService.geSectionContentToPaste(data);
      }
    });


    this.copyService.copiedChildItemObservable.subscribe(data => {
      if (data) {
        this.childStylesToPaste = this.copyService.getStylesToPaste(data);
      }
    })


    if (this.section.ItemClass.length && !Array.isArray(this.section.ItemClass)) {
      this.section.ItemClass = [this.section.ItemClass];
    }

    // console.log('flex: ', this.section.ItemClass);
    this.placeContentInColumns();
  }
  onStyleChange(event) {
    if (!event)
      return

    if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      this.section.ItemMobileStyle = event;
    }


    if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      this.section.ItemStyle = event;
    }
  }
  onGridStyleChange(event) {
    if (!event)
      return

    if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      this.section.MobileGridStyle = event;
    }


    if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      this.section.GridStyle = event;
    }
  }
  placeContentInColumns() {
    // if (this.section && this.section.ItemClass) {
    //   const grid = this.section.ItemClass.find(x => x.includes("grid"));
    //   if (grid) {
    //     this.columns = +grid.split("-")[1];
    //     console.log(this.columns);
    //   }
    // }
    // this.pageContent = [];
    // for (let i = 1; i <= this.columns; i++) {
    //   this.pageContent.push({ Number: i })
    // }
  }


  onPoints(points: { x: string, y: string, element: HTMLDivElement }) {
    if (!points)
      return;

    this.currentElement = points.element;
    this.pX = Number(points.x);
    this.pY = Number(points.y);
  }
  onMove(event: any) {
    const clientX = event.x;
    const clientY = event.y;
    let newX = this.pX - clientX;
    let newY = this.pY - clientY;
    const rect = this.getRelativeClientRect(this.currentElement);
    this.currentElement.style.left = rect.left - newX + 'px';
    this.currentElement.style.top = rect.top - newY + 'px';
    this.pX = clientX;
    this.pY = clientY;

  }


  getRelativeClientRect(el) {
    var rect = el.getBoundingClientRect(),
      parentRect = el.offsetParent.getBoundingClientRect();
    return {
      bottom: parentRect.bottom - rect.bottom,
      height: rect.height,
      left: rect.left - parentRect.left,
      right: parentRect.right - rect.right,
      top: rect.top - parentRect.top,
      width: rect.width
    };
  }
  valueChanged(event: string, widget: WidgetModel) {
    widget.ItemContent = event;
  }
  onImageChange(event: string, widget: WidgetModel) {
    widget.ItemContent = event;
  }
  onColEvent(e, widget: WidgetModel) {
    console.log(e);
    widget.ColNumber = Number(e)

  }

  onFillBG(e, widget: WidgetModel) {
    // alert(e)
    this.section.ItemStyle["background-image"] = `url(${e})`
    this.section.ItemStyle["background-size"] = `cover`
    this.section.ItemStyle["background-repeat"] = `no-repeat`
    this.section.ItemStyle["background-position"] = `no-center`
    widget.ColNumber = 0;

  }

  OnCopyEvent(e, widget: WidgetModel) {
    widget.ItemStyle = e;
  }
  showGridMenu(e, section: SectionModel) {
    section.ShowGridOptions = true;
  }
  onRightClick(pointerEvent: PointerEvent, column: ColumnModel, index: number) {
    pointerEvent.preventDefault()
    this.section.Columns.map(c => c.ShowMiniMenu = false);
    column.ShowMiniMenu = true;
    // const col = new ColumnModel(`col-1`, 'Col-1', '', [], 'Grid-col');
    // col.Widgets = column.Widgets;
    // col.ItemStyle = column.ItemStyle;
    // this.column = col;
    this.index = index;
    console.log(pointerEvent);

    return false;
  }
  onRightClickSection(pointerEvent: PointerEvent, section: SectionModel) {
    pointerEvent.preventDefault();
    const __target = <HTMLDivElement>pointerEvent.target;
    const classes = Array.from(__target.classList).find(x => x === 'contextmenu_section');
    if (!classes)
      return;
    if (this.page && this.page.Sections)
      this.page.Sections.map(c => c.ShowMiniMenu = false);
    section.ShowMiniMenu = true;
    return false;
  }

  closeMenu() {
    this.section.Columns.map(c => c.ShowMiniMenu = false);
  }

  selectMenu(action: string) {
    this.closeMenu();
    if (action == 'add-column') {
      // const col = new ColumnModel(`col-1`, 'Col-1', '', [], 'Grid-col');
      // col.ItemStyle = { 'background': 'red' }
      // this.section.AddColumn(col, this.index + 1)
      this.section.ItemClass.pop();
      this.section.ItemClass.push(`grid-${this.section.Columns.length}`);
    }

    if (action == 'duplicate-column') {
      this.section.AddColumn(this.column, this.index + 1)
      this.section.ItemClass.pop();
      this.section.ItemClass.push(`grid-${this.section.Columns.length}`);
    }

    if (action == 'copy-column') {
      this.copyService.copy(this.column);
    }

    if (action == 'delete-column') {
      this.section.Columns.splice(this.index, 1);
    }

    if (action == 'paste-element') {
      this.column.AddWidget(this.widgetToPaste)
    }
  }
  selectSectionMenu(action: string, section: SectionModel) {
    section.ShowMiniMenu = false;
    if (action == 'paste-column') {
      section.AddColumn(this.columnToPaste);
    }
    if (action == 'duplicate-section') {
      const sec = new SectionModel(`section-${HelperClass.getId('sec')}`, this.page.PageId, `Section ${this.page.Sections.length + 1}`, '',[], [], SectionTypes.SEC, 'max-width', '80rem');
      sec.ItemStyle = section.ItemStyle;
      sec.ItemClass = section.ItemClass;
      sec.GridStyle = section.GridStyle;
      sec.Columns = section.Columns;
      this.page.AddSection(sec);
    }
    if (action == 'copy-section-styles') {
      this.copyService.copy(section.ItemStyle);

      // But sections also have grid styles, so let copy them too.

      this.copyService.copyChildItem(section.GridStyle)
    }
    if (action == 'paste-section-styles') {
      section.ItemStyle = this.stylesToPaste;

      // also paste child styles

      if (this.childStylesToPaste)
        section.GridStyle = this.childStylesToPaste;
    }
    if (action == 'delete-section') {
      this.page.Sections.splice(this.sectionIndex, 1);
    }
    if (action == 'copy-section-content') {
      this.copyService.copy(section);
    }
    if (action == 'paste-section-content') {
      section.ItemStyle = this.sectionContentToPaste.ItemStyle;
      section.Columns = this.sectionContentToPaste.Columns;
      section.ItemClass = this.sectionContentToPaste.ItemClass;
    }
  }

  showStyleMenu(e: boolean, column: ColumnModel) {
    column.ShowOptions = e;
  }

  showSectionStyleMenu(e: boolean, section: SectionModel) {
    section.ShowOptions = e;
  }


  onDrop(container: Element) {
    // debugger
    const draggable = document.querySelector('.dragging');
    if (draggable) {
      const containerId = container.getAttribute('id')
      let column = this.section.Columns.find(x => x.ColumnId === containerId);
      const sectionType = draggable.getAttribute('id');
      if (!sectionType)
        return;

      if (this.section && !column && !sectionType.includes("Col")) {
        // column = new ColumnModel(`col-1`, 'Col-1', '', [], 'Grid-col');
        this.section.AddColumn(column);
      }

      if (sectionType === SectionTypes.EMPTY && this.page && this.page.Sections.length) {
        const newSection = new SectionModel(`section-${this.page.Sections.length + 1}`, this.page.PageId, `Section ${this.page.Sections.length + 1}`, '',[], [], SectionTypes.EMPTY, 'max-width', '80rem')
        this.page.AddSection(newSection);
      }


      if (sectionType === SectionTypes.TEXT && column) {
        // const text: WidgetModel = new WidgetModel('text', 'Text', SectionTypes.CARD1, ``);
        // text.ElementType = "p";
        // text.ItemContent = "I ma text , click here to edit";
        // column.AddWidget(text);

      }

      if (sectionType === SectionTypes.IMAGE && column) {
        // const image: WidgetModel = new WidgetModel('text', 'Text', SectionTypes.CARD1, ``);
        // image.ElementType = "image";
        // image.ItemContent = 'assets/images/mock/27.png';
        // column.AddWidget(image);
      }


      //List
      if (sectionType === SectionTypes.LIST && column) {
        // const listWidget: WidgetModel = new WidgetModel('card-master-1', 'Card-Master-1', SectionTypes.LIST, ``);
        // const listItem1: WidgetModel = new WidgetModel(HelperClass.getId('list'), 'Item 1', SectionTypes.LIST_ITEM, ``);
        // const listItem2: WidgetModel = new WidgetModel(HelperClass.getId('list'), 'Item 2', SectionTypes.LIST_ITEM, ``);
        // const listItem3: WidgetModel = new WidgetModel(HelperClass.getId('list'), 'Item 3', SectionTypes.LIST_ITEM, ``);

        // listWidget.ItemCategory = 'List';
        // listWidget.ItemClass = ['grid-3'];
        // listItem1.ItemContent = 'Lorem Ipsum is simply dummy ';
        // listItem2.ItemContent = 'Lorem Ipsum is simply dummy ';
        // listItem3.ItemContent = 'Lorem Ipsum is simply dummy ';
        // listWidget.AddChild(listItem1)
        // listWidget.AddChild(listItem2)
        // listWidget.AddChild(listItem3);
        // listWidget.ElementType = "list";
        // listWidget.ItemContent = '';
        // column.AddWidget(listWidget);
      }


      //Menu
      if (sectionType === SectionTypes.MENU && column) {
        // const menuWidget: WidgetModel = new WidgetModel('card-master-1', 'Card-Master-1', SectionTypes.MENU, ``);
        // const menuItem1: WidgetModel = new WidgetModel(HelperClass.getId('menu'), 'Item 1', SectionTypes.MENU_ITEM, ``);
        // const menuItem2: WidgetModel = new WidgetModel(HelperClass.getId('menu'), 'Item 2', SectionTypes.MENU_ITEM, ``);
        // const menuItem3: WidgetModel = new WidgetModel(HelperClass.getId('menu'), 'Item 3', SectionTypes.MENU_ITEM, ``);

        // menuWidget.ItemCategory = 'Menu';
        // menuWidget.ItemClass = ['grid-3'];
        // menuItem1.ItemContent = 'Lorem Ipsum is simply dummy ';
        // menuItem2.ItemContent = 'Lorem Ipsum is simply dummy ';
        // menuItem3.ItemContent = 'Lorem Ipsum is simply dummy ';
        // menuWidget.AddChild(menuItem1)
        // menuWidget.AddChild(menuItem2)
        // menuWidget.AddChild(menuItem3);
        // menuWidget.ElementType = "list";
        // menuWidget.ItemContent = '';
        // column.AddWidget(menuWidget);
      }



      if (sectionType === SectionTypes.BUTTON && this.section) {
        // const text: WidgetModel = new WidgetModel('text', 'Text', SectionTypes.CARD1, ``);
        // text.ElementType = "button";
        // text.ItemContent = 'Click me';
        // section.AddColumn(text);
      }


      //Columns

      if (sectionType === SectionTypes.COL2 && this.section) {

        // this.section.ItemClass = [`grid-2`];
        // const col1 = new ColumnModel(`col-${this.section.Columns.length + 1}`, 'Col-1', '', [], 'Grid-col');
        // this.section.AddColumn(col1);
        // const col2 = new ColumnModel(`col-${this.section.Columns.length + 1}`, 'Col-2', '', [], 'Grid-col');
        // this.section.AddColumn(col2);
      }



      //Cards

      if (sectionType === SectionTypes.CARD3 && column) {
        // const cardWidget: WidgetModel = new WidgetModel('card-master-1', 'Card-Master-1', SectionTypes.CARD1, ``);
        // const card1: WidgetModel = new WidgetModel('card-1', 'Card-1', SectionTypes.CARD1, ``);
        // const card2: WidgetModel = new WidgetModel('card-2', 'Card-2', SectionTypes.CARD1, ``);
        // const card3: WidgetModel = new WidgetModel('card-', 'Card-3', SectionTypes.CARD1, ``);
        // cardWidget.ItemCategory = 'Card';
        // cardWidget.ItemClass = ['grid-3'];
        // card1.ItemContent = 'Lorem Ipsum is simply dummy ';
        // card2.ItemContent = 'Lorem Ipsum is simply dummy ';
        // card3.ItemContent = 'Lorem Ipsum is simply dummy ';
        // card1.ItemHeading = 'Lorem Ipsum.';
        // card2.ItemHeading = 'Lorem Ipsum.';
        // card3.ItemHeading = 'Lorem Ipsum.';
        // cardWidget.AddChild(card1)
        // cardWidget.AddChild(card2)
        // cardWidget.AddChild(card3);
        // cardWidget.ElementType = "card";
        // cardWidget.ItemContent = '';
        // column.AddWidget(cardWidget);
      }
      draggable.classList.remove('dragging');
      container.classList.remove('over');

    }
  }
}
