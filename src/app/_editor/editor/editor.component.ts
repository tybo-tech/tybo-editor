import { Component, OnInit } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { RowModel } from 'src/app/_classes/RowModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { JsonParserHelper } from 'src/app/_classes/_statics/JsonParserHelper';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { COL_IMAGES } from 'src/app/_mocks/menus';
import { wid_cards } from 'src/app/_mocks/widgets';
import { ViewModeService } from 'src/app/_services/view-mode.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
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
  constructor(private viewModeService: ViewModeService, private websiteService: WebsiteService) { }

  ngOnInit() {
    this.websiteService.websiteObservable.subscribe(data => {
      this.website = data;

      if (this.website && this.website.Pages && this.website.Pages.length) {
        const page = this.website.Pages.find(x => x.IsSelected);
        if (page) {
          this.pageId = page.PageId;
          this.selectPage(page);
        } else {
          this.pageId = this.website.Pages[0].PageId;
          this.selectPage(this.website.Pages[0]);
        }

        this.page.Sort();
        if (this.website.ViewDevice == DeviceTypes.PHONE) {
          this.phoneVew();
        }
        if (this.website.ViewDevice == DeviceTypes.PC) {
          this.pcView();
        }


      }
    })
    // this.website = this.websiteService.loadSites();


    this.widgets = wid_cards;
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



  getTemplateWidget(widgetId: string): WidgetModel {
    return this.widgets.find(x => x.WidgetId === widgetId);
  }


  pageChanged() {
    // debugger
    const page = this.website.Pages.find(x => x.PageId === this.pageId);

    if (page) {
      this.selectPage(page);
      this.websiteService.geWdigets(page, this.website);
    }
  }
  selectPage(page: PageModel) {
    // debugger
    this.page = page;
    this.website.Pages.map(x => x.IsSelected = false);
    page.IsSelected = true;
    this.pageId = page.PageId;
  }
  toggleClose() {
    this.website.ShowPages = !this.website.ShowPages
  }
  savePage() {
    this.saveWebsiteHeaderAndFooter();
    this.saveWidgetsForThisPage();
    // return;
    this.websiteService.create(`pages/replace/${this.page._id}`, this.page).subscribe(data => {
      console.log(data);
    })
  }


  saveWebsiteHeaderAndFooter() {
    let tempPages = this.website.Pages;
    this.website.Pages = this.website.Pages.map(x => x._id);
    this.websiteService.create(`websites/replace/${this.website._id}`, this.website).subscribe(data => {
      console.log(data);
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
              delete wid.Form._id;
              wid.Form.Inputs.forEach(i => {
                delete i._id;
              })
            }
            widgets.push(wid);
          })
        })
      })
    })

    if (this.website.Header)
      this.website.Header.Rows.forEach(row => {
        row.Columns.forEach(col => {
          col.Widgets.forEach(wid => {
            widgets.push(wid);
          })
        })
      })

    if (this.website.Footer)
      this.website.Footer.Rows.forEach(row => {
        row.Columns.forEach(col => {
          col.Widgets.forEach(wid => {
            widgets.push(wid);
          })
        })
      })

    console.log(widgets);
    const widgetsToUpdate = widgets.filter(x => x._id && x._id.length > 5)
    const widgetsToCreate = widgets.filter(x => !x._id || !x._id.length);
    widgetsToCreate.forEach(x => {
      delete x._id;
      return x;
    })
    if (widgetsToUpdate.length) {
      this.websiteService.create(`widgets/bulk-update`, widgetsToUpdate).subscribe(data => {
        console.log(data);
      })
    }

    if (widgetsToCreate.length) {
      this.websiteService.create(`widgets`, widgetsToCreate).subscribe(data => {
        console.log(data);
      })
    }

  }
  saveChanges() {
    if (!this.website)
      return;

    let sections: SectionModel[] = [];
    let widgets: WidgetModel[] = [];
    let rows: RowModel[] = [];
    let columns: ColumnModel[] = [];
    this.website.Pages.forEach(page => {
      page.Sections.forEach(section => {
        sections.push(section)
        section.Rows.forEach(row => {
          rows.push(row)
          row.Columns.forEach(col => {
            columns.push(col);
            col.Widgets.forEach(wid => {
              widgets.push(wid);
            })
          })
        })
      })

    });



    const widgetsToUpdate = widgets.filter(x => x._id && x._id.length > 5)
    const widgetsToCreate = widgets.filter(x => !x._id || !x._id.length);
    widgetsToCreate.forEach(x => {
      delete x._id;
      return x;
    })
    if (widgetsToUpdate.length) {
      this.websiteService.create(`widgets/bulk-update`, widgetsToUpdate).subscribe(data => {
        console.log(data);
      })
    }

    if (widgetsToCreate.length) {
      this.websiteService.create(`widgets`, widgetsToCreate).subscribe(data => {
        console.log(data);
      })
    }


  }



  onClose(e: boolean, section: SectionModel) {
    section.ShowOptions = false;
    section.ShowMiniMenu = false
    this.selectedSection = null;
    section.ItemStyle['border'] = this.tempBorder;
  }

  viewOptions(section: SectionModel) {
    section.ShowMiniMenu = true
    this.selectedSection = null;
    section.ShowOptions = true;
    this.tempBorder = section.ItemStyle['border'];
    section.ItemStyle['border'] = '1px solid #3498db';
    this.selectedSection = section;
  }

  closePreview() {
    this.preview = false;
    this.mainClass = [];

  }
  addSection(numberOfColumns: number) {

    const section = new SectionModel(HelperClass.getId('section'), this.page.PageId, 'Body Section', '', [], [], SectionTypes.EMPTY, 'max-width', '80rem');
    const row = new RowModel(HelperClass.getId('row'), section.SectionId, 'Section Row', [], 'Row');

    let col = HelperClass.getGridClassFromNumberOfColumns(numberOfColumns)
    row.ItemStyle = { 'grid-template-columns': col, 'display': 'grid', 'min-height': SectionTypes.BODY_MIN_HEIGHT, }

    for (let i = 0; i < numberOfColumns; i++) {
      row.AddColumn(new ColumnModel(HelperClass.getId('col'), row.RowId, 'Col-1', '', [], 'Grid-col'));
    }
    section.AddRow(row);
    this.page.AddSection(section);
  }

  menuEvent(menu: WidgetModel) {
    if (!menu) {
      this.showAdd = false
      return
    }
    if (menu.ItemType === SectionTypes.HEADER && !this.website.Header) {

      this.website.Header = new SectionModel(HelperClass.getId('section'), this.page.PageId, 'Header Section', '', [], [], SectionTypes.HEADER, 'max-width', '100%');
      this.website.Header.ItemStyle = { 'min-height': '5rem', 'background': '#565678' };

      const row = new RowModel(HelperClass.getId('row'), this.website.Header.SectionId, 'Section Row', [], 'Row');
      row.ItemStyle = { 'grid-template-columns': '10% auto', 'display': 'grid', 'min-height': SectionTypes.HEADER_MIN_HEIGHT, }
      for (let i = 0; i < 2; i++) {
        row.AddColumn(new ColumnModel(HelperClass.getId('col'), row.RowId, 'Col-1', '', [], 'Grid-col'));
      }
      this.website.Header.AddRow(row);
    }


    if (menu.ItemType === SectionTypes.FOOTER) {
      this.website.Footer = new SectionModel(HelperClass.getId('section'), this.page.PageId, 'Header Section', '', [], [], SectionTypes.FOOTER_HEIGHT, 'max-width', '100%');
      this.website.Footer.ItemStyle = { 'min-height': '5rem', 'background': '#565854' };

      const row = new RowModel(HelperClass.getId('row'), this.website.Footer.SectionId, 'Section Row', [], 'Row');
      row.ItemStyle = { 'grid-template-columns': '10% auto', 'display': 'grid', 'min-height': SectionTypes.HEADER_MIN_HEIGHT, }
      for (let i = 0; i < 2; i++) {
        row.AddColumn(new ColumnModel(HelperClass.getId('col'), row.RowId, 'Col-1', '', [], 'Grid-col'));
      }
      this.website.Footer.AddRow(row);
    }
  }
}
