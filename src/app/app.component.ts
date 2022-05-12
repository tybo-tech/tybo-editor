import { Component } from '@angular/core';
import { WebsiteModel } from './_classes/WebsiteModel';
import { newWebsite } from './_mocks/website';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tybo-website-editor';
  website: WebsiteModel;
  constructor() {
    this.website = newWebsite;
  }
}
