import { MainClass } from "./MainClass";
import { PageModel } from "./PageModel";
import { WidgetModel } from "./WidgetModel";
import { HelperClass } from "./_statics/HelperClass";
import { SectionTypes } from "./_statics/SectionTypes";

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
        ColumnType: string
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
    AddImage(pageId = 'master', image = 'assets/images/widgets/brand.png', isMobileMode = false, width = '100%') {
        const element: WidgetModel = new WidgetModel(HelperClass.getId('image'), this.ColumnId, pageId, 'Text', SectionTypes.IMAGE, ``);
        element.ElementType = "image";
        element.ItemContent = image;
        element.ItemStyle = { 'width': width, 'margin-left': '2rem', 'margin-top': '.5rem' };
        element.ItemMobileStyle ={ 'width': '5rem', 'margin-left': '2rem', 'margin-top': '.5rem', position:'relative', top: '7px' };
        element.SelectedStyle = isMobileMode ? element.ItemMobileStyle : element.ItemStyle;
        this.AddWidget(element);
    }

    AddMenu(pageId = 'master', pages: PageModel[], isMobileMode = false) {
        const menuWidget: WidgetModel = new WidgetModel(
            HelperClass.getId('card-master'), this.ColumnId, pageId, 'Card-Master-1', SectionTypes.MENU, ``);
        menuWidget.ItemCategory = 'Menu';
        menuWidget.ItemStyle = { 'margin-left': '2rem', 'margin-right': '2rem', 'display': 'flex', position: 'relative', top: '10px', 'justify-content': 'end' };
        menuWidget.ItemMobileStyle = { 'display': 'none' };
        menuWidget.SelectedStyle = isMobileMode ? menuWidget.ItemMobileStyle : menuWidget.ItemStyle;

        pages.forEach(page => {
            const menuItem: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.ColumnId, 'master', 'Item', SectionTypes.MENU_ITEM, ``);
            menuItem.ItemContent = page.Name;
            menuItem.ItemEvent = page.Url;
            menuItem.ItemStyle = { 'margin-right': '2rem' };
            menuItem.ItemMobileStyle = {};
            menuItem.SelectedStyle = isMobileMode ? menuWidget.ItemMobileStyle : menuWidget.ItemStyle;
            menuWidget.Children.push(menuItem);
        })

        this.AddWidget(menuWidget);


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



        this.AddWidget(menuWidget);

    }

    DeleteWidget(index: number) {
        this.Widgets.splice(index, 1);
    }
}

