import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GET_ICONS } from 'src/app/_mocks/icons-list';

@Component({
  selector: 'app-list-icons',
  templateUrl: './list-icons.component.html',
  styleUrls: ['./list-icons.component.scss']
})
export class ListIconsComponent implements OnInit {

  @Output() iconsEvent: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  searchString: string;
  icons = GET_ICONS();
  constructor() { }

  ngOnInit(): void {
  }
  close() {
    this.onClose.emit(false)
  }

  select(icon: string) {
    this.iconsEvent.emit(icon)
  }
}
