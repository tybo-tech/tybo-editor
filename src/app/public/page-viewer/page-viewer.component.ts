import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { JsonParserHelper } from 'src/app/_classes/_statics/JsonParserHelper';
import { ViewModeService } from 'src/app/_services/view-mode.service';
import { WebsiteService } from 'src/app/_services/website.service';
import { NO_SQL_DB } from 'src/environments/environment';

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.scss']
})
export class PageViewerComponent implements OnInit {
  id: any = '/';
  website: WebsiteModel;
  pages: any[];
  page: PageModel;
  pageId: any;
  mainClass: string;

  constructor(private activatedRoute: ActivatedRoute, private websiteService: WebsiteService, private viewModeService: ViewModeService
  ) {

    this.activatedRoute.params.subscribe(r => {
      this.id = r.id || '/';
      this.websiteService.getSite('tybo.co.za', `/${this.id}`)

    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenSizeChanged(event.target.innerWidth);
  }

  ngOnInit() {
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = data;
        console.log(' this.website: ', this.website);

      }
    });
    this.websiteService.pageObservable.subscribe(data => {
      if (data) {
        this.page = data;
        console.log(' this.website: ', this.website);

      }
    })
  }

  screenSizeChanged(size: number) {
    localStorage.setItem("screen_size", size + '');
  }
  addWebsite() {
    this.website = this.websiteService.loadSites();

    this.websiteService.create('websites', this.website).subscribe(patched => {
      // debugger
      console.log('patched: ', patched);

    })
  }


  savePage(page: PageModel) {
    this.websiteService.post(`${NO_SQL_DB}/pages`, page).subscribe(data => {
      console.log('new page:', data);
      if (data) {
        // this.website.pages
      }

    })
  }


  phoneVew() {
    const editor = <HTMLDivElement>document.querySelector(".editor");
    if (!editor)
      return;
    this.website.ViewDevice = DeviceTypes.PHONE;
    this.website.ViewWidth = DeviceTypes.PHONE_WIDTH;
    editor.style.width = DeviceTypes.PHONE_WIDTH;
    this.viewModeService.changeMode(this.website);
    this.mainClass = "phone-class"

  }
  pcView() {
    const editor = <HTMLDivElement>document.querySelector(".editor");
    if (!editor)
      return;
    this.website.ViewDevice = DeviceTypes.PC;
    this.website.ViewWidth = DeviceTypes.PC_WIDTH;
    editor.style.width = DeviceTypes.PC_WIDTH;
    this.viewModeService.changeMode(this.website);
    this.mainClass = ""
  }

}
