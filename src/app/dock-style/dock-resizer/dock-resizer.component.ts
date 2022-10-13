import { AfterContentInit, AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { CoordinatesHelper } from 'src/app/_classes/_statics/CoordinatesHelper';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-resizer',
  templateUrl: './dock-resizer.component.html',
  styleUrls: ['./dock-resizer.component.scss']
})
export class DockResizerComponent implements OnInit, AfterViewInit {
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  selecedWidget: any;
  mouse: { x: number; y: number; };
  mouseDown: any;
  x: string;
  y: string;
  constructor(private websiteService: WebsiteService, private syncService: SyncService) { }
  ngAfterViewInit(): void {
    if (this.widget) {
      const wid = document.getElementById('border-right__' + this.widget.WidgetId);
      if (wid) {
        wid.addEventListener('mousedown', (mouseEvent: MouseEvent) => {
          this.elementClicked(mouseEvent)
        })
      }
    }
  }

  ngOnInit(): void {
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
      console.log(this.selecedWidget);
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
        this.selecedWidget.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.selecedWidget.ItemClass[0]) || undefined;
      }
      const cords = CoordinatesHelper.ResizeItem(relativeParent, elementBeingMoved, this.mouse, this.selecedWidget);
      this.x = cords.left;
      this.y = cords.top;
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
        this.selecedWidget.SelectedClass.PcStyles['width'] = this.x
      }

      if (this.website.ViewDevice === DeviceTypes.TABLET) {
        // this.selecedWidget.SelectedClass.TabStyles['min-height'] = this.height + '%';
        this.selecedWidget.SelectedClass.TabStyles['top'] = this.y + '%';
      }
      if (this.website.ViewDevice === DeviceTypes.PHONE) {
        // this.selecedWidget.SelectedClass.PhoneStyles['min-height'] = this.height + '%';
        this.selecedWidget.SelectedClass.PhoneStyles['top'] = this.y + '%';
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
