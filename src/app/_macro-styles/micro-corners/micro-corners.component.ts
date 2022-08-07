import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-micro-corners',
  templateUrl: './micro-corners.component.html',
  styleUrls: ['./micro-corners.component.scss']
})
export class MicroCornersComponent implements OnInit {


  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  corner: any
  showOptions: boolean;
  tl = 0;
  tr = 0;
  bl = 0;
  br = 0;
  items = [
    { Image: 'assets/images/widgets/all-corners.svg', Id: 'all' },
    { Image: 'assets/images/widgets/corners-top-left.svg', Id: 'corners-top-left' },
    { Image: 'assets/images/widgets/corners-top-right.svg', Id: 'corners-top-right' },
    { Image: 'assets/images/widgets/corners-bottom-right.svg', Id: 'corners-bottom-right' },
    { Image: 'assets/images/widgets/corners-bottom-left.svg', Id: 'corners-bottom-left' },
  ]

  softness: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.corner = this.items[0];

    if (!this.widget.Settings) {
      this.widget.Settings = {};
    }


    if (this.widget.Settings["tl"])
      this.tl = this.widget.Settings["tl"];

    if (this.widget.Settings["border-radius"])
      this.softness = +this.widget.Settings["border-radius"];


    if (this.widget.Settings["tr"])
      this.tr = this.widget.Settings["tr"];


    if (this.widget.Settings["bl"])
      this.bl = this.widget.Settings["bl"];


    if (this.widget.Settings["br"])
      this.br = this.widget.Settings["br"];

  }


  typeChanged() {
    if (this.corner && this.corner.Id === 'all') {
      const val: IKeyValueModel = {
        Key: 'border-radius', Value: this.softness + 'px'
      }
      this.styleChaged.emit(val);
      this.widget.Settings["border-radius"] = this.softness;
      return
    }
    if (this.corner && this.corner.Id === 'corners-top-left')
      this.tl = this.softness;

    if (this.corner && this.corner.Id === 'corners-top-right')
      this.tr = this.softness;

    if (this.corner && this.corner.Id === 'corners-bottom-right')
      this.br = this.softness;

    if (this.corner && this.corner.Id === 'corners-bottom-left')
      this.bl = this.softness;

    const br = `${this.tl}px ${this.tr}px ${this.br}px ${this.bl}px`
    this.widget.Settings["tl"] = this.tl;
    this.widget.Settings["tr"] = this.tr;
    this.widget.Settings["bl"] = this.bl;
    this.widget.Settings["br"] = this.br;
    const val: IKeyValueModel = {
      Key: 'border-radius', Value: br
    }
    this.styleChaged.emit(val);
  }
  selectCorner(item: any) {
    this.corner = item;
    this.showOptions = false;
    if (this.corner && this.corner.Id === 'corners-top-left')
      this.softness = this.tl;

    if (this.corner && this.corner.Id === 'corners-top-right')
      this.softness = this.tr;

    if (this.corner && this.corner.Id === 'corners-bottom-right')
      this.softness = this.br;

    if (this.corner && this.corner.Id === 'corners-bottom-left')
      this.softness = this.bl;
  }
}
