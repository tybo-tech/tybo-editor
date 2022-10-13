import { hero_col_1, hero_col_2, wid_cards } from "../_mocks/widgets";
import { ColumnModel } from "./ColumnModel";
import { ContainerModel } from "./ContainerModel";
import { DbTableModel } from "./DbTableModel";
import { MainClass } from "./MainClass";
import { RowModel } from "./RowModel";
import { SectionModel } from "./SectionModel";
import { WebsiteModel } from "./WebsiteModel";
import { WidgetModel } from "./WidgetModel";
import { HelperClass } from "./_statics/HelperClass";
import { SectionTypes } from "./_statics/SectionTypes";

export class PageModel extends MainClass {


    PageId: string;
    WebsiteId: string;
    ShowInNav: boolean;
    ShowTitle: boolean;
    Title: string;
    Name: string;
    Url: string;
    TableName: string;
    TableDisplayColName: string;
    UrlId: any;
    Styles: any;
    Sections: SectionModel[];
    Containers: ContainerModel[];
    Widgets: WidgetModel[];
    PageStatus: string;
    StyleClass: string;
    DataTittle: string;
    DisplayHeader: boolean;
    DisplayFooter: boolean;
    Tables: any[];
    PageData: any;
    SelectedTable: DbTableModel;
    // TableIdListString: string[];
    // PageData: any;
    constructor(
        PageId: string,
        showInNav: boolean,
        showTitle: boolean,
        title: string,
        name: string,
        url: string,
        pageStatus: string,
        styles: any,
        sections: SectionModel[],
        styleClass = 'link',
        DisplayHeader = true,
        DisplayFooter = true,
        UrlId = false
    ) {
        super();
        this.PageId = PageId;
        this.ShowInNav = showInNav;
        this.ShowTitle = showTitle;
        this.Title = title;
        this.Name = name;
        this.Url = url;
        this.PageStatus = pageStatus;
        this.Styles = styles;
        this.Sections = sections;
        this.StyleClass = styleClass;
        this.DisplayHeader = DisplayHeader;
        this.DisplayFooter = DisplayFooter;
        this.UrlId = UrlId;
        this.Containers = [];
        this.Widgets = [];
    }

    AddContainerWidget(container: WidgetModel) {
        this.Widgets.push(container);
    }
    AddContainer(container: ContainerModel) {
        if (!container)
            return;

     


        this.Containers.push(container);
    }
    AddSection(section: SectionModel) {
        if (!section)
            return;



        if (section.SectionType === SectionTypes.HERO) {
            section.ItemClass = ['grid-2'];

            const row = new RowModel(HelperClass.getId('row'), section.SectionId, 'Section Row', [], 'Row');
            const col = new ColumnModel(HelperClass.getId('col'), row.RowId, 'Col-1', '', [], 'Grid-col');
            const col2 = new ColumnModel(HelperClass.getId('col'), row.RowId, 'Col-2', '', [], 'Grid-col');
            col.Widgets = [...hero_col_1];
            col2.Widgets = [...hero_col_2]
            row.AddColumn(col);
            row.AddColumn(col2);

            section.AddRow(row);

            section.GridStyle = { 'gap': '0' }
            section.GridStyle['max-width'] = '90rem'


        }

        if (section.SectionType === SectionTypes.CARD3) {
            section.ItemClass = ['grid-3'];
        }

        if (section.SectionType === SectionTypes.EMPTY) {
        }


        if (section.SectionType === SectionTypes.FOOTER) {
        }
        this.Sections.push(section);
    }

    MoveSectionUp(section: SectionModel, sectionIndex: number) {
        const topRow = this.Sections[sectionIndex - 1]
        if (!topRow)
            return;
        if (+topRow.OrderNumber === +section.OrderNumber)
            section.OrderNumber = (+section.OrderNumber + 1);

        const orderNumber = +topRow.OrderNumber;


        topRow.OrderNumber = section.OrderNumber;
        section.OrderNumber = orderNumber;
        this.OrderNumber = orderNumber;
        this.Sort();
    }

    MoveSectionToTop(section: SectionModel) {
        if (!this.Sections || !this.Sections.length)
            return;

        this.Sections.forEach(s => {
            s.OrderNumber++;
        });

        section.OrderNumber = 0;
        this.Sort();

        // for(let i = 0; i < this.Sections.length-1; i++){
        //     this.Sections[i]= this.Sections[i+1];
        // }
        // this.Sections[0] = section;




    }

    Sort() {
        this.Sections.sort(function (a, b) {
            return +a.OrderNumber - +b.OrderNumber;
        });
    }


    RecursiveWidget(arr: WidgetModel[], id: string) {
        return arr
            .filter((el) => el.WidgetId !== id)
            .map((el) => {
                if (!el.Children || !Array.isArray(el.Children)) return el;
                el.Children = this.RecursiveWidget(el.Children, id);
                return el;
            });
    }

}
