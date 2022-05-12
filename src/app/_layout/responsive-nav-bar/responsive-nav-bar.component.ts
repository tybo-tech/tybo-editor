import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { newWebsite } from 'src/app/_mocks/website';

@Component({
  selector: 'app-responsive-nav-bar',
  templateUrl: './responsive-nav-bar.component.html',
  styleUrls: ['./responsive-nav-bar.component.scss']
})
export class ResponsiveNavBarComponent implements OnInit {
  navItems: INavigation[];
  // @Input() pages: PageModel;
  @Input() logo: string;
  pages: PageModel[];

  constructor() { }

  ngOnInit() {
    this.navItems = _items;
    this.pages = newWebsite.Pages;
  }

}


export interface INavigation {
  Name: string;
  Url: string;
}

export const _items: INavigation[] = [
  { Name: 'Home', Url: '' },
  { Name: 'About', Url: '' },
  { Name: 'Services', Url: '' },
  { Name: 'Contact', Url: '' },
  { Name: 'Editor', Url: '/pages/editor' },
]