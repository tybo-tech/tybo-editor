import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { CoordinatesHelper } from 'src/app/_classes/_statics/CoordinatesHelper';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-tag-resizer',
  templateUrl: './dock-tag-resizer.component.html',
  styleUrls: ['./dock-tag-resizer.component.scss']
})
export class DockTagResizerComponent implements OnInit, AfterViewInit {
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Input() page: PageModel;

  style: any;
  mouseDown: boolean;
  mouse: { x: number; y: number; };
  selecedWidget: WidgetModel;
  height: string;
  width: string;
  constructor(private websiteService: WebsiteService, private syncService: SyncService) { }

  ngOnInit(): void {
    if (this.widget && this.widget.ItemClass && this.widget.ItemClass.length  && this.website.WebsiteStyles.length) {
      this.widget.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.widget.ItemClass[0]);
      if (this.widget.SelectedClass) {
        if (!this.widget.SelectedClass.PcStyles)
          this.widget.SelectedClass.PcStyles = {};

        if (!this.widget.SelectedClass.PhoneStyles)
          this.widget.SelectedClass.PhoneStyles = {};

        if (!this.widget.SelectedClass.TabStyles)
          this.widget.SelectedClass.TabStyles = {};

        if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
          this.getPoint(this.widget.SelectedClass.PcStyles)
        }

        if (this.website.ViewDevice === DeviceTypes.TABLET) {
          this.getPoint(this.widget.SelectedClass.TabStyles)
        }
        if (this.website.ViewDevice === DeviceTypes.PHONE) {
          this.getPoint(this.widget.SelectedClass.PhoneStyles)
        }
      }

    }
  }

  getPoint(style: any) {
    // console.log(style);
    this.style = {};
    this.style['left'] = style['left'];
    this.style['top'] = style['top'];
    this.style['height'] = style['height'];
    this.style['width'] = style['width'];

    // const wid = document.getElementById(this.widget.WidgetId);
    // console.log(wid);
    // if (wid) {
    //   const rect = wid.getBoundingClientRect();
    //   this.style['height'] = `${rect.height}px`;
    //   this.style['width'] = `${rect.width}px`;
    // }

    // this.style['height'] = style['height'] || '10rem';

  }
  ngAfterViewInit(): void {
    if (this.widget) {
      const wid = document.getElementById('tag-bottom-right__' + this.widget.WidgetId);
      if (wid) {
        wid.addEventListener('mousedown', (mouseEvent: MouseEvent) => {
          this.elementClicked(mouseEvent)
        })
      }
    }
  }


  elementClicked(mouseEvent: MouseEvent) {
    this.moveDown(mouseEvent)
  }
  moveDown(pointerEvent: MouseEvent) {
    const div = pointerEvent.target as HTMLElement;
    if (div && div.id && div) {
      // div.style.cursor = 'grab'
      const node = WidgetHelper.getWidget(this.page.Widgets, this.parserId(div.id));
      if (!node)
        return;
      this.selecedWidget = node;
      this.mouseDown = true;
      // this.moveMouseDown = true;
      // this.loadPosition();
    }

    return false;

  }

  parserId(id: string) {
    if (!id) return '';
    const a = id.split('__');
    if (!a.length || a.length < 1) return id;
    return a[1];
  }



  resize() {
    const relativeParent = document.getElementById(this.selecedWidget.ParentId) as HTMLDivElement;
    const elementBeingMoved = document.getElementById(this.selecedWidget.WidgetId) as HTMLDivElement;
    // console.log('relativeParent: ',relativeParent);
    if (relativeParent && elementBeingMoved && this.selecedWidget) {
      // elementBeingMoved.style.cursor = 'grabbing'
      if (this.selecedWidget && this.selecedWidget.ItemClass && this.selecedWidget.ItemClass.length) {
        this.selecedWidget.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.selecedWidget.ItemClass[0]);
      }
      const cords = CoordinatesHelper.ResizeItemTag(relativeParent, elementBeingMoved, this.mouse, this.selecedWidget);
      this.width = cords.width;
      this.height = cords.height;
      this.updateStyleClass();
      return;
    }
  }




  updateStyleClass() {
    // if (this.selecedWidget && this.selecedWidget.ItemClass && this.selecedWidget.ItemClass.length) {
    //   this.selecedWidget.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.selecedWidget.ItemClass[0]) || undefined;

    // }
    if (this.selecedWidget && this.selecedWidget.SelectedClass) {

      if (!this.selecedWidget.SelectedClass.PcStyles)
        this.selecedWidget.SelectedClass.PcStyles = {};

      if (!this.selecedWidget.SelectedClass.PhoneStyles)
        this.selecedWidget.SelectedClass.PhoneStyles = {};

      if (!this.selecedWidget.SelectedClass.TabStyles)
        this.selecedWidget.SelectedClass.TabStyles = {};

      if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
        // this.selecedWidget.SelectedClass.PcStyles['min-height'] = this.height + '%';
        this.selecedWidget.SelectedClass.PcStyles['width'] = this.width;
        // if (this.selecedWidget.ItemType !== SectionTypes.IMAGE)
        this.selecedWidget.SelectedClass.PcStyles['height'] = this.height;
        if (this.selecedWidget.ItemType === SectionTypes.IMAGE) {
          // delete this.selecedWidget.SelectedClass.PcStyles['height'];
          this.selecedWidget.SelectedClass.PcStyles['object-fit'] = 'cover';

        }
      }

      if (this.website.ViewDevice === DeviceTypes.TABLET) {
        // this.selecedWidget.SelectedClass.TabStyles['min-height'] = this.height + '%';
        this.selecedWidget.SelectedClass.TabStyles['top'] = this.height + '%';
      }
      if (this.website.ViewDevice === DeviceTypes.PHONE) {
        // this.selecedWidget.SelectedClass.PhoneStyles['min-height'] = this.height + '%';
        this.selecedWidget.SelectedClass.PhoneStyles['top'] = this.height + '%';
      }

      // this.websiteService.updateWebsieState(this.website);
      this.syncService.updateStyleState(this.selecedWidget.SelectedClass)
      // this.syncService.empyWidgets();
      // this.syncService.updateWidgetState(this.selecedWidget, this.user?.UserId || this.selecedWidget.CreateUserId)


      this.websiteService.updateWebsieState(this.website);
      // this.syncService.updateStyleState(this.selecedWidget.SelectedClass)
      // this.syncService.empyWidgets();
      // if (this.selecedWidget.ParentWidget) {
      //   if (this.selecedWidget.GrandParent) {
      //     this.syncService.updateWidgetState(this.selecedWidget.ParentWidget, this.user?.UserId || this.selecedWidget.GrandParent.CreateUserId)
      //   } else {
      //     this.syncService.updateWidgetState(this.selecedWidget, this.user?.UserId || this.selecedWidget.CreateUserId)

      //   }
      // }

    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp() {
    this.mouseDown = false;
  }


  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.mouseDown) this.resize();
  }
}
