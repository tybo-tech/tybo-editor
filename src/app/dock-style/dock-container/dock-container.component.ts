import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { CoordinatesHelper } from 'src/app/_classes/_statics/CoordinatesHelper';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { COL_IMAGES } from 'src/app/_mocks/menus';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-container',
  templateUrl: './dock-container.component.html',
  styleUrls: ['./dock-container.component.scss']
})
export class DockContainerComponent implements OnInit, AfterViewInit {
  website: WebsiteModel;
  page: PageModel;
  savingStyles: boolean;
  COL_IMAGES = COL_IMAGES;
  mouse: { x: number; y: number; };
  timeId: any;
  counter: number;
  y: any;
  x: any;
  key: string;

  constructor(private websiteService: WebsiteService, private syncService: SyncService, private eventService: EventService) { }

  ngOnInit(): void {
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = data;
      }
    });

    this.websiteService.pageObservable.subscribe(data => {
      if (data) {
        this.page = data;
      }
    });
    this.syncWidgets();

    this.eventService.keyEventObservable.subscribe(key => {
      this.key = key;
    })
  }

  ngAfterViewInit() {
    this.websiteService.pageObservable.subscribe(page => {
      if (page && page.Widgets) {
        const pageWidgets = WidgetHelper.IsolateWidget([], page.Widgets);
        if (pageWidgets && pageWidgets.length) {
          const tags: HTMLElement[] = [];
          setTimeout(() => {
            pageWidgets.forEach(widget => {
              const element = document.getElementById(widget.WidgetId);
              // console.log( element?.classList,element?.classList.contains("__tag"));

              if (element && element.classList.contains("__tag")) {
                tags.push(element)
              }

            });
            if (tags.length) {
              tags.forEach(tag => {
                tag.addEventListener('mousedown', (e) => this.MouseDown(e, tag.id))
              })
            }
          }, 5000);
        }

      }
    });
  }
  MouseDown(e: MouseEvent, widgetId: string): any {
    this.counter = 0;
    const widget = WidgetHelper.getWidget(this.page.Widgets, widgetId);
    if (widget) {
      widget.IsMouseDown = true;
      this.timeId = setInterval(() => {
        this.counter += 1;
      }, 100);
    }

  }

  syncWidgets() {
    let timeer = setInterval(() => {
      // auto update styles
      const styles = this.syncService.getStylsToSave;
      if (styles && styles.length) {
        const temp = styles;
        this.savingStyles = true;
        this.syncService.empyStyles();
        this.websiteService.create(`webstyles/save-webstyles.php`, styles).subscribe(data => {
          this.savingStyles = false;

        });
      }

      // auto update widget
      const widgets = this.syncService.getWidgetsToSave;
      if (widgets && widgets.length) {
        const temp = widgets;
        this.savingStyles = true;
        this.syncService.empyWidgets();
        this.websiteService.saveWidgetChanges(widgets[0])
      }
    }, 2000);
  }


  addContainerWidget(numberOfColumns: number) {
    if (!this.website)
      return;
    if (!this.website.WebsiteStyles)
      this.website.WebsiteStyles = [];

    const parentContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), this.page.PageId, this.page.PageId, 'Section', SectionTypes.CONTAINER, ``);
    parentContainer.GetClass(this.website, 'page-section', StyleHelper.getFlexRow());
    parentContainer.ParentId = this.page.PageId;

    const boxContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), this.page.PageId, this.page.PageId, 'Box', SectionTypes.CONTAINER, ``);
    boxContainer.ItemClass = ["box-container"];
    boxContainer.ParentId = parentContainer.WidgetId;
    boxContainer.GetClass(this.website, 'box-container', StyleHelper.getFlexBox(), StyleHelper.getFlexBoxTab(), StyleHelper.getFlexBoxPhone())

    if (numberOfColumns > 1)
      for (let i = 0; i < numberOfColumns; i++) {
        const subContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), this.page.PageId, this.page.PageId, 'Container', SectionTypes.CONTAINER, ``);
        subContainer.ItemClass = ["sub-container"];
        subContainer.ParentId = boxContainer.WidgetId;
        subContainer.GetClass(this.website, 'sub-container', StyleHelper.getFlexChild(), StyleHelper.getFlexChildTab(), StyleHelper.getFlexChildPhone())
        boxContainer.AddChild(subContainer);
      }

    parentContainer.AddChild(boxContainer);
    this.page.AddContainerWidget(parentContainer);
    this.websiteService.updateWebsieState(this.website);
    this.websiteService.saveWidget([parentContainer], this.website, this.page)
  }
  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (event.key == "Shift") {
      this.eventService.updateKeyEventState("Shift")
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Shift") {
      this.eventService.updateKeyEventState("")
    }
  }


  @HostListener('window:mouseup', ['$event'])
  onMouseUp() {
    if (this.timeId) {
      clearInterval(this.timeId);
      this.counter = 0;
    }
    if (this.page && this.page.Widgets) {
      const pageWidgets = WidgetHelper.IsolateWidget([], this.page.Widgets);
      // console.log(pageWidgets.map(x => x.IsMouseDown));

      WidgetHelper.removeIsMouseDown(pageWidgets);
      // console.log('mouseup');
      // console.log(pageWidgets.map(x => x.IsMouseDown));

    }

  }



  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.page && this.page.Widgets && this.counter >= 3 && this.key !== "Shift") {
      const pageWidgets = WidgetHelper.IsolateWidget([], this.page.Widgets);
      const widget = pageWidgets.find(x => x.IsMouseDown);
      if (widget) {
        // Move widget
        this.move(widget)
      }
    }

  }


  private move(widget: WidgetModel) {
    // if (this.key === "Shift") {
    //   return;
    // }
    const relativeParent = document.getElementById(widget.ParentId) as HTMLDivElement;
    const elementBeingMoved = document.getElementById(widget.WidgetId) as HTMLDivElement;
    // console.log('relativeParent: ',relativeParent);
    if (relativeParent && elementBeingMoved && widget) {
      // elementBeingMoved.style.cursor = 'grabbing'
      if (widget && widget.ItemClass && widget.ItemClass.length) {
        widget.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === widget.ItemClass[0]) || undefined;
      }

      if (StyleHelper.CheckPosition(this.website, widget) === 'relative') {

        const cords = CoordinatesHelper.MoveRelativeItem(relativeParent, elementBeingMoved, this.mouse, widget);
        this.x = cords.left;
        this.y = cords.top;
        this.updateStyleClass(widget);
        return;
      } else {
        const cords = CoordinatesHelper.MoveAbsoluteItem(relativeParent, elementBeingMoved, this.mouse, widget);
        this.x = cords.left;
        this.y = cords.top;
        this.updateStyleClass(widget);
        return;
      }

    }
  }


  updateStyleClass(widget: WidgetModel) {
    if (widget.SelectedClass) {
      StyleHelper.MoveTag(this.website, widget, this.x, this.y);
      this.syncService.updateStyleState(widget.SelectedClass)
      this.websiteService.updateWebsieState(this.website);
    }
  }

}
