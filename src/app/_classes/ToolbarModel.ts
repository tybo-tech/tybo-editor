import { MainClass } from "./MainClass";
import { SectionModel } from "./SectionModel";
import { WidgetModel } from "./WidgetModel";

export class ToolbarModel extends MainClass {
    Name: string;
    Styles: string;
    ToolbarType: string;
    StyleClass: string[];
    Icon: string;
    Nodes: ToolbarModel[];
    Widgets: WidgetModel[];
    constructor(
        Name: string,
        Styles: string,
        ToolbarType: string,
        StyleClass: string[],
        Icon: string,
        Nodes: ToolbarModel[] = [],
        Widgets: WidgetModel[] = [],

    ) {
        super();
        this.Name = Name;
        this.Styles = Styles;
        this.ToolbarType = ToolbarType;
        this.StyleClass = StyleClass;
        this.Icon = Icon;
        this.Nodes = Nodes;
        this.Widgets = Widgets;

    }

}
