import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {
  options = 'Pages settings'
  @Input() website: WebsiteModel;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  page: PageModel;
  tables: DbTableModel[];
  selectedTable?: DbTableModel;

  constructor(private websiteService: WebsiteService) {
    websiteService.websiteObservable.subscribe(data => {
      if (data)
        this.tables = data.DbTables;
    })
  }

  ngOnInit() {
  }
  addPage() {
    const page = new PageModel(HelperClass.getId(`page`), true, false, 'New Page', 'New Page', '/', "Active", { color: 'red' }, []);
    page.Url = this.buildUrl(page.Url);
    page.WebsiteId = this.website.WebsiteId;
    this.website.AddPage(page);
  }

  buildUrl(url: string) {
    return url.split(" ").join("");
  }

  selectPage(page: PageModel) {
    this.page = page;
    if (page.TableName)
      this.selectTable();
  }
  savePage() {
    // debugger
    if (!this.page)
    return;
    if (this.page.Id) {
      this.page.Widgets = WidgetHelper.removeDynamicWidgets(this.page.Widgets)
      this.page.WebsiteId = this.website.WebsiteId
      this.websiteService.savePageChanges(this.page);
    }


    if (!this.page.Id) {
      delete this.page.Id
      this.websiteService.create(`pages/create-page.php`, this.page).subscribe(data => {
        if (data && data.WebsiteId) {
          this.websiteService.updateWebsieState(this.website);
        }
      });
    }
  }

  onClose() {
    this.closeEvent.emit(true);
  }

  selectTable() {
    if (this.page && this.page.TableName) {
      this.selectedTable = this.tables.find(x => x.Name === this.page.TableName);
    }
  }
}
