import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { ELEMENT_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';

@Component({
  selector: 'app-public-html-element',
  templateUrl: './public-html-element.component.html',
  styleUrls: ['./public-html-element.component.scss']
})
export class PublicHtmlElementComponent implements OnInit {
  @Input() type:any;
  @Input() ItemStyle:any;
  @Input() value: any;
  @Input() parent: any;
  @Input() items:any;
  @Input() itemCol:any;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {



  }


  onClick(){
    this.clickEvent.emit(this.value);
  }
}