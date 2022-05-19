import { Component, Input, OnInit } from '@angular/core';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})
export class HerosComponent implements OnInit {

  @Input() section: SectionModel;
  cardType: number;
  cardClass: string;
  currentElement: HTMLDivElement;
  pY: number;
  pX: number;
  constructor() { }
  ngAfterViewInit(): void {
    const dragableCards = document.querySelectorAll(".dragable-card");
    Array.from(dragableCards).forEach(dragableCard => {
      dragableCard.addEventListener('dragstart', (e) => {
        dragableCard.classList.add('moving');

      })
    })
  }

  ngOnInit() {
  }


  onPoints(points: { x: string, y: string, element: HTMLDivElement }) {
    if (!points)
      return;

    this.currentElement = points.element;
    this.pX = Number(points.x);
    this.pY = Number(points.y);
  }
  onMove(event: any) {
    const clientX = event.x;
    const clientY = event.y;
    let newX = this.pX - clientX;
    let newY = this.pY - clientY;
    const rect = this.getRelativeClientRect(this.currentElement);
    this.currentElement.style.left = rect.left - newX + 'px';
    this.currentElement.style.top = rect.top - newY + 'px';
    this.pX = clientX;
    this.pY = clientY;

  }


  getRelativeClientRect(el:any) {
    var rect = el.getBoundingClientRect(),
      parentRect = el.offsetParent.getBoundingClientRect();
    return {
      bottom: parentRect.bottom - rect.bottom,
      height: rect.height,
      left: rect.left - parentRect.left,
      right: parentRect.right - rect.right,
      top: rect.top - parentRect.top,
      width: rect.width
    };
  }
  valueChanged(event: string, widget: WidgetModel) {
    widget.ItemContent = event;
  }
}
