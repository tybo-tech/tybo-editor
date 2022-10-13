import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { CoordinatesHelper } from 'src/app/_classes/_statics/CoordinatesHelper';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-tag',
  templateUrl: './dock-tag.component.html',
  styleUrls: ['./dock-tag.component.scss']
})
export class DockTagComponent implements OnInit {
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  showImage: boolean;
  showEvents: boolean;
  user: UserModel;
  @Input() widget: WidgetModel;
  SectionTypes = SectionTypes;
  canMoveElement: boolean;
  selecedWidget: any;
  height: number;
  mouse: { x: number; y: number; };
  currentY: number;
  DeviceTypes = DeviceTypes;
  currentX: number;
  y: any;
  x: any;
  key: string;

  constructor(private websiteService: WebsiteService, private eventService: EventService, private syncService: SyncService) { }


  ngOnInit(): void {
    this.eventService.keyEventObservable.subscribe(key => {
      this.key = key;
    })
  }

  menuEvent(e: string) {
    if (e === 'delete')
      this.delete();

    if (e === 'change-image')
      this.showImage = true;

    if (e === 'make-background')
      {
        this.makeBg();
      }

    if (e === 'edit')
      this.widget.EditText = true;
    if (e === 'finish-edit') {
      this.widget.EditText = false;
    }

  }
  makeBg() {
    const styles = WidgetHelper.MakeBackground(this.website, this.widget);
    if (styles && this.widget.SelectedClass) {
      this.websiteService.updateWebsieState(this.website);
      this.syncService.updateStyleState(this.widget.SelectedClass)
    }
  }



  loadPosition() {
    if (this.website) {
      this.website = this.website;
      if (!this.website.ViewDevice || this.website.ViewDevice === this.DeviceTypes.PC) {
        this.height = +this.selecedWidget.Settings["PcH"]
        this.y = +this.selecedWidget.Settings["PcTop"] || 0
      }
      if (this.website.ViewDevice === this.DeviceTypes.TABLET) {
        this.height = +this.selecedWidget.Settings["TabH"]
        this.y = +this.selecedWidget.Settings["TabTop"] || 0
      }
      if (this.website.ViewDevice === this.DeviceTypes.PHONE) {
        this.height = +this.selecedWidget.Settings["PhoneH"];
        this.y = +this.selecedWidget.Settings["PhoneTop"] || 0;
      }
    }
  }


  moveUp() {
    this.canMoveElement = false;
  }

  // @HostListener('window:mouseup', ['$event'])
  // onMouseUp() {
  //   // debugger
  //   this.canMoveElement = false;
  // }


  // @HostListener('window:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   this.mouse = { x: event.clientX, y: event.clientY };
  //   if (this.canMoveElement) {
  //     // debugger
  //     this.move();
  //   }
  // }




  setSettings() {
    if (!this.website)
      return;
    if (!this.website.ViewDevice || this.website.ViewDevice === this.DeviceTypes.PC) {
      this.selecedWidget.Settings["PcH"] = this.height;
      this.selecedWidget.Settings["PcTop"] = this.y;
    }
    if (this.website.ViewDevice === this.DeviceTypes.TABLET) {
      this.selecedWidget.Settings["TabH"] = this.height;
      this.selecedWidget.Settings["TabTop"] = this.y;
    }
    if (this.website.ViewDevice === this.DeviceTypes.PHONE) {
      this.selecedWidget.Settings["PhoneH"] = this.height;
      this.selecedWidget.Settings["PhoneTop"] = this.y;
    }
  }
  delete() {
    if (this.widget.ParentWidget) {
      if (this.widget.GrandParent) {
        this.websiteService.create(`widgets/delete-widgets-range.php`, [this.widget.ParentWidget]).subscribe(data => { });
        const template = this.widget.GrandParent?.Children?.find(x => x.IsTemplate);
        if (template) {
          template.Children = template.Children?.filter(x => x.WidgetId !== this.widget.ParentWidget.WidgetId) || [];
        }
        this.widget.GrandParent.Children = WidgetHelper.removeDynamicWidgets(this.widget.GrandParent.Children);
        WidgetHelper.proccessWidget(this.widget.GrandParent, this.website, this.page);
      }
    }
    else {
      WidgetHelper.deleteWidget(this.page, this.website, this.widget)
      this.websiteService.create(`widgets/delete-widgets-range.php`, [this.widget]).subscribe(data => { });
    }
  }


  onImageSelect(image: ImageModel) {
    // debugger
    this.showImage = false;
    if (this.widget.ParentWidget) {
      if (this.widget.GrandParent) {
        this.widget.ParentWidget.ItemContent = image.Url;
        this.websiteService.syncWidgteNow(this.widget.ParentWidget, this.user?.UserId || this.widget.GrandParent.CreateUserId)
        this.widget.GrandParent.Children = WidgetHelper.removeDynamicWidgets(this.widget.GrandParent.Children);
        WidgetHelper.proccessWidget(this.widget.GrandParent, this.website, this.page);
        // this.syncService.updateWidgetState(this.widget.ParentWidget, this.user?.UserId || this.widget.GrandParent.CreateUserId)
      }
      return;
    }
    this.widget.ItemContent = image.Url
    // this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.widget.ItemContent + ')');
    this.syncService.updateWidgetState(this.widget, this.user?.UserId || this.widget.CreateUserId)
  }

  textChanged() {
    // alert(this.widget.ItemContent)
    if(this.widget.ParentWidget){
      this.widget.ParentWidget.ItemContent = this.widget.ItemContent;
      this.syncService.updateWidgetState(this.widget.ParentWidget, this.user?.UserId || this.widget.ParentWidget.CreateUserId)
      
    }
    else{
      this.syncService.updateWidgetState(this.widget, this.user?.UserId || this.widget.CreateUserId)

    }

  }


}
