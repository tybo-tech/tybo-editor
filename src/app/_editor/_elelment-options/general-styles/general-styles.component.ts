import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { IInput } from 'src/app/_classes/IOptions';

@Component({
  selector: 'app-general-styles',
  templateUrl: './general-styles.component.html',
  styleUrls: ['./general-styles.component.scss']
})
export class GeneralStylesComponent implements OnInit {

  @Input() input: IInput;
  @Output() inputEvent: EventEmitter<any> = new EventEmitter();
  showBG: boolean
  constructor() { }

  ngOnInit() {
  }
  onBgChanged(image: ImageModel) {
    this.input.Value = image.Url;
    this.showBG = !this.showBG;
  }

  onInputEvent() {
    this.input.Value = "auto"
    this.inputEvent.emit(this.input);
  }

}
