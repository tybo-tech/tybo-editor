import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { IInput } from 'src/app/_classes/IOptions';

@Component({
  selector: 'app-options-input',
  templateUrl: './options-input.component.html',
  styleUrls: ['./options-input.component.scss']
})
export class OptionsInputComponent implements OnInit {
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
    this.inputEvent.emit(this.input);
  }
}
