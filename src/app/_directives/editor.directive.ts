import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[editor_item]'
})

export class EditorDirective {
    @Output() OnInputEvent: EventEmitter<any> = new EventEmitter();
    clicked: boolean;
    mouseLeft: boolean;
    constructor(private element: ElementRef) {
    }

    @HostListener('mouseleave')
    OnInput() {
     this.OnInputEvent.emit(this.element.nativeElement.innerHTML)
    }
}