import { Component, Input, OnInit } from '@angular/core';
import { WidgetModel } from 'src/app/_classes/WidgetModel';

@Component({
  selector: 'app-nasted-widget',
  templateUrl: './nasted-widget.component.html',
  styleUrls: ['./nasted-widget.component.scss']
})
export class NastedWidgetComponent implements OnInit {
  @Input() widget: WidgetModel;

  constructor() { }

  ngOnInit(): void {
  }
  toggleOptions(e: any){}
  toogleMiniMenu(event:any,widget: WidgetModel){}
}
