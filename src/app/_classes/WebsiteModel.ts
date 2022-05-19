import { ColumnModel } from "./ColumnModel";
import { MainClass } from "./MainClass";
import { PageModel } from "./PageModel";
import { RowModel } from "./RowModel";
import { SectionModel } from "./SectionModel";
import { DeviceTypes } from "./_statics/DeviceTypes";
import { HelperClass } from "./_statics/HelperClass";
import { SectionTypes } from "./_statics/SectionTypes";

export class WebsiteModel extends MainClass {
    WebsiteId: string;
    Name: string;
    Url: string;
    Logo: string;
    LogoStyles: any;
    NavItemsStyles: any;
    Title: string;
    Category: string;
    SubCategory: string;
    Icon: string;
    Pages: any[];
    // Pages:  PageModel[];
    Header: SectionModel | undefined;
    HeaderDisplay: string; // fixed, block
    HeaderType: string; // left logo right nav  <--> , both center, nav logo nav, logo space nav social,...
    HeaderVisibility: string // all pages, specific pages
    Footer: SectionModel | undefined;
    WebsiteMode: string; // edit, preview, live
    ViewDevice: string;  // phone , pc
    ViewWidth: string;  // phone , pc
    ShowPages: boolean
    MaxWidth: string;

    constructor(
        WebsiteId: string,
        Name: string,
        Url: string,
        Logo: string,
        LogoStyles: any,
        NavItemsStyles: any,
        Title: string,
        Category: string,
        SubCategory: string,
        Icon: string,
        Pages: PageModel[],
        Header: SectionModel | undefined,
        HeaderDisplay: string,
        HeaderType: string,
        HeaderVisibility: string,
        Footer: SectionModel | undefined,
        WebsiteMode: string,
        ViewDevice: string,
        ViewWidth: string,
    ) {
        super();
        this.WebsiteId = WebsiteId;
        this.Name = Name;
        this.Url = Url;
        this.Logo = Logo;
        this.LogoStyles = LogoStyles;
        this.NavItemsStyles = NavItemsStyles;
        this.Title = Title;
        this.Category = Category;
        this.SubCategory = SubCategory;
        this.Icon = Icon;
        this.Pages = Pages;
        this.Header = Header || undefined;
        this.HeaderDisplay = HeaderDisplay;
        this.HeaderType = HeaderType;
        this.HeaderVisibility = HeaderVisibility;
        this.Footer = Footer;
        this.WebsiteMode = WebsiteMode;
        this.ViewDevice = ViewDevice;
        this.ViewWidth = ViewWidth;
    }

    AddPage(page: PageModel) {
        if (!page)
            return;
        this.Pages.push(page);
    }

    IsMobileMode() {
        return this.ViewDevice === DeviceTypes.PHONE;
    }

    AddHeader(pageId = 'master') {
        this.Header = new SectionModel(HelperClass.getId('section'), pageId, 'Header Section', '', [], [], SectionTypes.HEADER, 'max-width', '100%');
        this.Header.ItemStyle = { 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'background': '#000000' };
        this.Header.SelectedStyle = { 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'background': '#000000' };
        this.Header.ItemMobileStyle = { 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'background': '#000000' };


        const row = new RowModel(HelperClass.getId('row'), this.Header.SectionId, 'Section Row', [], 'Row');
        row.ItemStyle = {
            'grid-template-columns': '20% auto', 'display': 'grid', 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'max-width': '80%', 'margin-left': 'auto',
            'margin-right': 'auto'
        }
        row.ItemMobileStyle = { 'grid-template-columns': '40% auto', 'display': 'grid', 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'max-width': '100%' }
        row.SelectedStyle = this.IsMobileMode() ? row.ItemMobileStyle : row.ItemStyle;

        for (let i = 0; i < 2; i++) {
            let col = new ColumnModel(HelperClass.getId('col'), row.RowId, 'Col-1', '', [], 'Grid-col');
            col.ItemStyle = { 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'background': '#000000' };
            col.SelectedStyle = { 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'background': '#000000' };
            col.ItemMobileStyle = { 'min-height': SectionTypes.HEADER_MIN_HEIGHT, 'background': '#000000' };
            if (i == 0) {
                col.AddImage(undefined, undefined, this.IsMobileMode(), '9rem');
            }
            if (i == 1) {
                col.AddMenu('master', this.Pages, this.IsMobileMode());
                col.AddBurger('master', this.Pages);
            }

            row.AddColumn(col);
        }
        this.Header.AddRow(row);
    }

    AddFooter() { }
}
