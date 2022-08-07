import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';

@Component({
  selector: 'app-micro-layout',
  templateUrl: './micro-layout.component.html',
  styleUrls: ['./micro-layout.component.scss']
})
export class MicroLayoutComponent implements OnInit {
  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Output() styleChaged: EventEmitter<IKeyValueModel> = new EventEmitter<IKeyValueModel>();
  direction: any
  justify: any
  align: any
  showDirection: boolean;
  showJustify: boolean;
  showAlign: boolean;
  justifyItemsList: any = [];
  gridColumns: number = 1;
  directions = [
    { Image: 'assets/images/widgets/row.svg', Id: 'row' },
    { Image: 'assets/images/widgets/column.svg', Id: 'column' },
  ]
  rows = [
    { Image: 'assets/images/widgets/row-start.svg', Id: 'start' },
    { Image: 'assets/images/widgets/row-center.svg', Id: 'center' },
    { Image: 'assets/images/widgets/row-end.svg', Id: 'end' },
    { Image: 'assets/images/widgets/row-space-between.svg', Id: 'space-between' },
  ]
  colsAlign = [
    { Image: 'assets/images/widgets/col-align-start.svg', Id: 'start' },
    { Image: 'assets/images/widgets/col-align-center.svg', Id: 'center' },
    { Image: 'assets/images/widgets/col-align-end.svg', Id: 'end' },
  ]
  rowsAlign = [
    { Image: 'assets/images/widgets/row-align-start.svg', Id: 'start' },
    { Image: 'assets/images/widgets/row-align-center.svg', Id: 'center' },
    { Image: 'assets/images/widgets/row-align-end.svg', Id: 'end' },
  ]

  alignItems: any = [];
  columns = [
    { Image: 'assets/images/widgets/column-start.svg', Id: 'start' },
    { Image: 'assets/images/widgets/column-center.svg', Id: 'center' },
    { Image: 'assets/images/widgets/column-end.svg', Id: 'end' },
    { Image: 'assets/images/widgets/column-space-between.svg', Id: 'space-between' },
  ]

  softness: number = 0;
  display: any;
  constructor() { }

  ngOnInit(): void {
    this.justifyItemsList = this.rows;
    this.alignItems = this.rowsAlign;
    this.direction = this.justifyItemsList[0];
    this.justify = this.justifyItemsList[0];
    this.align = this.alignItems[0];
    const direction = WidgetHelper.getStyleValue('flex-direction', this.widget, this.website);
    this.display = WidgetHelper.getStyleValue('display', this.widget, this.website);
    const cols: string = WidgetHelper.getStyleValue('grid-template-columns', this.widget, this.website);
    if (cols) {
      this.gridColumns = cols.split(' ').length - 1
    }

    if (direction) {
      if (direction === 'column') {
        this.justifyItemsList = this.columns;
        this.alignItems = this.colsAlign;
      }
      if (direction === 'row') {
        this.justifyItemsList = this.rows;
        this.alignItems = this.rowsAlign;
      }
      this.direction = this.directions.find((x: any) => x.Id === direction);
    }

    const justify = WidgetHelper.getStyleValue('justify-content', this.widget, this.website);
    if (justify) {

      this.justify = this.justifyItemsList.find((x: any) => x.Id === justify);
    }

  }


  typeChanged() {

  }
  selectDirection(item: any) {
    this.direction = item;
    this.showDirection = false;
    if (item.Id === 'column') {
      this.justifyItemsList = this.columns;
      this.alignItems = this.colsAlign;
    }
    if (item.Id === 'row') {
      this.justifyItemsList = this.rows;
      this.alignItems = this.rowsAlign;
    }
    const val: IKeyValueModel = {
      Key: 'flex-direction', Value: item.Id
    }
    this.styleChaged.emit(val);
  }
  selectJustify(item: any) {
    this.justify = item;
    this.showDirection = false;
    const val: IKeyValueModel = {
      Key: 'justify-content', Value: item.Id
    }
    this.styleChaged.emit(val);
  }
  selectAlign(item: any) {
    this.align = item;
    this.showAlign = false;
    const val: IKeyValueModel = {
      Key: 'align-items', Value: item.Id
    }
    this.styleChaged.emit(val);
  }
  gridChanged() {
    const i = (100 / +this.gridColumns);
    let cols = '';
    for (let j = 1; j <= this.gridColumns; j++) {
      cols += `${i.toString().substring(0, 5)}% `
    }
    const val: IKeyValueModel = {
      Key: 'grid-template-columns', Value: cols
    }
    this.styleChaged.emit(val);

  }
}
