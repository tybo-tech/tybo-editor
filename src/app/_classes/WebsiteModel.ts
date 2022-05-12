import { MainClass } from "./MainClass";
import { PageModel } from "./PageModel";
import { SectionModel } from "./SectionModel";

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
    Pages: any[] // PageModel[];
    Header: SectionModel;
    HeaderDisplay: string; // fixed, block
    HeaderType: string; // left logo right nav  <--> , both center, nav logo nav, logo space nav social,...
    HeaderVisibility: string // all pages, specific pages
    Footer: SectionModel;
    WebsiteMode: string; // edit, preview, live
    ViewDevice: string;  // phone , pc
    ViewWidth: string;  // phone , pc
    ShowPages: boolean

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
        Header: SectionModel,
        HeaderDisplay: string,
        HeaderType: string,
        HeaderVisibility: string,
        Footer: SectionModel,
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
        this.Header = Header;
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
}
