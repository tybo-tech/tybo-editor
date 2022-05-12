
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-mini-menu',
    templateUrl: 'mini-menu.component.html',
    styleUrls: ['mini-menu.component.scss']
})
export class MiniMenuComponent implements OnInit {

    @Input() showMiniMenu: boolean;
    @Input() miniMenu: boolean;
    @Input() options: string;
    @Output() miniMenuEvent: EventEmitter<any> = new EventEmitter();
    style: any;
    closeMenu() {
        this.miniMenuEvent.emit("close");
    }
    selectMenu(e) {
        this.miniMenuEvent.emit(e);
    }

    ngOnInit(): void {
        // debugger
        let st = localStorage.getItem("xy");
        if (st)
            this.style = JSON.parse(st);

    }
}
