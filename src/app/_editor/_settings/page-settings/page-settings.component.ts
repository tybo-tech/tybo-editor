import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {
  options = 'Pages menu'
  @Input() website: WebsiteModel;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  page: PageModel;

  constructor(private websiteService: WebsiteService) { }

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
  }
  savePage() {
    if (!this.page)
      return;
    if (this.page._id) {
      this.websiteService.patch(`pages/${this.page._id}`, this.page).subscribe(data => {
        if (data && data.modifiedCount) {

        }
      });
    }


    if (!this.page._id) {
      delete this.page._id
      this.websiteService.create(`pages`, this.page).subscribe(data => {
        if (data && data.modifiedCount) {

        }
      });
    }
  }

  onClose() {
    this.closeEvent.emit(true);
  }
}
