import { ColumnModel } from "./ColumnModel";
import { MainClass } from "./MainClass";
import { RowModel } from "./RowModel";

export class SectionModel extends MainClass {

    SectionId: string;
    PageId: string;
    Name: string;
    Styles: string;
    Rows: RowModel[];
    Columns: ColumnModel[];
    SectionType: string;
    GridStyle: any;
    MobileGridStyle: any;
    ContentWidth: string;
    ContentWidthMode: string;  // Max width, full screen
    ShowGridOptions: boolean;
    Diplayed?: boolean;
    constructor(
        Id: string,
        PageId: string,
        Name: string,
        Styles: string,
        Rows: RowModel[],
        Columns: ColumnModel[],
        SectionType: string,
        ContentWidthMode:string,
        ContentWidth:string,
        GridStyle = {},
        ShowGridOptions = false,
        MobileGridStyle = {},
    ) {
        super();
        this.SectionId = Id;
        this.PageId = PageId;
        this.Name = Name;
        this.Styles = Styles;
        this.Rows = Rows;
        this.Columns = Columns;
        this.SectionType = SectionType;
        this.GridStyle = GridStyle;
        this.ContentWidth = ContentWidth;
        this.ContentWidthMode = ContentWidthMode;
        this.ShowGridOptions = ShowGridOptions
        this.MobileGridStyle = MobileGridStyle
    }
    AddColumn(column: ColumnModel, index = 0) {
        if (column && index == 0) {
            this.Columns.push(column);
            return
        }

        if (column && index > 0) {
            this.Columns.splice(index, 0, column);
            return
        }
    }
    AddRow(row: RowModel, index = 0) {
        if (row && index == 0) {
            this.Rows.push(row);
            return
        }

        if (row && index > 0) {
            this.Rows.splice(index, 0, row);
            return
        }
    }

    MoveRowUp(row: RowModel, rowIndex: number) {
        const topRow = this.Rows[rowIndex - 1]
        if (!topRow)
            return;
        if (+topRow.OrderNumber === +row.OrderNumber)
            row.OrderNumber = (+row.OrderNumber + 1);

        const orderNumber = +topRow.OrderNumber;


        topRow.OrderNumber = row.OrderNumber;
        row.OrderNumber = orderNumber;
        this.OrderNumber = orderNumber;
        this.Sort();
    }

    Sort() {
        this.Rows.sort(function (a, b) {
            return +a.OrderNumber - +b.OrderNumber;
        });
    }
}

