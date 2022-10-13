import { WebsiteModel } from "./WebsiteModel";
import { WidgetModel } from "./WidgetModel";
import { DisplayKeys } from "./_statics/DisplayKeys";
import { StyleHelper } from "./_statics/StyleHelper";

export class DisplayModel {



    DisplayId: string;
    Name: string;
    Url: string;
    Action: string;
    Classes: string[];
    constructor(
        DisplayId: string,
        Name: string,
        Url: string,
        Action: string,
        Classes: string[],
    ) {
        this.DisplayId = DisplayId;
        this.Name = Name;
        this.Url = Url;
        this.Action = Action;
        this.Classes = Classes;
    }
    DisplayClick(widget: WidgetModel, website: WebsiteModel) {
        const style = StyleHelper.SelectStyles(website, widget);
        if (style && DisplayKeys.ALIGN_LIST.find(x => x === this.DisplayId)) {
            StyleHelper.AlignItems(style, this.DisplayId);
        }
        
        let key = DisplayKeys.FLEX_ALIGN_LIST.find(x => x.Value === this.DisplayId);
        if (style && key) {
            StyleHelper.ApplyStyle(style, this.DisplayId, key.Key);
        }
        key = DisplayKeys.FLEX_DIRECTION_LIST.find(x => x.Value === this.DisplayId);
        if (style && key) {
            StyleHelper.ApplyStyle(style, this.DisplayId, key.Key);
        }
    }
}
