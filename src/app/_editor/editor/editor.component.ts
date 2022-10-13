import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { ContainerModel } from 'src/app/_classes/ContainerModel';
import { DbCollectionModel } from 'src/app/_classes/DbCollectionModel';
import { FontModel } from 'src/app/_classes/FontModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { RowModel } from 'src/app/_classes/RowModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WebstyleModel } from 'src/app/_classes/WebstyleModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { JsonParserHelper } from 'src/app/_classes/_statics/JsonParserHelper';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { COL_IMAGES } from 'src/app/_mocks/menus';
import { blackWebsite } from 'src/app/_mocks/website';
import { wid_cards } from 'src/app/_mocks/widgets';
import { EventService } from 'src/app/_services/event.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() id2: string;
  @Input() id: string;
  website: WebsiteModel;
  selectedSection: SectionModel;
  page: PageModel;
  widgets: WidgetModel[];
  modalStyles = {}
  tempBorder: any;
  mainClass: any;
  preview: boolean;
  pageId: string;
  COL_IMAGES = COL_IMAGES;
  showAdd: boolean = false;
  showImage: boolean = false;
  showDatabase: boolean = false;
  showCss: boolean = false;
  fonts: FontModel;
  selectWidget: any;
  user: UserModel;
  loading: boolean;
  pageDbItems: any;
  constructor(private viewModeService: ViewModeService, private websiteService: WebsiteService, private eventService: EventService, private router: Router) { }

  ngOnInit() {

    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });
    // if (!this.id2)
    //   this.selectPage();


    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = data;
        if (!this.page)
          this.nextPage(this.website, this.id2)
        // this.page = this.website.Pages[0]

      }

    })

    this.widgets = wid_cards;
    this.websiteService.getAllFonts().subscribe(data => {
      if (data) {
        this.fonts = data;
        this.websiteService.updateFontsState(this.fonts);
      }
    });

    this.eventService.optionsObservable.subscribe(data => {
      this.selectWidget = data;
    })
  }

  nextPage(web: WebsiteModel, pageUrl: string) {
    if (web && web.Pages && web.Pages.length) {
      const page = web.Pages.find(x => x.Url === `/${pageUrl}`) || web.Pages.find(x => x.Url === `${pageUrl}`);
      if (page) {
        this.page = page;
        this.pageId = page.PageId;
        this.loadPageData(page)
      }


    }
  }
  addElement() {
    this.eventService.updateOptionsState(undefined);
    this.showAdd = !this.showAdd
  }
  preVeiw() {
    this.mainClass = ['preview'];
    this.preview = true;
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



  // getTemplateWidget(widgetId: string): WidgetModel {
  //   return this.widgets.find(x => x.WidgetId === widgetId);
  // }


  pageChanged() {
    const page: PageModel = this.website.Pages.find(x => x.PageId === this.pageId);

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

    if (page.TableName && page.UrlId && page.TableDisplayColName) {
      const table = this.website.DbTables.find(x => x.Name === page.TableName)
      this.pageDbItems = WidgetHelper.GetPageData(this.website, page.TableName);
      if (this.pageDbItems && this.pageDbItems.length && table) {
        page.PageData = this.pageDbItems[0];
        page.SelectedTable = table;
      }
    }
  }
  // selectPage() {
  //   this.websiteService.pageObservable.subscribe(data => {
  //     if (data) {
  //       this.page = data;
  //       this.pageId = data.PageId;
  //       if (this.page && this.page.TableName) {
  //         // this.mapPageDbItems();
  //       }
  //     }
  //   });
  // }

  // mapPageDbItems() {
  //   this.websiteService.collectionsObservable.subscribe(data => {
  //     if (data && data.length) {
  //       this.pageDbItems = data.filter(x => x.TableName === this.page.TableName);
  //       if (this.pageDbItems.length) {
  //         this.page.DataTittle = this.pageDbItems[0].DataId;
  //       }
  //     }
  //   })
  // }
  toggleClose() {
    this.website.ShowPages = !this.website.ShowPages;
    if (this.website.ShowPages)
      this.website.ShowOptions = false;
  }
  toggleWebClose() {
    this.website.ShowOptions = !this.website.ShowOptions;
    if (this.website.ShowOptions)
      this.website.ShowPages = false;
  }
  savePage() {
    this.page.Widgets = WidgetHelper.removeDynamicWidgets(this.page.Widgets);

    WidgetHelper.removeClass(this.page.Widgets, 'active-node')
    const widgets = WidgetHelper.IsolateWidget([], this.page.Widgets);
    if (this.website.Header) {
      const header = WidgetHelper.IsolateWidget([], [this.website.Header]);
      header.forEach(he => {
        widgets.push(he);
      })
    }
    widgets.map(w => {
      w.WebsiteId = this.website.WebsiteId;
      w.ItemClass = JSON.stringify(w.ItemClass);
      w.BackgroundType = w.BackgroundType || 'Color';
      return w;
    });


    console.log(this.website.WebsiteStyles);
    if (!this.website.WebsiteStyles)
      this.website.WebsiteStyles = [];

    if (!this.website.Imports)
      this.website.Imports = [];

    this.website.WebsiteStyles.forEach(style => {
      // style.PcStyles = JSON.stringify(style.PcStyles);
      // style.PhoneStyles = JSON.stringify(style.PhoneStyles);
      // style.TabStyles = JSON.stringify(style.TabStyles);
      style.WebsiteId = this.website.WebsiteId;
    })
    this.website.Imports.forEach(style => {
      style.WebsiteId = this.website.WebsiteId;
      style.CreateUserId = '';
      style.ModifyUserId = '';
      style.StatusId = 1;
      if (this.user) {
        style.CreateUserId = this.user.UserId;
        style.ModifyUserId = this.user.UserId;
      }

    })
    // return;

    this.loading = true;
    this.websiteService.create(`widgets/add-widgets-range.php`, widgets).subscribe(data => {
      this.websiteService.create(`websites/update-website.php`, this.website).subscribe(data => {
        this.website.WebsiteStyles.forEach(style => {

          this.loading = false;
        });

        widgets.map(w => {
          w.ItemClass = JSON.parse(w.ItemClass);
          return w;
        });
        console.log(data);
        WidgetHelper.mapIdis(widgets, data.Widgets);
        this.website.WebsiteStyles = data.WebsiteStyles;
        if (this.website.WebsiteStyles && this.website.WebsiteStyles) {
          this.website.WebsiteStyles.forEach(style => {
            style.PcStyles = JSON.parse(style.PcStyles);
            style.PhoneStyles = JSON.parse(style.PhoneStyles);
            style.TabStyles = JSON.parse(style.TabStyles);
          })
        }
        Emitters.dyanamicEmmiter.emit(true);

      })
    })


  }

  saveWebsiteHeaderAndFooter() {
    let tempPages = this.website.Pages;
    this.website.Pages = this.website.Pages.map(x => x._id);
    this.websiteService.create(`websites/replace/${this.website.Id}`, this.website).subscribe(data => {
      this.website.Pages = tempPages;
    })
  }
  saveWidgetsForThisPage() {
    let widgets: WidgetModel[] = [];
    this.page.Sections.forEach(section => {
      section.Rows.forEach(row => {
        row.Columns.forEach(col => {
          col.Widgets.forEach(wid => {
            if (wid.Form) {
              delete wid.Form.Id;
              wid.Form.Inputs.forEach(i => {
                delete i.Id;
              })
            }
            widgets.push(wid);
          })
        })
      })
    })

    const widgetsToUpdate = widgets.filter(x => x.Id && x.Id.length > 5)
    const widgetsToCreate = widgets.filter(x => !x.Id || !x.Id.length);
    widgetsToCreate.forEach(x => {
      delete x.Id;
      return x;
    })
    if (widgetsToUpdate.length) {
      this.websiteService.create(`widgets/bulk-update`, widgetsToUpdate).subscribe(data => {
      })
    }

    if (widgetsToCreate.length) {
      this.websiteService.create(`widgets`, widgetsToCreate).subscribe(data => {
      })
    }

  }



  closePreview() {
    this.preview = false;
    this.mainClass = [];

  }
  addContainerWidget(numberOfColumns: number) {
    if (!this.website)
      return;
    if (!this.website.WebsiteStyles)
      this.website.WebsiteStyles = [];

    const parentContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), this.page.PageId, this.page.PageId, 'Section', SectionTypes.CONTAINER, ``);
    // parentContainer.ItemClass = ["page-section"];
    parentContainer.GetClass(this.website, 'page-section', StyleHelper.getFlexRow());
    parentContainer.ParentId = this.page.PageId;
    parentContainer.Settings["PcH"] = 400;
    parentContainer.Settings["TabH"] = 400;
    parentContainer.Settings["PhoneH"] = 400;
    parentContainer.Settings["PcBgType"] = 'color';
    parentContainer.Settings["TabBgType"] = 'color';
    parentContainer.Settings["PhoneBgType"] = 'color';
    parentContainer.Settings["PcBgColor"] = '#ffffff';
    parentContainer.Settings["TabBgColor"] = '#ffffff';
    parentContainer.Settings["PhoneBgColor"] = '#ffffff';


    const boxContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), this.page.PageId, this.page.PageId, 'Box', SectionTypes.CONTAINER, ``);
    boxContainer.ItemClass = ["box-container"];
    boxContainer.ParentId = parentContainer.WidgetId;
    boxContainer.Settings["PcH"] = 400;
    boxContainer.Settings["TabH"] = 400;
    boxContainer.Settings["PhoneH"] = 400;
    boxContainer.Settings["PcBgType"] = 'none';
    boxContainer.Settings["TabBgType"] = 'none';
    boxContainer.Settings["PhoneBgType"] = 'none';
    boxContainer.GetClass(this.website, 'box-container', StyleHelper.getFlexBox(), StyleHelper.getFlexBoxTab(), StyleHelper.getFlexBoxPhone())


    if (numberOfColumns > 1)
      for (let i = 0; i < numberOfColumns; i++) {

        const subContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), this.page.PageId, this.page.PageId, 'Container', SectionTypes.CONTAINER, ``);
        subContainer.ItemClass = ["sub-container"];
        subContainer.ParentId = boxContainer.WidgetId;
        subContainer.Settings["PcH"] = 400;
        subContainer.Settings["TabH"] = 200;
        subContainer.Settings["PhoneH"] = 200;
        subContainer.Settings["PcBgType"] = 'none';
        subContainer.Settings["TabBgType"] = 'none';
        subContainer.Settings["PhoneBgType"] = 'none';
        subContainer.GetClass(this.website, 'sub-container', StyleHelper.getFlexChild(), StyleHelper.getFlexChildTab(), StyleHelper.getFlexChildPhone())
        boxContainer.AddChild(subContainer);
      }

    parentContainer.AddChild(boxContainer);
    this.page.AddContainerWidget(parentContainer);
    this.websiteService.updateWebsieState(this.website);
    this.websiteService.saveWidget([parentContainer], this.website, this.page)
  }

  menuEvent(menu: WidgetModel) {
    if (!menu) {
      this.showAdd = false
      return
    }
    if (menu.ItemType === SectionTypes.HEADER && !this.website.Header) {
      this.website.AddHeader();
      this.websiteService.updateWebsieState(this.website);
      if (this.website.Header)
        this.websiteService.saveWidgetsRange([this.website.Header], this.website)
    }


    if (menu.ItemType === SectionTypes.FOOTER && !this.website.Footer)
      this.website.AddFooter();
  }

  toggleBodyOptions(inputContainer: WebsiteModel) {
    // this.row.ElementId = this.row.RowId;




    this.eventService.updateOptionsState(undefined);
    setTimeout(() => {
      inputContainer.ShowOptions = !inputContainer.ShowOptions;
      if (inputContainer.ShowOptions) {
        this.eventService.updateOptionsState(inputContainer)
      }
      else
        this.eventService.updateOptionsState(undefined);
    }, 100)
  }

  dataChanged() {

  }


}
