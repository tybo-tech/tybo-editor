import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";
import { EventService } from "../_services/event.service";

@Directive({
    selector: '[can_drop_on_me]'
})

export class CanDrogOnMeDirective {
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    @Output() onCardDrop: EventEmitter<any> = new EventEmitter();
    @Output() onMove: EventEmitter<any> = new EventEmitter();
    constructor(private element: ElementRef, private eventService: EventService) {
    }

    @HostListener('drop', ['$event'])
    Drop(event: MouseEvent) {
        const card_event = <HTMLDivElement>event.target;
        const card_event_classes = Array.from(card_event.classList).find(x => x === 'contextmenu_card');
        if (card_event_classes) {
            const dragging = document.querySelector('.dragging');
            this.element.nativeElement.classList.remove('over');

            if (dragging)
                this.onCardDrop.emit(this.element.nativeElement);
            return;
        }


        const moving = <HTMLElement>document.querySelector('.moving');
        const dragging = document.querySelector('.dragging');
        this.element.nativeElement.classList.remove('over');

        if (dragging)
            this.onDrop.emit(this.element.nativeElement);

        if (moving)
            this.onMove.emit({ x: event.clientX, y: event.clientY });
    }

    // @HostListener('drop', ['$event'])
    // CardDrop(event: MouseEvent) {
    //     const dragging = document.querySelector('.dragging');
    //     this.element.nativeElement.classList.remove('over');

    //     if (dragging)
    //         this.onCardDrop.emit(this.element.nativeElement);

    // }

    @HostListener('dragover', ['$event'])
    onDragOver(event: MouseEvent) {
        event.preventDefault();
        this.element.nativeElement.classList.add('over');
    }

    @HostListener('dragleave', ['$event'])
    onMouseLeave(event: MouseEvent) {
        event.preventDefault();
        this.element.nativeElement.classList.remove('over');
    }


    // @HostListener('dragover', ['$event'])
    // onDragOver(event: MouseEvent) {
    //     event.preventDefault();
    //     var overs = document.querySelectorAll(".over");
    //     Array.from(overs).forEach(over => {
    //         // over.classList.remove("over");
    //     })
    //     // console.log("overs: ", overs);

    //     const __target = <HTMLDivElement>event.target;
    //     const classes = Array.from(__target.classList).find(x => x === 'contextmenu_card');
    //     console.log("__target: ", __target);

    //     this.element.nativeElement.classList.add('over');
    //     console.log("  this.element.nativeElement", this.element.nativeElement);

    // }

}