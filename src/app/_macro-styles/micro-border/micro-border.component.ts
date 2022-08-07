import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-micro-border',
  templateUrl: './micro-border.component.html',
  styleUrls: ['./micro-border.component.scss']
})
export class MicroBorderComponent implements OnInit {



  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  corner: any
  color: string = '#3498db';
  showOptions: boolean;
  borderTop = 0;
  borderRight = 0;
  borderLeft = 0;
  borderBottom = 0;
  items = [
    { Image: 'assets/images/widgets/border-all.svg', Id: 'all' },
    { Image: 'assets/images/widgets/border-top.svg', Id: 'border-top' },
    { Image: 'assets/images/widgets/border-right.svg', Id: 'border-right' },
    { Image: 'assets/images/widgets/border-bottom.svg', Id: 'border-bottom' },
    { Image: 'assets/images/widgets/border-left.svg', Id: 'border-left' },
  ]

  border: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.corner = this.items[0];

    const borderTop: string = WidgetHelper.getStyleValue('border-top', this.widget, this.website);
    if (borderTop) {
      const items = borderTop.split(" ");
      if (items && items.length > 2) {
        this.borderTop = parseInt(items[0]);
        this.color = items[2]
      }
    }

    const borderRight: string = WidgetHelper.getStyleValue('border-right', this.widget, this.website);
    if (borderRight) {
      const items = borderRight.split(" ");
      if (items && items.length > 2) {
        this.borderRight = parseInt(items[0]);
        this.color = items[2]
      }
    }

    const borderBottom: string = WidgetHelper.getStyleValue('border-bottom', this.widget, this.website);
    if (borderBottom) {
      const items = borderBottom.split(" ");
      if (items && items.length > 2) {
        this.borderBottom = parseInt(items[0]);
        this.color = items[2]
      }
    }

    const borderLeft: string = WidgetHelper.getStyleValue('border-left', this.widget, this.website);
    if (borderLeft) {
      const items = borderLeft.split(" ");
      if (items && items.length > 2) {
        this.borderLeft = parseInt(items[0]);
        this.color = items[2]
      }
    }
  }


  typeChanged() {
    if (this.corner && this.corner.Id === 'all') {
      let val: IKeyValueModel = {
        Key: 'border-left', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'border-right', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'border-bottom', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);

      val = {
        Key: 'border-top', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);
      this.borderTop = this.border;
      this.borderBottom = this.border;
      this.borderRight = this.border;
      this.borderLeft = this.border;
      return;
    }
    if (this.corner && this.corner.Id === 'border-left') {
      const val: IKeyValueModel = {
        Key: 'border-left', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);

      return
    }
    if (this.corner && this.corner.Id === 'border-right') {
      const val: IKeyValueModel = {
        Key: 'border-right', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);
      return
    }
    if (this.corner && this.corner.Id === 'border-bottom') {
      const val: IKeyValueModel = {
        Key: 'border-bottom', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);
      return
    }

    if (this.corner && this.corner.Id === 'border-top') {
      const val: IKeyValueModel = {
        Key: 'border-top', Value: `${this.border}px solid ${this.color}  !important`
      }
      this.styleChaged.emit(val);
      return
    }
  }
  selectCorner(item: any) {
    this.corner = item;
    this.showOptions = false;
    if (this.corner && this.corner.Id === 'border-top')
      this.border = this.borderTop;

    if (this.corner && this.corner.Id === 'border-right')
      this.border = this.borderRight;

    if (this.corner && this.corner.Id === 'border-bottom')
      this.border = this.borderBottom;

    if (this.corner && this.corner.Id === 'border-left')
      this.border = this.borderLeft;
  }
}
