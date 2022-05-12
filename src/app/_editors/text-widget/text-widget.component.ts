import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent implements OnInit {
  @Input() text: string;
  contenteditable = true;
  forecolor: string

  constructor() { }

  ngOnInit() {
  }
  topActionButtons(action: string) {
    if (action === 'forecolor') {
      document.execCommand(action, false, this.forecolor);
    }
    else
      document.execCommand(action);
  }
}
