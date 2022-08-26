import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { JsonParserHelper } from 'src/app/_classes/_statics/JsonParserHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { ViewModeService } from 'src/app/_services/view-mode.service';
import { WebsiteService } from 'src/app/_services/website.service';
import { NO_SQL_DB } from 'src/environments/environment';

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.scss']
})
export class PageViewerComponent implements OnInit, AfterViewInit {
  id: any = '/';
  website?: WebsiteModel;
  pages: any[];
  page: PageModel | undefined;
  pageId: any;
  mainClass: string;
  isMobileMode = false;
  id2: any;
  id3: any;
  pageDbItems: any;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private title: Title,
    private meta: Meta,
     private activatedRoute: ActivatedRoute, private websiteService: WebsiteService, private viewModeService: ViewModeService
  ) {
    this.activatedRoute.params.subscribe(r => {
      // debugger
      this.id = r['id'] || '/';
      this.id2 = r['id2'] || '';
      this.id3 = r['id3'] || '';
      // Emitters.dataIdEmmiter.emit(this.id2);
      // const web = websiteService.GetWebsite;
      // if (this.id && web) {
      //   this.nextPage(web, this.id);
      // }
    });
  }


  ngOnInit() {
    // this.loadPage();
    if (window.matchMedia('(max-width: 500px)').matches) {
      this.isMobileMode = true;
    }
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = this.websiteService.selectWebsiteStyles(this.isMobileMode, data);
        if (this.id && this.website) {
          // debugger
          this.nextPage(this.website, this.id);
        }
      }
    });
    // this.websiteService.pageObservable.subscribe(data => {
    //   if (data) {

    //     // this.page = data;

    //     // this.page = this.websiteService.selectTyles(this.isMobileMode, this.page);
    //   }
    // })

  }
  nextPage(web: WebsiteModel, pageUrl: string) {
    if (web && web.Pages && web.Pages.length) {
      const page: PageModel = web.Pages.find(x => x.Url === `/${pageUrl}`) || web.Pages.find(x => x.Url === `${pageUrl}`);
      if (page) {
        this.page = page;
        this.title.setTitle(page.Title || page.Name)
        this.websiteService.updatePageState(page);
        this.loadPageData(page)
      }


    }
  }
  loadPageData(page: PageModel) {

    if (page.TableName && page.UrlId && page.TableDisplayColName && this.website) {
      const table = this.website.DbTables.find(x => x.Name === page.TableName)
      this.pageDbItems = WidgetHelper.GetPageData(this.website, page.TableName);
      if (this.pageDbItems && this.pageDbItems.length && table && this.id2) {
        page.PageData = this.pageDbItems.find((x: any) => x.Id === this.id2);
        page.SelectedTable = table;
      }
    }
  }
  ngAfterViewInit(): void {



    this.creatClass();
  }

  creatClass() {
    const useSmartStyle = true;
    if (useSmartStyle) {
      this.websiteService.websiteObservable.subscribe(website => {
        if (website) {
          if (website.WebsiteMode !== 'dev') {
            this.breakpointObserver
              .observe(['(min-width: 500px)'])
              .subscribe((state: BreakpointState) => {
                // debugger
                if (state.matches && this.website) {
                  website.ViewDevice = DeviceTypes.PC;
                }

                if (!state.matches && this.website) {
                  website.ViewDevice = DeviceTypes.PHONE;
                }


              });
          }

          this.website = website;
          if (website.WebsiteStyles && website.WebsiteStyles.length) {
            var elem: any = document.getElementById("__my-style");
            if (elem)
              elem.parentElement.removeChild(elem);

            var css = ``;
            if (this.website.Imports && this.website.Imports.length) {
              this.website.Imports.forEach(importItem => {

                css += `@font-face {
              font-family:${importItem.Name} ;
              src: url(${importItem.Url});
            }`

              })
            }

            website.WebsiteStyles.forEach(w => {
              css += `\n\n.${w.SelectorName}{`
              if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
                for (const [key, value] of Object.entries(w.PcStyles)) {
                  css += `\n \t${key} : ${value};`;
                }
              }

              if (website.ViewDevice === DeviceTypes.TABLET) {
                for (const [key, value] of Object.entries(w.TabStyles)) {
                  css += `\n \t${key} : ${value};`;
                }
              }

              if (website.ViewDevice === DeviceTypes.PHONE) {
                for (const [key, value] of Object.entries(w.PhoneStyles)) {
                  css += `\n \t${key} : ${value};`;
                }
              }
              css += '\n}'
            })
            let head = document.head || document.getElementsByTagName('head')[0],
              style: any = document.createElement('style');

            head.appendChild(style);
            style.setAttribute("id", "__my-style");

            style.type = 'text/css';
            if (style.styleSheet) {
              // This is required for IE8 and below.
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }
          }
        }
      })

    }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event:any) {
  //   this.screenSizeChanged(event.target.innerWidth);
  // }




  screenSizeChanged(size: number) {
    localStorage.setItem("screen_size", size + '');
  }
  addWebsite() {
    // this.website = this.websiteService.loadSites();

    this.websiteService.create('websites', this.website).subscribe(patched => {
      // debugger
      console.log('patched: ', patched);

    })
  }


  // savePage(page: PageModel) {
  //   this.websiteService.post(`${NO_SQL_DB}/pages`, page).subscribe(data => {
  //     console.log('new page:', data);
  //     if (data) {
  //       // this.website.pages
  //     }

  //   })
  // }


  phoneVew() {
    const editor = <HTMLDivElement>document.querySelector(".editor");
    if (!editor || !this.website)
      return;
    this.website.ViewDevice = DeviceTypes.PHONE;
    this.website.ViewWidth = DeviceTypes.PHONE_WIDTH;
    editor.style.width = DeviceTypes.PHONE_WIDTH;
    this.viewModeService.changeMode(this.website);
    this.mainClass = "phone-class"

  }
  pcView() {
    const editor = <HTMLDivElement>document.querySelector(".editor");
    if (!editor || !this.website)
      return;
    this.website.ViewDevice = DeviceTypes.PC;
    this.website.ViewWidth = DeviceTypes.PC_WIDTH;
    editor.style.width = DeviceTypes.PC_WIDTH;
    this.viewModeService.changeMode(this.website);
    this.mainClass = ""
  }



}
