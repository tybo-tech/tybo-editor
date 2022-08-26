import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-styles-editor',
  templateUrl: './styles-editor.component.html',
  styleUrls: ['./styles-editor.component.scss']
})
export class StylesEditorComponent implements OnInit {
  @Input() styles: string;
  @Output() doneProccessing: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  proccess() {
    const lines = this.styles.trim().split(';').map(x => x.trim().split(":").map(x => x.trim()));
    let style: any = {};
    if (lines && lines.length) {
      lines.forEach(line => {
        style[line[0]] = line[1];
      })
    }
    console.log(style);
    this.doneProccessing.emit(style);

  }
}
