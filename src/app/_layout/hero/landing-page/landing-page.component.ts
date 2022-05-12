import { Component, OnInit } from '@angular/core';
import { newWebsite } from 'src/app/_mocks/website';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  pages: any;

  constructor() { }

  ngOnInit() {
    this.pages = newWebsite.Pages;

  }

}
