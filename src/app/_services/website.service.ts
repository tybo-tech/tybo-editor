import { HttpClient } from "@angular/common/http";
import { HostListener, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NO_SQL_DB } from "src/environments/environment";
import { PageModel } from "../_classes/PageModel";
import { WebsiteModel } from "../_classes/WebsiteModel";
import { JsonParserHelper } from "../_classes/_statics/JsonParserHelper";
import { newWebsite } from "../_mocks/website";


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {


  private websiteBehaviorSubject: BehaviorSubject<WebsiteModel>;
  public websiteObservable: Observable<WebsiteModel>;

  private pageBehaviorSubject: BehaviorSubject<PageModel>;
  public pageObservable: Observable<PageModel>;
  url: string;


  constructor(private http: HttpClient
  ) {
    const website = localStorage.getItem("_website");
    let web = null;
    // if (website) {
    //   web = JsonParserHelper.parseWeb(JSON.parse(website));
    // }
    this.websiteBehaviorSubject = new BehaviorSubject<WebsiteModel>(web);
    this.websiteObservable = this.websiteBehaviorSubject.asObservable();

    this.pageBehaviorSubject = new BehaviorSubject<PageModel>(null);
    this.pageObservable = this.pageBehaviorSubject.asObservable();

    this.url = NO_SQL_DB;

  }

  getSite(_id, pageid) {
    this.http.get<WebsiteModel>(`${this.url}/websites/${_id}`)
      .subscribe(data => {
        if (data && data._id) {
          let parsedWebsite = JsonParserHelper.parseWeb(data);
          // debugger
          if (parsedWebsite && parsedWebsite.Pages && parsedWebsite.Pages.length) {
            let page: PageModel;
            // debugger
            if (parsedWebsite.Header) {
              this.selectTyles(parsedWebsite.Header);
              parsedWebsite.Header.Rows.forEach(r => {
                this.selectTyles(r)
                r.Columns.forEach(c => {
                  this.selectTyles(c);
                })
              })
            }

            if (parsedWebsite.Footer) {
              this.selectTyles(parsedWebsite.Footer);
              parsedWebsite.Footer.Rows.forEach(r => {
                this.selectTyles(r)
                r.Columns.forEach(c => {
                  this.selectTyles(c);
                })
              })
            }
            if (pageid)
              page = parsedWebsite.Pages.find(x => x.Url === pageid);

            if (!page)
              page = parsedWebsite.Pages.find(x => x.IsSelected) || parsedWebsite.Pages[0];
            if (page) {
              // alert(page.Name)
              this.selectTyles(page);
              page.Sections.forEach(s => {
                this.selectTyles(s);
                s.Rows.forEach(r => {
                  this.selectTyles(r)
                  r.Columns.forEach(c => {
                    this.selectTyles(c);
                  })
                })
              })
              this.geWdigets(page, parsedWebsite);
            }
          }
        }

      })
  }

  selectTyles(item) {
    // let query = window.matchMedia("(max-width: 700px)");
    // if (query.matches) {
    //   alert("PC")    // If page is larger than 700px

    // } else {
    //   // Mobile phones
    //   alert("Phone")
    // }

    if (item && item.ColumnId === 'col-412159861-1651910434276' && item.CreateDate === 'Mon May 09 2022 23:38:53 GMT+0200 (South Africa Standard Time)') {
      let b = 333;
      debugger
    }

    let size: any = localStorage.getItem("screen_size");
    if (size) {
      size = parseInt(size);
      if (size < 700) {
        item.SelectedStyle = item.ItemMobileStyle;
      } else {
        item.SelectedStyle = item.ItemStyle;

      }
    }
  }

  geWdigets(page: PageModel, website: WebsiteModel): any {
    this.get(`widgets/page/${page.PageId}`).subscribe(data => {
      if (data && data.length) {
        const parsedWidgets = JsonParserHelper.parseWidgets(data);
        parsedWidgets.map(x => {
          this.selectTyles(x);
          if (x.Form) {
            this.selectTyles(x.Form)
            if (x.Form.Inputs) {
              x.Form.Inputs.map(i => {
                this.selectTyles(i);
                return i;
              })
            }
          }

          x.Children.map(c => {
            // debugger
            this.selectTyles(c);
            return c
          })
          return x;
        })
        page.Sections.forEach(section => {
          this.selectTyles(section)
          section.Rows.forEach(row => {
            this.selectTyles(row)
            row.Columns.forEach(column => {
              column.Widgets = parsedWidgets.filter(x => x.ColumnId === column.ColumnId);
            })
          })
        });

        if (website.Header) {
          this.selectTyles(website.Header)
          website.Header.Rows.forEach(row => {
            this.selectTyles(row)
            row.Columns.forEach(column => {
              column.Widgets = parsedWidgets.filter(x => x.ColumnId === column.ColumnId);
            })
          })
        }

        if (website.Footer) {
          website.Footer.Rows.forEach(row => {
            this.selectTyles(row)
            row.Columns.forEach(column => {
              column.Widgets = parsedWidgets.filter(x => x.ColumnId === column.ColumnId);
            })
          })
        }
        this.updateWebsieState(website);
        this.pageBehaviorSubject.next(page);
      }

    });

    // this.websiteService.updateWebsieState(this.website);
    // return { page: page, website: website };
  }
  getDisplaySize(page: PageModel, website: WebsiteModel) {
    // page.Sections.forEach(section => {

    //   if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
    //     section.SelectedStyle = section.ItemMobileStyle;
    //   }

    //   if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
    //     section.SelectedStyle = section.ItemStyle;
    //   }
    //   section.Rows.forEach(row => {

    //     if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
    //       row.SelectedStyle = row.ItemMobileStyle;
    //     }

    //     if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
    //       row.SelectedStyle = row.ItemStyle;
    //     }
    //     row.Columns.forEach(col => {
    //       console.log();
    //       if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
    //         col.SelectedStyle = col.ItemMobileStyle;
    //       }

    //       if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
    //         col.SelectedStyle = col.ItemStyle;
    //       }
    //       col.Widgets = widgets.filter(x => x.ColumnId === col.ColumnId);
    //       if (col.Widgets.length)
    //         console.log('col', col);

    //     })
    //   });

    // });
  }
  loadSites() {
    let website = null;
    const sites = localStorage.getItem("_sites");
    if (sites) {
      const websites: any[] = JSON.parse(sites);
      if (websites.length) {
        let a = JSON.parse(websites[websites.length - 1]);
        website = JsonParserHelper.parseWeb(a)
      }
    } else {
      website = newWebsite;
    }

    return website;
  }



  patch(endpoint: string, item: any) {
    return this.http.patch<any>(`${this.url}/${endpoint}`, item);
  }
  create(endpoint: string, item: any) {
    return this.http.post<any>(`${this.url}/${endpoint}`, item);
  }
  get(endpoint: string) {
    return this.http.get<any>(`${this.url}/${endpoint}`);
  }
  delete(endpoint: string) {
    return this.http.delete<any>(`${this.url}/${endpoint}`);
  }
  post(url, item) {
    return this.http.post(url, item);
  }
  updateWebsieState(site: WebsiteModel) {
    this.websiteBehaviorSubject.next(site);
    // localStorage.setItem("_website", JSON.stringify(site));
  }

}
