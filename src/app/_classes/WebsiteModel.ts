import { DbTableModel } from "./DbTableModel";
import { FileModel } from "./FileModel";
import { ImportsModel } from "./ImportsModel";
import { MainClass } from "./MainClass";
import { PageModel } from "./PageModel";
import { WebstyleModel } from "./WebstyleModel";
import { WidgetModel } from "./WidgetModel";
import { CssProperties } from "./_statics/CssProperties";
import { DeviceTypes } from "./_statics/DeviceTypes";
import { HelperClass } from "./_statics/HelperClass";
import { SectionTypes } from "./_statics/SectionTypes";
import { StyleHelper } from "./_statics/StyleHelper";

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
    Header: WidgetModel | undefined;
    HeaderDisplay: string; // fixed, block
    HeaderType: string; // left logo right nav  <--> , both center, nav logo nav, logo space nav social,...
    HeaderVisibility: string // all pages, specific pages
    Footer: WidgetModel | undefined;
    WebsiteMode: string; // edit, preview, live
    ViewDevice: string;  // phone , pc
    ViewWidth: string;  // phone , pc
    ShowPages: boolean
    MaxWidth: string;
    WebsiteStyles: WebstyleModel[];
    SelectedClass: WebstyleModel;
    Imports: ImportsModel[];
    Files: FileModel[];
    DbTables: DbTableModel[];
    Widgets: WidgetModel[];
    WidgetsToDelete: WidgetModel[];
    Collections: any
    TableIdListString: string[];
    ItemType: string;
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
        Header: WidgetModel | undefined,
        HeaderDisplay: string,
        HeaderType: string,
        HeaderVisibility: string,
        Footer: WidgetModel | undefined,
        WebsiteMode: string,
        ViewDevice: string,
        ViewWidth: string,
        WebsiteStyles = []
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
        this.WebsiteStyles = WebsiteStyles;
        this.Files = [];
        this.Files = [];
        this.DbTables = [];
        this.WidgetsToDelete = [];
        this.Collections = [];
        this.TableIdListString = [];

    }

    AddPage(page: PageModel) {
        if (!page)
            return;
        this.Pages.push(page);
    }

    IsMobileMode() {
        return this.ViewDevice === DeviceTypes.PHONE;
    }
    HasStyles() {
        return this.WebsiteStyles && this.WebsiteStyles.length;
    }
    GetStyles(selectorName: string) {
        if (!this.WebsiteStyles || !this.WebsiteStyles.length)
            return;
        return this.WebsiteStyles.find(x => x.SelectorName === selectorName);
    }
    GetClassForWidget(widget: WidgetModel) {
        if (!this.HasStyles() || !widget.HasClass())
            return;

        return this.WebsiteStyles.find(x => x.SelectorName === widget.ItemClass[0])
    }
    AddHeader(pageId = 'master', columnId = '') {
        // Main header contaner
        if (!this.WebsiteStyles || !this.WebsiteStyles.length) {
            this.WebsiteStyles = [];
        }
        this.Header = new WidgetModel(HelperClass.getId('header'), columnId, pageId, 'Main Header', SectionTypes.CONTAINER, ``);
        this.Header.ItemCategory = SectionTypes.HEADER;
        this.Header.ParentId = this.WebsiteId;
        let checkIfClassExist = this.WebsiteStyles.find(x => x.SelectorName === "nav--bar");
        this.Header.GetClass(this, 'nav--bar', StyleHelper.getFlexNavBar());


        const boxContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), 'col', pageId, 'Box', SectionTypes.CONTAINER, ``);
        boxContainer.ParentId = this.Header.WidgetId;
        boxContainer.GetClass(this, 'nav-box-container',
            StyleHelper.getFlexNavBar([{ Key: 'justify-content', Value: 'space-between' }, { Key: 'background', Value: 'none' }, { Key: 'max-width', Value: '1280px' }]));

        // Logo container

        const logoContainer = new WidgetModel(HelperClass.getId('header'), columnId, pageId, 'Logo Container', SectionTypes.CONTAINER, ``);
        logoContainer.ParentId = boxContainer.WidgetId;
        logoContainer.GetClass(this, 'logo-container',
            StyleHelper.getFlex([{ Key: 'flex-basis', Value: '13%' }, { Key: 'height', Value: CssProperties.AUTO }]),
            StyleHelper.getFlex([{ Key: 'flex-basis', Value: '30%' }, { Key: 'height', Value: CssProperties.AUTO }]),
            StyleHelper.getFlex([{ Key: 'flex-basis', Value: '50%' }, { Key: 'height', Value: CssProperties.AUTO }])
        );

        // logoContainer.AddImage(undefined, `assets/images/widgets/sample-logo-white.png`);
        const logo: WidgetModel = new WidgetModel(HelperClass.getId('image'), '', 'master', 'Logo', SectionTypes.IMAGE, ``);
        logo.ElementType = "image";
        logo.ItemContent = 'assets/images/widgets/sample-logo-white.png';
        logo.ParentId = logoContainer.WidgetId;
        logo.GetClass(this, 'logo-image', { 'width': '100%', position: 'relative' })
        logoContainer.AddChild(logo);


        // menu caontainer


        const menuContainer = new WidgetModel(HelperClass.getId('header'), columnId, pageId, 'Menu Container', SectionTypes.CONTAINER, ``);
        menuContainer.ParentId = boxContainer.WidgetId;
        menuContainer.GetClass(this, 'nav-items-container',
            StyleHelper.getFlex([{ Key: 'justify-content', Value: 'flex-end' }, { Key: 'align-items', Value: 'center' }, { Key: 'height', Value: CssProperties.AUTO }])
        );

        // Mobile menu icon
        const menuIcon: WidgetModel = new WidgetModel(HelperClass.getId('image'), '', 'master', 'Menu Icon', SectionTypes.BUTTON, ``);
        menuIcon.ElementType = "image";
        menuIcon.ItemContent = '<i class="fas fa-bars"></i>';
        menuIcon.ParentId = menuContainer.WidgetId;
        menuIcon.GetClass(this, 'menu-button', { 'display': 'none' }, StyleHelper.getMobileMenuStyles(), StyleHelper.getMobileMenuStyles())
        menuContainer.AddChild(menuIcon);
        // debugger
        menuContainer.AddMenu(this, 'master', this.Pages);
        boxContainer.AddChild(logoContainer);
        boxContainer.AddChild(menuContainer);
        this.Header.AddChild(boxContainer);
    }

    AddFooter() { }
}
