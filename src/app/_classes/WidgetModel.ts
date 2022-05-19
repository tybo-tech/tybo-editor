import { FormModel } from "./FormModel";
import { MainClass } from "./MainClass";
import { HelperClass } from "./_statics/HelperClass";
import { SectionTypes } from "./_statics/SectionTypes";

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
        this.AddStyles();
    }
    AddChild(widget: WidgetModel) {
        if (widget) {
            this.Children.push(widget);
        }
    }

    AddImage(pageId = 'master', image = 'assets/images/widgets/brand.png', isMobileMode = false, width = '100%') {
        const element: WidgetModel = new WidgetModel(HelperClass.getId('image'), this.ColumnId, pageId, 'Image', SectionTypes.IMAGE, ``);
        element.ElementType = "image";
        element.ItemContent = image;
        element.ItemStyle = { 'width': width, 'margin-left': '2rem', 'margin-top': '.5rem' };
        element.ItemMobileStyle = { 'width': '5rem', 'margin-left': '2rem', 'margin-top': '.5rem', position: 'relative', top: '7px' };
        element.SelectedStyle = isMobileMode ? element.ItemMobileStyle : element.ItemStyle;
        this.AddChild(element);
    }

    AddStyles() {
        if (this.ItemType === SectionTypes.BUTTON) {
            this.ItemStyle = { 'background-color': '#2980b9', 'padding': '8px 30px', 'color': '#ffffff', 'border': 'none', 'border-radius': '4px' }
        }
        if (this.ItemType === SectionTypes.BURGER_MENU) {
            this.ItemStyle = { 'width': '2.5rem', 'position': 'absolute', 'top': '8px', 'right': '7px', 'background-color': '#ffffff', 'padding': '4px', 'color': '#000000', 'border': 'none', 'border-radius': '2px' };
            this.ItemMobileStyle = this.ItemStyle;
            this.SelectedStyle = this.ItemStyle;
        }
        if (this.ItemType === SectionTypes.MENU) {
            this.ItemStyle = { 'list-style-type': 'none', 'display': 'flex', 'gap': '1rem', 'align-items': 'center', 'justify-content': 'end', 'top': '2px' }
        }
    }


}
