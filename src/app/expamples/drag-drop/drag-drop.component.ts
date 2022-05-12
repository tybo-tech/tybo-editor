import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  draggables: NodeListOf<Element>;
  containers: NodeListOf<Element>;

  constructor() { }

  ngOnInit() {
    this.draggables = document.querySelectorAll(".draggable")
    this.containers = document.querySelectorAll(".holder");

    Array.from(this.draggables).forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });


      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      })
    })


    Array.from(this.containers).forEach(container => {
      container.addEventListener('dragover', (e: MouseEvent) => {
        e.preventDefault();
        const afterElemennt = this.getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElemennt == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElemennt);
        }


      });


    })


  }
  getDragAfterElement(container: Element, y) {
    const draggbles = Array.from(container.querySelectorAll('.draggable:not(.dragging)'));
    return draggbles.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }



    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }
}
