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

        if (this.element.nativeElement.classList[0] === 'widget-item') {
            this.element.nativeElement.classList.add('dragging');
        }

        if (this.element.nativeElement.classList[0] === 'movable') {
            this.element.nativeElement.classList.add('moving');
            this.onPoints.emit({ x: prevX, y: prevY, element: this.element.nativeElement });
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