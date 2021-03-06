import { HttpClient } from "@angular/common/http";
import { HostListener, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NO_SQL_DB } from "src/environments/environment";
import { ContainerModel } from "../_classes/ContainerModel";
import { PageModel } from "../_classes/PageModel";
import { WebsiteModel } from "../_classes/WebsiteModel";
import { WidgetModel } from "../_classes/WidgetModel";
import { JsonParserHelper } from "../_classes/_statics/JsonParserHelper";
import { blackWebsite, newWebsite } from "../_mocks/website";


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {


  private websiteBehaviorSubject: BehaviorSubject<WebsiteModel | undefined>;
  public websiteObservable: Observable<WebsiteModel | undefined>;

  private pageBehaviorSubject: BehaviorSubject<PageModel | undefined>;
  public pageObservable: Observable<PageModel | undefined>;
  url: string;


  constructor(private http: HttpClient
  ) {
    this.websiteBehaviorSubject = new BehaviorSubject<WebsiteModel | undefined>(undefined);
    this.websiteObservable = this.websiteBehaviorSubject.asObservable();

    this.pageBehaviorSubject = new BehaviorSubject<PageModel | undefined>(undefined);
    this.pageObservable = this.pageBehaviorSubject.asObservable();

    this.url = NO_SQL_DB;

  }

  getSite(_id: string, pageid: string) {
    this.http.get<WebsiteModel>(`${this.url}/websites/${_id}`)
      .subscribe(data => {
        if (data && data._id) {
          let parsedWebsite = JsonParserHelper.parseWeb(data);
          if (parsedWebsite && parsedWebsite.Pages && parsedWebsite.Pages.length) {
            let page: PageModel | undefined = undefined;
            if (pageid)
              page = parsedWebsite.Pages.find(x => x.Url === pageid) || parsedWebsite.Pages.find(x => x.IsSelected) || parsedWebsite.Pages[0];
            this.updateWebsieState(parsedWebsite);
            this.pageBehaviorSubject.next(page);
          }
        }
        else {
          this.updateWebsieState(blackWebsite);
        }
      })
  }

  selectWebsiteStyles(isMobileMode: boolean, website: WebsiteModel): WebsiteModel | undefined {
    if (website) {
      website.SelectedStyle = isMobileMode ? website.ItemMobileStyle : website.ItemStyle;
      // website.IsMobileView = isMobileMode;
      if (website.Header) {
        website.Header.SelectedStyle = isMobileMode ? website.Header.ItemMobileStyle : website.Header.ItemStyle;
        if (website.Header.Rows) {
          website.Header.Rows.map(row => {
            row.SelectedStyle = isMobileMode ? row.ItemMobileStyle : row.ItemStyle;
            if (row.Columns) {
              row.Columns.map(c => {
                c.SelectedStyle = isMobileMode ? c.ItemMobileStyle : c.ItemStyle;
                if (c.Widgets) {
                  c.Widgets.map(w => {
                    w.SelectedStyle = isMobileMode ? w.ItemMobileStyle : w.ItemStyle;
                    if (w.Children) {
                      w.Children.map(ch => {
                        ch.SelectedStyle = isMobileMode ? ch.ItemMobileStyle : ch.ItemStyle;
                        return ch
                      })
                    }

                    if (w.Form) {
                      w.Form.SelectedStyle = isMobileMode ? w.Form.ItemMobileStyle : w.Form.ItemStyle;
                      if (w.Form.Inputs) {
                        w.Form.Inputs.map(input => {
                          input.SelectedStyle = isMobileMode ? input.ItemMobileStyle : input.ItemStyle;
                          return input
                        })
                      }
                    }
                    return w;
                  })
                }
                return c;
              })
            }
            return row
          })
        }
      }
      return website;
    }
    return undefined;
  }
  selectContainerStyles(container: ContainerModel, isMobileMode = false): ContainerModel {
    if (container) {
      if (!container.ItemStyle)
        container.ItemStyle = container.SelectedStyle || {}

      if (!container.ItemMobileStyle)
        container.ItemMobileStyle = container.SelectedStyle || {}
      container.SelectedStyle = isMobileMode ? container.ItemMobileStyle : container.ItemStyle;
      if (container.Widgets) {
        container.Widgets.forEach(c => {
          this.selectWidgetStyles(c, isMobileMode);
        })
      }

      if (container.Containers) {
        container.Containers.forEach(c => {
          this.selectContainerStyles(c, isMobileMode);
        })
      }
    }
    return container;
  }

  selectWidgetStyles(widget: WidgetModel, isMobileMode = false): WidgetModel {
    if (widget) {
      // debugger
      if (!widget.ItemStyle)
        widget.ItemStyle = {}

      if (!widget.ItemMobileStyle)
        widget.ItemMobileStyle = {}
      widget.SelectedStyle = isMobileMode ? widget.ItemMobileStyle : widget.ItemStyle;
      if (widget.Children) {
        widget.Children.forEach(c => {
          this.selectWidgetStyles(c, isMobileMode);
        })
      }
    }
    return widget;
  }
  selectTyles(isMobileMode: boolean, page: PageModel): PageModel | undefined {
    if (page) {
      page.SelectedStyle = page.ItemStyle;
      if (page.Containers)
        page.Containers.forEach(c => {
          this.selectContainerStyles(c, isMobileMode);
        });


      if (page.Widgets)
        page.Widgets.forEach(c => {
          this.selectWidgetStyles(c, isMobileMode);
        });

      return page;
    }
    return;

    // let size: any = localStorage.getItem("screen_size");
    // if (size) {
    //   size = parseInt(size);
    //   if (size < 700) {
    //     item.SelectedStyle = item.ItemMobileStyle;
    //   } else {
    //     item.SelectedStyle = item.ItemStyle;

    //   }
    // }
  }

  geWdigets(page: PageModel, website: WebsiteModel): any {
    this.get(`widgets/page/${page.PageId}`).subscribe(data => {
      if (data && data.length) {
        const parsedWidgets = JsonParserHelper.parseWidgets(data);
        parsedWidgets.map(x => {
          // this.selectTyles(x);
          if (x.Form) {
            // this.selectTyles(x.Form)
            if (x.Form.Inputs) {
              x.Form.Inputs.map(i => {
                // this.selectTyles(i);
                return i;
              })
            }
          }

          x.Children.map(c => {
            return c
          })
          return x;
        })
        page.Sections.forEach(section => {
          // this.selectTyles(section)
          section.Rows.forEach(row => {
            // this.selectTyles(row)
            row.Columns.forEach(column => {
              column.Widgets = parsedWidgets.filter(x => x.ColumnId === column.ColumnId);
            })
          })
        });

        if (website.Header) {
          // this.selectTyles(website.Header)
          website.Header.Rows.forEach(row => {
            // this.selectTyles(row)
            row.Columns.forEach(column => {
              column.Widgets = parsedWidgets.filter(x => x.ColumnId === column.ColumnId);
            })
          })
        }

        if (website.Footer) {
          website.Footer.Rows.forEach(row => {
            // this.selectTyles(row)
            row.Columns.forEach(column => {
              column.Widgets = parsedWidgets.filter(x => x.ColumnId === column.ColumnId);
            })
          })
        }
        this.updateWebsieState(website);
        this.pageBehaviorSubject.next(page);
      }
      else {
        this.updateWebsieState(website);
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
  post(url: string, item: any) {
    return this.http.post(url, item);
  }
  updateWebsieState(site: WebsiteModel) {
    this.websiteBehaviorSubject.next(site);
    // localStorage.setItem("_website", JSON.stringify(site));
  }

}
