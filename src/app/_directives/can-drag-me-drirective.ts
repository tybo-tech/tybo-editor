import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[candragme]'
})

export class CanDragMeDropDirective {
    @Output() onPoints: EventEmitter<any> = new EventEmitter();
    constructor(private element: ElementRef) {
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        const prevX = event.clientX;
        const prevY = event.clientY;
        console.log('Start: ',prevX, prevY);


        if (this.element.nativeElement.classList[0] === 'widget-item') {
            this.element.nativeElement.classList.add('dragging');
        }

        if (this.element.nativeElement.classList[0] === 'movable') {
            this.element.nativeElement.classList.add('moving');
            this.onPoints.emit({ x: prevX, y: prevY, element: this.element.nativeElement });
        }
        if (this.element.nativeElement.classList[0] === 'draggables') {
            this.element.nativeElement.classList.add('dragging');
            this.onPoints.emit({ x: prevX, y: prevY, element: null });
        }
    }

    @HostListener('dragend', ['$event'])
    onDragend(event: MouseEvent) {
        if (this.element.nativeElement.classList[0] === 'widget-item') {
            this.element.nativeElement.classList.remove('dragging');
        }

        if (this.element.nativeElement.classList[0] === 'movable') {
            this.element.nativeElement.classList.remove('moving');
        }


    }


}