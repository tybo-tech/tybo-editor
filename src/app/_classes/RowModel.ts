import { ColumnModel } from "./ColumnModel";
import { MainClass } from "./MainClass";
import { HelperClass } from "./_statics/HelperClass";

export class RowModel extends MainClass {

    RowId: string;
    SectionId: string;
    Name: string;
    Columns: ColumnModel[];
    RowType: string;

    constructor(
        Id: string,
        SectionId: string,
        Name: string,
        Widgets: ColumnModel[],
        ColumnType: string
    ) {
        super();
        this.RowId = Id;
        this.SectionId = SectionId;
        this.Name = Name;
        this.Columns = Widgets;
        this.RowType = ColumnType;
    }
    AddColumn(column: ColumnModel) {
        if (column) {
            this.Columns.push(column);
        }
    }
    AddColumnRange(count: number) {
        for (let i = 0; i < count; i++) {
            this.AddColumn(new ColumnModel(HelperClass.getId('col'),this.RowId ,'Column', '', [], 'Grid-col'));
        }
    }
}

