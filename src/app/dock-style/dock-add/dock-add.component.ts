import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { quickAdd } from 'src/app/_mocks/widgets';
import { ViewModeService } from 'src/app/_services/view-mode.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-add',
  templateUrl: './dock-add.component.html',
  styleUrls: ['./dock-add.component.scss']
})
export class DockAddComponent implements OnInit {
  showAdd: boolean;
  showDatabase: boolean;
  showCss: boolean;
  elements: WidgetModel[] = quickAdd;
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  mainClass: string;

  constructor(private websiteService: WebsiteService, private router: Router, private viewModeService: ViewModeService) { }

  ngOnInit(): void {
    this.showAdd = false;
  }
  add(showAdd: boolean) {
    this.showAdd = showAdd;
  }

  addHeaderOrFooter(elementToCreate: WidgetModel) {
    if (!elementToCreate) {
      this.showAdd = false
      return
    }
    if (elementToCreate.ItemType === SectionTypes.HEADER && !this.website.Header) {
      this.website.AddHeader();
      this.websiteService.updateWebsieState(this.website);
      if (this.website.Header)
        this.websiteService.saveWidgetsRange([this.website.Header], this.website)
    }


    if (elementToCreate.ItemType === SectionTypes.FOOTER && !this.website.Footer)
      this.website.AddFooter();
  }
  play() {
    this.router.navigate([`/pages`])
  }

  phoneVew() {
    const editor = <HTMLDivElement>document.querySelector(".editor");
    if (!editor)
      return;
    this.website.ViewDevice = DeviceTypes.PHONE;
    this.website.WebsiteMode = 'dev';
    this.website.ViewWidth = DeviceTypes.PHONE_WIDTH;
    editor.style.width = DeviceTypes.PHONE_WIDTH;
    this.viewModeService.changeMode(this.website);
    // this.mainClass = "phone-class"
    this.mainClass = "smartphone"
    this.websiteService.updateWebsieState(this.website);

  }
  tabView() {
    const editor = <HTMLDivElement>document.querySelector(".editor");
    if (!editor)
      return;
    this.website.ViewDevice = DeviceTypes.TABLET;
    this.website.WebsiteMode = 'dev';
    this.website.ViewWidth = DeviceTypes.TABLET_WIDTH;
    editor.style.width = DeviceTypes.TABLET_WIDTH;
    this.viewModeService.changeMode(this.website);
    // this.mainClass = "phone-class"
    this.mainClass = "tablet"
    this.websiteService.updateWebsieState(this.website);

  }
  pcView() {
    const editor = <HTMLDivElement>document.querySelector(".editor");
    if (!editor)
      return;
    this.website.ViewDevice = DeviceTypes.PC;
    this.website.WebsiteMode = 'dev';
    this.website.ViewWidth = DeviceTypes.PC_WIDTH;
    editor.style.width = DeviceTypes.PC_WIDTH;
    this.viewModeService.changeMode(this.website);
    this.mainClass = ""
    this.websiteService.updateWebsieState(this.website);

  }

  
  pageChanged() {
    const page: PageModel = this.website.Pages.find(x => x.PageId === this.page.PageId);

    // this.savePage();
    if (page) {
      // Check if page is an ITEM PAGE
      this.loadPageData(page)
      this.page = page
      if (page.Url == '/')
        this.router.navigate([`/pages/editor`]);
      else
        this.router.navigate([`/pages/editor/${page.Url}`]);
    }
  }
  loadPageData(page: PageModel) {
  }
  toggleClose() {
    this.website.ShowPages = !this.website.ShowPages;
    if (this.website.ShowPages)
      this.website.ShowOptions = false;
  }
}
