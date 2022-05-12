import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[can_hover_me]'
})

export class HoveMeDirective {
    @Output() onHover: EventEmitter<any> = new EventEmitter();
    clicked: boolean;
    mouseLeft: boolean;
    constructor(private element: ElementRef) {
    }

    @HostListener('mouseover', ['$event'])
    onMouseOver(event: MouseEvent) {
        this.mouseLeft = false;
        this.element.nativeElement.classList.add('mouse-over');
    }

    @HostListener('click', ['$event'])
    onMousedown(event: MouseEvent) {
        const __target = <HTMLDivElement>event.target;
        const classes = Array.from(__target.classList).find(x => x === '__target')
        if (classes)
            return;
        this.element.nativeElement.classList.add('mouse-over');
        this.clicked = !this.clicked
        this.onHover.emit(this.clicked);
    }


    @HostListener('document:click', ['$event'])
    docClik(event: MouseEvent) {
        const __target = <HTMLDivElement>event.target;
        const classes = Array.from(__target.classList).find(x => x === '__target')
        if (this.clicked && this.mouseLeft && !classes) {
            this.clicked = !this.clicked
            this.onHover.emit(this.clicked);
            this.element.nativeElement.classList.remove('mouse-over');
        }

    }


    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: MouseEvent) {
        event.preventDefault();
        this.mouseLeft = true;
        if (!this.clicked)
            this.element.nativeElement.classList.remove('mouse-over');

        // this.onHover.emit(this.clicked);
    }



    // @HostListener('click', ['$event'])
    // onClick(event: MouseEvent) {
    //     this.clicked = !this.clicked;
    // }

}