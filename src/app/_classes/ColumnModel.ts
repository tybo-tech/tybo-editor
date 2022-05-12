import { MainClass } from "./MainClass";
import { WidgetModel } from "./WidgetModel";

export class ColumnModel extends MainClass {

    ColumnId: string;
    RowId: string;
    Name: string;
    Styles: string;
    Widgets: WidgetModel[];
    ColumnType: string;

    constructor(
        Id: string,
        RowId: string,
        Name: string,
        Styles: string,
        Widgets: WidgetModel[],
        ColumnType:string
    ) {
        super();
        this.ColumnId = Id;
        this.RowId = RowId;
        this.Name = Name;
        this.Styles = Styles;
        this.Widgets = Widgets;
        this.ColumnType = ColumnType;
    }
    AddWidget(widget: WidgetModel) {
        if (widget) {
            this.Widgets.push(widget);
        }
    }

    DeleteWidget(index: number){
        this.Widgets.splice(index,1);
    }
}

