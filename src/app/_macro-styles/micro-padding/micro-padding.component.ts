import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-micro-padding',
  templateUrl: './micro-padding.component.html',
  styleUrls: ['./micro-padding.component.scss']
})
export class MicroPaddingComponent implements OnInit {



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
    { Image: 'assets/images/widgets/padding-top.svg', Id: 'padding-top' },
    { Image: 'assets/images/widgets/padding-right.svg', Id: 'padding-right' },
    { Image: 'assets/images/widgets/padding-bottom.svg', Id: 'padding-bottom' },
    { Image: 'assets/images/widgets/padding-left.svg', Id: 'padding-left' },
  ]

  border: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.corner = this.items[0];

  }


  typeChanged() {
    if (this.corner && this.corner.Id === 'all') {
      let val: IKeyValueModel = {
        Key: 'padding-left', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'padding-right', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'padding-bottom', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'padding-top', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      this.borderTop = this.border;
      this.borderBottom = this.border;
      this.borderRight = this.border;
      this.borderLeft = this.border;
      return;
    }
    if (this.corner && this.corner.Id === 'padding-left') {
      const val: IKeyValueModel = {
        Key: 'padding-left', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);

      return
    }
    if (this.corner && this.corner.Id === 'padding-right') {
      const val: IKeyValueModel = {
        Key: 'padding-right', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      return
    }
    if (this.corner && this.corner.Id === 'padding-bottom') {
      const val: IKeyValueModel = {
        Key: 'padding-bottom', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      return
    }

    if (this.corner && this.corner.Id === 'padding-top') {
      const val: IKeyValueModel = {
        Key: 'padding-top', Value: `${this.border}px`
      }
      this.styleChaged.emit(val);
      return
    }
  }
  selectCorner(item: any) {
    this.corner = item;
    this.showOptions = false;
    if (this.corner && this.corner.Id === 'padding-top')
      this.border = this.borderTop;

    if (this.corner && this.corner.Id === 'padding-right')
      this.border = this.borderRight;

    if (this.corner && this.corner.Id === 'padding-bottom')
      this.border = this.borderBottom;

    if (this.corner && this.corner.Id === 'padding-left')
      this.border = this.borderLeft;
  }

}
