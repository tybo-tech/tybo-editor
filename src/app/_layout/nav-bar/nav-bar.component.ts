import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() pages: PageModel;
  @Input() logo: string;
  constructor() { }

  ngOnInit() {
  }

}
