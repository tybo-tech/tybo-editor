import { HttpClient } from "@angular/common/http";
import { HostListener, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { API_BASE, NO_SQL_DB } from "src/environments/environment";
import { ContainerModel } from "../_classes/ContainerModel";
import { DbCollectionModel } from "../_classes/DbCollectionModel";
import { FontModel } from "../_classes/FontModel";
import { PageModel } from "../_classes/PageModel";
import { UserModel } from "../_classes/UserModel";
import { WebsiteModel } from "../_classes/WebsiteModel";
import { WebstyleModel } from "../_classes/WebstyleModel";
import { WidgetModel } from "../_classes/WidgetModel";
import { Constants } from "../_classes/_statics/Constants";
import { JsonParserHelper } from "../_classes/_statics/JsonParserHelper";
import { WidgetHelper } from "../_classes/_statics/WidgetHelper";
import { blackWebsite, newWebsite } from "../_mocks/website";
import { IUpdateWidget } from "./sync.service";


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {


  private websiteBehaviorSubject: BehaviorSubject<WebsiteModel | undefined>;
  public websiteObservable: Observable<WebsiteModel | undefined>;

  private pageBehaviorSubject: BehaviorSubject<PageModel | undefined>;
  public pageObservable: Observable<PageModel | undefined>;

  private fontsBehaviorSubject: BehaviorSubject<FontModel | undefined>;
  public fontsObservable: Observable<FontModel | undefined>;

  private userBehaviorSubject: BehaviorSubject<UserModel | undefined>;
  public userObservable: Observable<UserModel | undefined>;


  private collectionsBehaviorSubject: BehaviorSubject<DbCollectionModel[] | undefined>;
  public collectionsObservable: Observable<DbCollectionModel[] | undefined>;

  url: string;


  constructor(private http: HttpClient
  ) {
    this.websiteBehaviorSubject = new BehaviorSubject<WebsiteModel | undefined>(undefined);
    this.websiteObservable = this.websiteBehaviorSubject.asObservable();

    this.pageBehaviorSubject = new BehaviorSubject<PageModel | undefined>(undefined);
    this.pageObservable = this.pageBehaviorSubject.asObservable();

    this.fontsBehaviorSubject = new BehaviorSubject<FontModel | undefined>(undefined);
    this.fontsObservable = this.fontsBehaviorSubject.asObservable();

    this.fontsBehaviorSubject = new BehaviorSubject<FontModel | undefined>(undefined);
    this.fontsObservable = this.fontsBehaviorSubject.asObservable();

    let _user = localStorage.getItem("_user");
    let user = undefined;
    if (_user && _user !== "undefined") {
      user = JSON.parse(_user);
    }
    this.userBehaviorSubject = new BehaviorSubject<UserModel | undefined>(user);
    this.userObservable = this.userBehaviorSubject.asObservable();

    this.collectionsBehaviorSubject = new BehaviorSubject<DbCollectionModel[] | undefined>(undefined);
    this.collectionsObservable = this.collectionsBehaviorSubject.asObservable();

    // this.url = NO_SQL_DB;
    this.url = API_BASE;

  }
  public get GetWebsite() {
    return this.websiteBehaviorSubject.value;
  }
  getSite(_id: string, pageid: string, pageId2 = '', pageId3 = '') {
    this.http.get<WebsiteModel>(`${this.url}/websites/get-website.php?WebsiteId=${_id}`)
      .subscribe(data => {
        if (data && data.Id) {
          this.parseWebsite(data, pageid, pageId3)
        }
        else {
          this.updateWebsieState(blackWebsite);
        }
      })
  }
  parseWebsite(data: WebsiteModel, pageid: string, pageId3: string) {
    // alert(pageId3)
    let parsedWebsite = JsonParserHelper.parseWeb(data);
    if (parsedWebsite && parsedWebsite.Pages && parsedWebsite.Pages.length) {
      // debugger
      let page: PageModel | undefined = undefined;
      if (pageid)
        page = parsedWebsite.Pages.find(x => x.Url === `/pages/${pageId3}`)
          || parsedWebsite.Pages.find(x => x.Url === `/pages${pageid}`)
          || parsedWebsite.Pages.find(x => x.Url === `${pageid}`)
          || parsedWebsite.Pages.find(x => x.IsSelected)
          || parsedWebsite.Pages[0];

      this.updateWebsieState(parsedWebsite);
      this.pageBehaviorSubject.next(page);
    } else {
      delete blackWebsite.Pages[0]._id;
      blackWebsite.Pages[0].WebsiteId = parsedWebsite.WebsiteId;
      this.create(`pages/create-page.php`, blackWebsite.Pages[0]).subscribe(pageCreated => {
        if (pageCreated) {
          parsedWebsite.Pages.push(pageCreated)
          this.updateWebsieState(parsedWebsite);
          this.pageBehaviorSubject.next(parsedWebsite.Pages[0]);
        }
      });
    }
  }
  selectWebsiteStyles(isMobileMode: boolean, website: WebsiteModel): WebsiteModel | undefined {
    if (website) {
      website.SelectedStyle = isMobileMode ? website.ItemMobileStyle : website.ItemStyle;
      // website.IsMobileView = isMobileMode;
      if (website.Footer)
        this.selectWidgetStyles(website.Footer, isMobileMode)

      if (website.Header)
        this.selectWidgetStyles(website.Header, isMobileMode)


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
  login(endpoint: string, item: any) {
    return this.http.post<any>(`${this.url}/${endpoint}`, item);
  }
  get(endpoint: string) {
    return this.http.get<any>(`${this.url}/${endpoint}`);
  }
  getCollections() {
    const id = localStorage.getItem("_website");
    if (!id) {
      this.updateCollectionState([]);
      return;
    }
    this.get(`collections/${id}`).subscribe(data => {
      if (data && data.length) {
        this.updateCollectionState(data);
      }
    })

  }
  getuser(endpoint: string) {
    return this.http.get<any>(`${this.url}/${endpoint}`, { withCredentials: true });
  }
  delete(endpoint: string) {
    return this.http.delete<any>(`${this.url}/${endpoint}`);
  }
  // post(url: string, item: any) {
  //   return this.http.post(url, item);
  // }

  getAllFonts(endpoint: string = Constants.GOOGLE_FONTS_URL) {
    return this.http.get<FontModel>(`${endpoint}`);
  }
  updateWebsieState(site: WebsiteModel) {
    this.websiteBehaviorSubject.next(site);
    // localStorage.setItem("_website", JSON.stringify(site));
  }
  updatePageState(page: PageModel) {
    this.pageBehaviorSubject.next(page);
  }
  updateUserState(user: UserModel) {
    this.userBehaviorSubject.next(user);
    if (user)
      localStorage.setItem("_user", JSON.stringify(user));
    else
      localStorage.removeItem("_user");
  }
  updateFontsState(font: FontModel) {
    this.fontsBehaviorSubject.next(font);
  }
  updateCollectionState(collections: DbCollectionModel[]) {
    this.collectionsBehaviorSubject.next(collections);
  }
  syncWidgteNow(widget: WidgetModel, userId: string) {
    const iwid: IUpdateWidget = {
      ParentId: widget.ParentId,
      Name: widget.Name,
      OrderNumber: widget.OrderNumber,
      Settings: widget.Settings,
      BackgroundType: widget.BackgroundType,
      FeildName: widget.FeildName || '',
      DbTable: widget.DbTable,
      ItemEventName: widget.ItemEventName || '',
      ItemFormat: widget.ItemFormat || '',
      ItemEvent: widget.ItemEvent,
      UrlId: widget.UrlId,
      ItemContent: widget.ItemContent,
      ItemClass: widget.ItemClass.filter((x: string) => x !== "active-node"),
      ItemCategory: widget.ItemCategory,
      ModifyUserId: userId,
      StatusId: widget.StatusId,
      Id: widget.Id
    }
    this.create(`widgets/update-widget.php`, iwid).subscribe(data => {
    });
  }

  saveWidget(widgets: WidgetModel[], website: WebsiteModel, page: PageModel) {
    WidgetHelper.removeClass(widgets, 'active-node')
    const fresh_widgets = WidgetHelper.IsolateWidget([], page.Widgets);
    fresh_widgets.map(x => x.WebsiteId = website.WebsiteId)
    const classess: WebstyleModel[] = [];
    fresh_widgets.forEach(w => {
      const c = website.GetStyles(w.ItemClass[0]);
      if (c)
        classess.push(c)
    })

    this.create(`widgets/add-widgets-range.php`, fresh_widgets).subscribe(data => { });
    if (classess.length) {
      this.create(`webstyles/save-webstyles.php`, classess).subscribe(data => { });
    }

  }


  saveWidgetsRange(widgets: WidgetModel[], website: WebsiteModel) {
    WidgetHelper.removeClass(widgets, 'active-node')
    const fresh_widgets = WidgetHelper.IsolateWidget([], widgets);
    fresh_widgets.map(x => x.WebsiteId = website.WebsiteId)
    fresh_widgets.map(x => x.OrderNumber = 1)
    const classess: WebstyleModel[] = [];
    fresh_widgets.forEach(w => {
      const c = website.GetStyles(w.ItemClass[0]);
      if (c)
        classess.push(c)
    })

    this.create(`widgets/add-widgets-range.php`, fresh_widgets).subscribe(data => { });
    if (classess.length) {
      this.create(`webstyles/save-webstyles.php`, classess).subscribe(data => { });
    }

  }

  savePageChanges(page: PageModel) {
    this.create(`pages/update-page.php`, page).subscribe(data => {
    });
  }

  saveWebsiteChanges(website: any) {
    this.create(`websites/update-webisite-only.php`, website).subscribe(data => {
    });
  }
  saveWidgetChanges(widget: IUpdateWidget) {
    this.create(`widgets/update-widget.php`, widget).subscribe(data => {
    });
  }

  saveAddedWidget(widget: WidgetModel, website: WebsiteModel) {
    widget.WebsiteId = website.WebsiteId
    this.create(`widgets/add-widgets-range.php`, [widget]).subscribe(data => { });
    if (website.WebsiteStyles.length && widget.ItemClass.length) {
      const selectedClass = website.WebsiteStyles.find(x => x.SelectorName === widget.ItemClass[0])
      if (selectedClass)
        this.create(`webstyles/save-webstyles.php`, [selectedClass]).subscribe(data => { });
    }
    // debugger
  }
}
