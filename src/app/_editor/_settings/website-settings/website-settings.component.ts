import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerModel } from 'src/app/_classes/ContainerModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
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
  user: UserModel;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit() {
    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });
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


    if (this.website.Id) {
      this.websiteService.patch(`websites/update-website.php`, {
        Name: this.website.Name,
        Title: this.website.Title,
        Url: this.website.Url,
        Logo: this.website.Logo,
        Category: this.website.Category,
        SubCategory: this.website.SubCategory,
        Icon: this.website.Icon,
        StatusId: this.website.StatusId,
        ItemClass: this.website.ItemClass,
        WebsiteId: this.website.WebsiteId,
        ModifyUserId: this.user.UserId || this.website.ModifyUserId || '',
        Id: this.website.Id
      }).subscribe(data => {

      });
    }


    if (!this.website.Id) {
      delete this.website.Id
      this.website.Pages.forEach(p => {
        delete p._id;
        if (p.Containers)
          p.Containers.forEach((c: ContainerModel) => {
            delete c.Id;
          })
      })

      this.websiteService.create(`websites/update-website.php`, this.website).subscribe(data => {
        this.website.WebsiteStyles.forEach(style => {
          style.PcStyles = JSON.parse(style.PcStyles);
          style.PhoneStyles = JSON.parse(style.PhoneStyles);
          style.TabStyles = JSON.parse(style.TabStyles);
        });

      })
    }
  }

  onClose() {
    this.closeEvent.emit(true);
  }

}
