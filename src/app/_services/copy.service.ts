import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ColumnModel } from '../_classes/ColumnModel';
import { SectionModel } from '../_classes/SectionModel';
import { WidgetModel } from '../_classes/WidgetModel';
import { HelperClass } from '../_classes/_statics/HelperClass';


@Injectable({
  providedIn: 'root'
})
export class CopyService {



  private copiedItemBehaviorSubject: BehaviorSubject<any>;
  public copiedItemObservable: Observable<any>;


  private copiedChildItemBehaviorSubject: BehaviorSubject<any>;
  public copiedChildItemObservable: Observable<any>;


  constructor() {
    this.copiedItemBehaviorSubject = new BehaviorSubject<any>(null);
    this.copiedItemObservable = this.copiedItemBehaviorSubject.asObservable();

    this.copiedChildItemBehaviorSubject = new BehaviorSubject<any>(null);
    this.copiedChildItemObservable = this.copiedChildItemBehaviorSubject.asObservable();
  }

  copy(itemInMoemory: any) {
    this.copiedItemBehaviorSubject.next(itemInMoemory);
  }
  copyChildItem(itemInMoemory: any) {
    this.copiedChildItemBehaviorSubject.next(itemInMoemory);
  }

  getColumnToPaste(column: ColumnModel): ColumnModel | undefined {
    if (!column.ColumnId || !column.ColumnType)
      return ;

    const col = new ColumnModel(HelperClass.getId('col'), column.RowId, 'Col-1', '', [], 'Grid-col');
    col.Widgets = column.Widgets;
    col.ItemStyle = column.ItemStyle;
    return col;
  }

  getWidgetToPaste(widget: WidgetModel): WidgetModel | undefined{
    if (!widget.WidgetId && !widget.ItemContent && !widget.ItemHeading && !widget.ImageUrl && !widget.ItemEventName)
      return undefined;
    return widget;
  }
  geSectionContentToPaste(section: SectionModel): SectionModel |undefined{
    if (!section.SectionId && !section.Columns)
      return undefined;
    return section;
  }

  getStylesToPaste(data: any): any {
    if (data && !data.CreateDate) // It ot an object , all object have CreateDate, so it styles
      return data;
    return null;
  }
}
