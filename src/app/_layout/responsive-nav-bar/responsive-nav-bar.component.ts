import { Component, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-responsive-nav-bar',
  templateUrl: './responsive-nav-bar.component.html',
  styleUrls: ['./responsive-nav-bar.component.scss']
})
export class ResponsiveNavBarComponent implements OnInit {
  pages: PageModel[] = [];
  loggedIn: boolean;
  user: UserModel | undefined;

  constructor(private websiteService: WebsiteService) { }

  ngOnInit() {
    this.websiteService.userObservable.subscribe(data => {
      this.user = data;
      if (this.user) {
        this.pages = pages;
      } else {
        this.pages = publicPages;
      }
    });
  }

}


export interface INavigation {
  Name: string;
  Url: string;
}

export const publicPages: PageModel[] = [
  // new PageModel(HelperClass.getId(`page`), true, false, 'Home', 'Home', '/', "Active", {}, []),
  new PageModel(HelperClass.getId(`page`), true, true, 'Templates', 'Templates', '/pages/templates', "Active", {}, []),
  // new PageModel(HelperClass.getId(`page`), true, true, 'Price List', 'Price List', '/pages/price-list', "Active", {}, []),
  // new PageModel(HelperClass.getId(`page`), true, true, 'Contacts', 'Contacts', '/pages/contacts', "Active", {}, []),
  new PageModel(HelperClass.getId(`page`), true, true, 'Editor', 'Login', '/account/login', "Active", {}, [], 'btn btn-dark'),
  new PageModel(HelperClass.getId(`page`), true, true, 'Editor', 'Register', '/account/register', "Active", {}, [], 'btn btn-primary'),
];
export const pages: PageModel[] = [
  // new PageModel(HelperClass.getId(`page`), true, false, 'Home', 'Home', '/', "Active", {}, []),
  new PageModel(HelperClass.getId(`page`), true, true, 'Templates', 'Templates', '/pages/templates', "Active", {}, []),
  // new PageModel(HelperClass.getId(`page`), true, true, 'Price List', 'Price List', '/pages/price-list', "Active", {}, []),
  // new PageModel(HelperClass.getId(`page`), true, true, 'Contacts', 'Contacts', '/pages/contacts', "Active", {}, []),
  new PageModel(HelperClass.getId(`page`), true, true, 'Editor', 'My workspace', '/account/workspace', "Active", {}, [], 'btn btn-primary'),
];