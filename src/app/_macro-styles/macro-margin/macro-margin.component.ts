import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';

@Component({
  selector: 'app-micro-margin',
  templateUrl: './macro-margin.component.html',
  styleUrls: ['./macro-margin.component.scss']
})
export class MacroMarginComponent implements OnInit {


  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  corner: any
  showOptions: boolean;
  borderTop = 0;
  borderRight = 0;
  borderLeft = 0;
  borderBottom = 0;
  items = [
    { Image: 'assets/images/widgets/padding-all.svg', Id: 'all' },
    { Image: 'assets/images/widgets/padding-top.svg', Id: 'margin-top' },
    { Image: 'assets/images/widgets/padding-right.svg', Id: 'margin-right' },
    { Image: 'assets/images/widgets/padding-bottom.svg', Id: 'margin-bottom' },
    { Image: 'assets/images/widgets/padding-left.svg', Id: 'margin-left' },
  ]

  border: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.corner = this.items[0];

  }


  typeChanged() {
    if (this.corner && this.corner.Id === 'all') {
      let val: IKeyValueModel = {
        Key: 'margin-left', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'margin-right', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'margin-bottom', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'margin-top', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      this.borderTop = this.border;
      this.borderBottom = this.border;
      this.borderRight = this.border;
      this.borderLeft = this.border;
      return;
    }
    if (this.corner && this.corner.Id === 'margin-left') {
      const val: IKeyValueModel = {
        Key: 'margin-left', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      return
    }
    if (this.corner && this.corner.Id === 'margin-right') {
      const val: IKeyValueModel = {
        Key: 'margin-right', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      return
    }
    if (this.corner && this.corner.Id === 'margin-bottom') {
      const val: IKeyValueModel = {
        Key: 'margin-bottom', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      return
    }

    if (this.corner && this.corner.Id === 'margin-top') {
      const val: IKeyValueModel = {
        Key: 'margin-top', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      return
    }
  }
  selectCorner(item: any) {
    this.corner = item;
    this.showOptions = false;
    if (this.corner && this.corner.Id === 'margin-top')
      this.border = this.borderTop;

    if (this.corner && this.corner.Id === 'margin-right')
      this.border = this.borderRight;

    if (this.corner && this.corner.Id === 'margin-bottom')
      this.border = this.borderBottom;

    if (this.corner && this.corner.Id === 'margin-left')
      this.border = this.borderLeft;
  }

}
