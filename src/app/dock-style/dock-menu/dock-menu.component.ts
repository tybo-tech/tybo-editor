import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';

@Component({
  selector: 'app-dock-menu',
  templateUrl: './dock-menu.component.html',
  styleUrls: ['./dock-menu.component.scss']
})
export class DockMenuComponent implements OnInit {
@Input() website: WebsiteModel;
@Input() page: PageModel;
  constructor() { }

  ngOnInit(): void {
  }

}
