import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[idraggable]'
})

export class DrageDropDirective {
    mouseDown: boolean;
    prevX: number;
    prevY: number;
    newX: number;
    newY: number;
    className: string | undefined;
    resizing: boolean;
    constructor(private element: ElementRef) {
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        let classesElement = <HTMLDivElement>event.target;
        if (classesElement.classList && classesElement.classList.length > 1) {
            this.className = classesElement.classList[1];
            this.resizing = true;

        } else {
            this.resizing = false;
            this.className = undefined
        }

        this.prevX = event.clientX;
        this.prevY = event.clientY;
        this.mouseDown = true;
    }
    @HostListener('window:mouseup', ['$event'])
    onMouseup() {
        this.mouseDown = false;
        this.resizing = false;
    }


    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        const rect = this.element.nativeElement.getBoundingClientRect();
        if (this.mouseDown && !this.resizing) {
            this.newX = this.prevX - event.clientX;
            this.newY = this.prevY - event.clientY;
            this.element.nativeElement.style.left = rect.left - this.newX + 'px';
            this.element.nativeElement.style.top = rect.top - this.newY + 'px';
        }


        if (this.mouseDown && this.resizing && this.className) {
            if (this.className === 'se') {
                this.element.nativeElement.style.width = rect.width - (this.prevX - event.clientX) + 'px';
                this.element.nativeElement.style.height = rect.height - (this.prevY - event.clientY) + 'px';
            }

            if (this.className === 'sw') {
                this.element.nativeElement.style.width = rect.width + (this.prevX - event.clientX) + 'px';
                this.element.nativeElement.style.height = rect.height - (this.prevY - event.clientY) + 'px';
                this.element.nativeElement.style.left = rect.left - (this.prevX - event.clientX) + 'px';
            }

            
            if (this.className === 'ne') {
                this.element.nativeElement.style.width = rect.width - (this.prevX - event.clientX) + 'px';
                this.element.nativeElement.style.height = rect.height + (this.prevY - event.clientY) + 'px';
                this.element.nativeElement.style.top = rect.top - (this.prevY - event.clientY) + 'px';
            } 
            
            if (this.className === 'nw') {
                this.element.nativeElement.style.width = rect.width + (this.prevX - event.clientX) + 'px';
                this.element.nativeElement.style.height = rect.height + (this.prevY - event.clientY) + 'px';
                this.element.nativeElement.style.top = rect.top - (this.prevY - event.clientY) + 'px';
                this.element.nativeElement.style.left = rect.left - (this.prevX - event.clientX) + 'px';

            } 
            

            
            // if (this.className === 'sw') {
            //     this.element.nativeElement.style.width = rect.width + (this.prevX - event.clientX) + 'px';
            //     this.element.nativeElement.style.height = rect.height - (this.prevY - event.clientY) + 'px';
            //     this.element.nativeElement.style.left = rect.left - (this.prevX - event.clientX) + 'px';
            // }
        }

        this.prevX = event.clientX;
        this.prevY = event.clientY;

    }
}