import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerModel } from 'src/app/_classes/ContainerModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-website-settings',
  templateUrl: './website-settings.component.html',
  styleUrls: ['./website-settings.component.scss']
})
export class WebsiteSettingsComponent implements OnInit {

  options = 'Website settings menu'
  @Input() website: WebsiteModel;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

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


  saveWebsite() {
    if (!this.website)
      return;


    if (this.website._id) {
      // this.websiteService.patch(`websites/${this.website._id}`, this.website).subscribe(data => {
      //   if (data && data.modifiedCount) {

      //   }
      // });
    }


    if (!this.website._id) {
      delete this.website._id
      this.website.Pages.forEach(p => {
        delete p._id;
        if (p.Containers)
          p.Containers.forEach((c: ContainerModel) => {
            delete c._id;
          })
      })


      this.websiteService.create(`pages`, this.website.Pages).subscribe(data => {
        if (data && data.length) {
          const pagesId = data.map((x: PageModel) => x._id);
          console.log(pagesId);
          this.website.Pages = pagesId;
          this.websiteService.create(`websites`, this.website).subscribe(data => {
            if (data && data.modifiedCount) {
              this.websiteService.getSite(this.website.Url, '/');
            }
          });
        }
      });


      // this.websiteService.create(`websites`, this.website).subscribe(data => {
      //   if (data && data.modifiedCount) {
      //     this.websiteService.getSite(this.website.Url, '/');
      //   }
      // });
    }
  }

  onClose() {
    this.closeEvent.emit(true);
  }

}
