import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { WidgetModel } from 'src/app/_classes/WidgetModel';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent {
  @Input() widget: WidgetModel;
  draggables: NodeListOf<Element>;
  cardImage = 'assets/images/widgets/card-1.svg';
  heroImage = 'assets/images/widgets/hero-1.svg';
  constructor() { }
}
