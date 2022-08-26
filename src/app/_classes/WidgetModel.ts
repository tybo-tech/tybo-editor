import { FormModel } from "./FormModel";
import { IEvent } from "./IEvent";
import { MainClass } from "./MainClass";
import { PageModel } from "./PageModel";
import { WebsiteModel } from "./WebsiteModel";
import { WebstyleModel } from "./WebstyleModel";
import { HelperClass } from "./_statics/HelperClass";
import { SectionTypes } from "./_statics/SectionTypes";
import { StyleHelper } from "./_statics/StyleHelper";

export class WidgetModel extends MainClass {


    WidgetId: string;
    ColumnId: string;
    PageId: string;
    Name: string;
    ItemType: string;
    ItemContent: string;
    ItemHeading: string;
    ItemEventName: string;
    ItemEvent: string;
    Children: WidgetModel[];
    ImageUrl: string;
    ImageStyles: any;
    HeadingStyles: any;
    ContentStyles: any;
    EventStyles: any;
    ElementType: string;
    RowNumber: number;
    ColNumber: number;
    Form: FormModel | undefined;
    SelectedClass: WebstyleModel | undefined;
    FeildName?: string;
    ParentWidget: WidgetModel;
    IsParentWidget: boolean;
    UrlId: string
    RouteId?: string;
    WebsiteId: string;
    BackgroundType: string;
    IsTemplate: boolean;
    GrandParent: WidgetModel;
    DbTable: string;
    UrlValue: string;
    ItemFormat: any;
    Events: IEvent[];
    constructor(
        WidgetId: string,
        ColumnId: string,
        PageId: string,
        Name: string,
        ItemType: string,
        ImageUrl: string = '',
        Children: WidgetModel[] = [],
        ParentId: string = '',
        ItemContent: string = '',
        ItemHeading: string = '',
        ItemEvent: string = '',
        ItemEventName: string = '',
        ImageStyles = {},
        HeadingStyles = {},
        ContentStyles = {},
        EventStyles = {},
        ElementType = "div",
        RowNumber = 1,
        ColNumber = 1,
        Form = undefined

    ) {
        super();
        this.WidgetId = WidgetId;
        this.ColumnId = ColumnId;
        this.PageId = PageId;
        this.Name = Name;
        this.ItemType = ItemType;
        this.ParentId = ParentId;
        this.ItemContent = ItemContent;
        this.ItemEvent = ItemEvent;
        this.ItemEventName = ItemEventName;
        this.ItemHeading = ItemHeading;
        this.Children = Children;
        this.ImageUrl = ImageUrl;
        this.ImageStyles = ImageStyles;
        this.HeadingStyles = HeadingStyles;
        this.ContentStyles = ContentStyles;
        this.EventStyles = EventStyles;
        this.ElementType = ElementType;
        this.RowNumber = RowNumber;
        this.ColNumber = ColNumber;
        this.Form = Form;
        // this.AddStyles();
        this.OrderNumber = Children.length + 1;
        // this.ItemClass = [this.WidgetId]
    }
    AddChild(widget: WidgetModel) {
        if (widget) {
            this.Children.push(widget);
        }
    }

    AddImage(pageId = 'master', image = 'assets/images/widgets/brand.png', isMobileMode = false, width = '100%', parentId = '',) {
        const element: WidgetModel = new WidgetModel(HelperClass.getId('image'), this.ColumnId, pageId, 'Image', SectionTypes.IMAGE, ``);
        element.ElementType = "image";
        element.ParentId = parentId;
        element.ItemContent = image;
        element.ItemClass = ["image"];
        this.AddChild(element);
    }

    AddText(pageId = 'master', ItemContent = 'I ma text , click here to edit', isMobileMode = false) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('text'), this.WidgetId, pageId, 'Text', SectionTypes.CARD1, ``);
        text.ElementType = "p";
        text.ItemContent = ItemContent;
        debugger
        text.ParentId = this.WidgetId;
        text.ItemStyle = { 'color': '#000000' };
        text.ItemMobileStyle = { 'color': '#000000' };
        text.SelectedStyle = isMobileMode ? text.ItemMobileStyle : text.ItemStyle;
        this.AddChild(text);
    }

    AddStyles() {
        if (this.ItemType === SectionTypes.BUTTON) {
            this.ItemStyle = { 'background-color': '#2980b9', 'padding': '4px 15px', 'color': '#ffffff', 'border': 'none', 'border-radius': '4px', 'width': ' fit-content', 'text-align': 'center' }
            this.ItemMobileStyle = this.ItemStyle;
            this.SelectedStyle = this.ItemStyle;
        }
        if (this.ItemType === SectionTypes.BURGER_MENU) {
            this.ItemStyle = { 'width': '2.5rem', 'position': 'absolute', 'top': '8px', 'right': '7px', 'background-color': '#ffffff', 'padding': '4px', 'color': '#000000', 'border': 'none', 'border-radius': '2px' };
            this.ItemMobileStyle = this.ItemStyle;
            this.SelectedStyle = this.ItemStyle;
        }
        if (this.ItemType === SectionTypes.MENU) {
            this.ItemStyle = { 'list-style-type': 'none', 'display': 'flex', 'gap': '1rem', 'align-items': 'center', 'justify-content': 'end', 'top': '2px' }
            this.ItemMobileStyle = this.ItemStyle;
            this.SelectedStyle = this.ItemStyle;
        }
    }


    AddMenu(website: WebsiteModel, pageId = 'master', pages: PageModel[]) {
        const ul: WidgetModel = new WidgetModel(HelperClass.getId('card-master'), this.ColumnId, pageId, 'Nav Ul', SectionTypes.UL, ``);
        ul.GetClass(website, 'menu--items', { padding: '0', 'margin': '0' }, StyleHelper.getUlStylePhone(), StyleHelper.getUlStylePhone());
        ul.ParentId = this.WidgetId;

        // debugger
        // classes
        const tempLI: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.ColumnId, 'master', 'List item', SectionTypes.LI, ``);
        tempLI.GetClass(website, 'menu--item', StyleHelper.getNavListItemStylePC(), StyleHelper.getNavListItemStylePhone(), StyleHelper.getNavListItemStylePhone());
        const tempA: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.ColumnId, 'master', 'List item', SectionTypes.LI, ``);
        tempA.GetClass(website, 'link', StyleHelper.getLinkStyle());
        pages.forEach(page => {
            const li: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.ColumnId, 'master', 'List item', SectionTypes.LI, ``);
            li.ItemClass =tempLI.ItemClass;
            li.ItemContent = '';
            li.ParentId = ul.WidgetId;

            const a: WidgetModel = new WidgetModel(HelperClass.getId('a'), this.ColumnId, 'master', 'Link item', SectionTypes.A, ``);
            a.ItemClass = tempA.ItemClass;;
            a.ItemContent = page.Name;
            a.ItemEvent = page.Url;
            a.ParentId = li.WidgetId;


            li.Children.push(a);
            ul.Children.push(li);
        })

        this.AddChild(ul);


    }

    AddBurger(pageId = 'master', pages: PageModel[], isMobileMode = true) {
        const menuWidget: WidgetModel = new WidgetModel(
            HelperClass.getId('card-master'), this.ColumnId, 'master', 'Card-Master-1', SectionTypes.BURGER_MENU, ``);
        menuWidget.ItemCategory = 'Menu';
        menuWidget.ItemEventName = '<i class="fas fa-bars"></i>';
        menuWidget.ItemMobileStyle = {
            'margin-left': '2rem',
            'margin-right': '2rem',
            'position': 'absolute',
            'top': '10px',
            'width': '2.5rem',
            'border-radius': '4px',
            'padding': ' 3px',
            'right': '-10px'
        };
        menuWidget.ItemStyle = { 'display': 'none' };
        menuWidget.SelectedStyle = isMobileMode ? menuWidget.ItemMobileStyle : menuWidget.ItemStyle;


        menuWidget.Children = [];
        pages.forEach(page => {
            const menuItem: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.ColumnId, 'master', 'Item', SectionTypes.MENU_ITEM, ``);
            menuItem.ItemContent = page.Name;
            menuItem.ItemEvent = page.Url;
            menuItem.ItemStyle = {
                "color": "#000000",
                "font-weight": "700",
                "text-align": "center",
                "width": "100%",
                "display": "block",
                'margin-top': '2px',
                'margin-bottom': '2px',
            }

            menuItem.ItemMobileStyle = menuItem.ItemStyle;
            menuItem.SelectedStyle = menuItem.ItemStyle;
            menuWidget.Children.push(menuItem);
        });

        const menuItemWrapper: WidgetModel = new WidgetModel(HelperClass.getId('menu-wrapper'), this.ColumnId, 'master', 'Item', SectionTypes.MENU_WRAPPER, ``);
        menuItemWrapper.ItemStyle = {
            'position': 'absolute',
            top: 0,
            right: 0,
            height: '100vh',
            width: '90%',
            'z-index': 1000,
            'background': '#ffffff',
            'padding-left': '4px',
            'padding-right': '4px',
            'color': '#000000',
            'border': 'none',
            'border-radius': '0',
            'padding-top': "15px"
        }
        menuItemWrapper.ItemMobileStyle = menuItemWrapper.ItemStyle;
        menuItemWrapper.SelectedStyle = menuItemWrapper.ItemStyle;
        menuWidget.Children.push(menuItemWrapper);



        this.AddChild(menuWidget);

    }


    MoveWidgetUp(widget: WidgetModel, sectionIndex: number, indexOfItemBeingMoved: number = -1, indexOfItemAtPostion: number = -1) {
        // debugger
        const topRow = this.Children[indexOfItemAtPostion]
        if (!topRow)
            return;

        widget.OrderNumber = topRow.OrderNumber - 1;
        topRow.OrderNumber = topRow.OrderNumber + 1;
        this.Sort();
    }
    MoveWidgetDown(widget: WidgetModel, sectionIndex: number, indexOfItemBeingMoved: number = -1, indexOfItemAtPostion: number = -1) {
        // debugger
        const bottomWidget = this.Children[indexOfItemAtPostion]
        if (!bottomWidget)
            return;

        widget.OrderNumber = bottomWidget.OrderNumber + 1;
        bottomWidget.OrderNumber = widget.OrderNumber - 1;
        this.Sort();
    }

    Sort() {
        this.Children.sort(function (a, b) {
            return +a.OrderNumber - +b.OrderNumber;
        });
    }

    HasClass() {
        return this.ItemClass && this.ItemClass.length;
    }

    GetClass(website: WebsiteModel, itemClass: string, pcStyles: any, tabStyles: any = undefined, phoneStyle: any = undefined) {
        let checkIfClassExist = website.WebsiteStyles.filter(x => x.SelectorName.includes(itemClass));
        const newClassName = `${itemClass}-${checkIfClassExist.length + 1}`;
        this.ItemClass = [newClassName];
        const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), website.WebsiteId, newClassName, {});
        newClass.PcStyles = pcStyles;
        newClass.TabStyles = tabStyles || pcStyles;
        newClass.PhoneStyles = phoneStyle || pcStyles;
        if (!website.WebsiteStyles || !website.WebsiteStyles.length)
            website.WebsiteStyles = [];
        website.WebsiteStyles.push(newClass);
    }
}
