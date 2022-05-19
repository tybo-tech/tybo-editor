import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-element-tools',
  templateUrl: './element-tools.component.html',
  styleUrls: ['./element-tools.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElementToolsComponent implements OnInit {
  tabs = [
    { Id: 'styles', Name: '<i class="fas fa-paint-brush" style="margin-right: .5rem;"></i> Styles', Class: ['active'] },
    { Id: 'options', Name: ' <i class="fas fa-cog" style="margin-right: .5rem;"></i>   Options', Class: [] },
  ]
  tabId: string = this.tabs[0].Id;
  element: any;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.optionsObservable.subscribe(data => {
      this.element = data;
      // console.log(data);
    })
  }
  onTab(tab:any) {
    this.tabs.map(t => t.Class = [])
    tab.Class = ['active'];
    this.tabId = tab.Id;
  }
}
