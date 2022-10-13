import { MainClass } from "./MainClass";
import { PageModel } from "./PageModel";
import { WidgetModel } from "./WidgetModel";
import { HelperClass } from "./_statics/HelperClass";
import { SectionTypes } from "./_statics/SectionTypes";

export class ContainerModel extends MainClass {

    ContainerId: string;
    PageId: string;
    Name: string;
    Styles: string;
    Widgets: WidgetModel[];
    Containers: ContainerModel[];
    ContainerType: string;

    constructor(
        Id: string,
        PageId: string,
        Name: string,
        Styles: string,
        Widgets: WidgetModel[],
        ContainerType: string
    ) {
        super();
        this.ContainerId = Id;
        this.PageId = PageId;
        this.Name = Name;
        this.Styles = Styles;
        this.Widgets = Widgets;
        this.ContainerType = ContainerType;
        this.Containers = [];
    }
    AddContainer(container: ContainerModel) {
        if (container) {
            this.Containers.push(container);
        }
    }
    AddWidget(widget: WidgetModel) {
        if (widget) {
            this.Widgets.push(widget);
        }
    }
    AddImage(pageId = 'master', image = 'assets/images/widgets/brand.png', isMobileMode = false, width = '100%') {
        const element: WidgetModel = new WidgetModel(HelperClass.getId('image'), this.ContainerId, pageId, 'Text', SectionTypes.IMAGE, ``);
        element.ElementType = "image";
        element.ItemContent = image;

        this.AddWidget(element);
    }

    AddMenu(pageId = 'master', pages: PageModel[], isMobileMode = false) {
        const menuWidget: WidgetModel = new WidgetModel(
            HelperClass.getId('card-master'), this.ContainerId, pageId, 'Card-Master-1', SectionTypes.MENU, ``);
        menuWidget.ItemCategory = 'Menu';

        pages.forEach(page => {
            const menuItem: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.ContainerId, 'master', 'Item', SectionTypes.MENU_ITEM, ``);
            menuItem.ItemContent = page.Name;
            menuItem.ItemEvent = page.Url;

            menuWidget.Children.push(menuItem);
        })

        this.AddWidget(menuWidget);


    }

    AddBurger(pageId = 'master', pages: PageModel[], isMobileMode = true) {
        const menuWidget: WidgetModel = new WidgetModel(
            HelperClass.getId('card-master'), this.ContainerId, 'master', 'Card-Master-1', SectionTypes.BURGER_MENU, ``);
        menuWidget.ItemCategory = 'Menu';
        menuWidget.ItemEventName = '<i class="fas fa-bars"></i>';



        menuWidget.Children = [];
        pages.forEach(page => {
            const menuItem: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.ContainerId, 'master', 'Item', SectionTypes.MENU_ITEM, ``);
            menuItem.ItemContent = page.Name;
            menuItem.ItemEvent = page.Url;

            menuWidget.Children.push(menuItem);
        });

        const menuItemWrapper: WidgetModel = new WidgetModel(HelperClass.getId('menu-wrapper'), this.ContainerId, 'master', 'Item', SectionTypes.MENU_WRAPPER, ``);

        menuWidget.Children.push(menuItemWrapper);



        this.AddWidget(menuWidget);

    }

    DeleteWidget(index: number) {
        this.Widgets.splice(index, 1);
    }
}

