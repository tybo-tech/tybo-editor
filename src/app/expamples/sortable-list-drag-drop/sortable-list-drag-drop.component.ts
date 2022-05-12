import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sortable-list-drag-drop',
  templateUrl: './sortable-list-drag-drop.component.html',
  styleUrls: ['./sortable-list-drag-drop.component.scss']
})
export class SortableListDragDropComponent implements OnInit, AfterViewInit {
  dragableList: HTMLElement;
  makeCoffeSteps = [
    'Pick a cup',
    'Add some suger',
    'Add some milk',
    'Add coffe',
    'Pour  boiling water',
    'Stir',
    'Wiat for it to cool down'

  ];

  listItems = [];
  drageStartIndex;
  endStartIndex;
  copyArray: string[];
  dragables: NodeListOf<Element>;
  dragListItems: NodeListOf<Element>;
  constructor() { }

  ngOnInit() {
    this.dragableList = document.getElementById("draggable-list");
    this.copyArray = [...this.makeCoffeSteps];
    this.copyArray = this.copyArray.map(a => ({ value: a, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);

  }

  ngAfterViewInit(): void {
    this.addEvents();
  }

  check() {
    // alert(2)
    this.copyArray.forEach( (item, index) => {
      const element = document.getElementById(`${index}`);
      element.classList.remove('right');
      element.classList.remove('wrong')
      
      if (item === this.makeCoffeSteps[index]) {
        element.classList.add('right')


      } else {
        element.classList.add('wrong')


      }
    })
  }
  createList() { }
  addEvents() {
    this.dragables = document.querySelectorAll(".draggable");
    this.dragListItems = document.querySelectorAll(".draggable-list li");

    Array.from(this.dragables).forEach(dragable => {
      dragable.addEventListener('dragstart', () => {
        this.dragStart(dragable)
      });
    });

    Array.from(this.dragListItems).forEach(dragListItem => {
      dragListItem.addEventListener('dragover', (e) => {
        this.dragOver(e)
      });
    });

    Array.from(this.dragListItems).forEach(dragListItem => {
      dragListItem.addEventListener('drop', () => {
        this.drop(dragListItem);
      });
    });




    Array.from(this.dragListItems).forEach(dragListItem => {
      dragListItem.addEventListener('dragenter', () => {
        this.dragEnter(dragListItem)
      });
    });

    Array.from(this.dragListItems).forEach(dragListItem => {
      dragListItem.addEventListener('dragleave', () => {
        this.dragLeave(dragListItem)
      });
    });

  }
  dragEnter(dragListItem: Element): EventListenerOrEventListenerObject {
    dragListItem.classList.add('over');
    return
  }
  dragLeave(dragListItem: Element): EventListenerOrEventListenerObject {
    dragListItem.classList.remove('over');
    return;
  }


  drop(element: Element) {
    this.endStartIndex = Number(element.getAttribute('id'));
    this.swapItes(this.drageStartIndex, this.endStartIndex);
    element.classList.remove('over');

    return;
  }
  dragOver(e: Event): EventListenerOrEventListenerObject {
    e.preventDefault();
    return;
  }
  dragStart(element: Element): EventListenerOrEventListenerObject {
    this.drageStartIndex = Number(element.closest("li").getAttribute('id'));
    return;
  }

  swapItes(from, to) {
    const temp = this.copyArray[from];
    this.copyArray[from] = this.copyArray[to];
    this.copyArray[to] = temp;
  }
}
