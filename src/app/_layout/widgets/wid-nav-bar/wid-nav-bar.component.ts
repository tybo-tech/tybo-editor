import { Component, Input, OnInit } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';


@Component({
  selector: 'app-wid-nav-bar',
  templateUrl: './wid-nav-bar.component.html',
  styleUrls: ['./wid-nav-bar.component.scss']
})
export class WidNavBarComponent implements OnInit {
  @Input() website: WebsiteModel;
  constructor() { }

  ngOnInit() {
    if (this.website)
      this.website.Pages.forEach(page => { page.ItemStyle = { 'color': 'white', 'font-size': '12px' } })
  }
  onImageChange(e) {
    this.website.Logo = e;
    // alert(e)
  }
}
