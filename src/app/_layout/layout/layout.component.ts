import { Component, OnInit } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { newWebsite } from 'src/app/_mocks/website';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  website: WebsiteModel;
  constructor() { }

  ngOnInit() {
    this.website = newWebsite;
  }

}
