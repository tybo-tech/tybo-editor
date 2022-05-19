import { Component, Input, OnInit } from '@angular/core';
import { IOptions, CONFIG_ITEMS, IInput } from 'src/app/_classes/IOptions';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  styles: IOptions[] = CONFIG_ITEMS;
  @Input() element: WidgetModel;
  @Input() type:any;
  pages: any[];
  constructor(private www: WebsiteService) {
    www.websiteObservable.subscribe(data=>{
      if(data)
      this.pages = data.Pages;
    })
   }

  ngOnInit() {
    this.styles[0].Url =  this.element.ItemEvent
  }
  onInputEvent(style: IOptions) {
    this.element.ItemEvent = style.Url;
  }
}
