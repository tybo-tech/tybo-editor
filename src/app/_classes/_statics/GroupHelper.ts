import { PageModel } from "../PageModel";
import { WebsiteModel } from "../WebsiteModel";
import { WidgetModel } from "../WidgetModel";
import { CreateWidgetHelper } from "./CreateWidgetHelper";
import { SectionTypes } from "./SectionTypes";
import { StyleHelper } from "./StyleHelper";
import { WidgetHelper } from "./WidgetHelper";


export class GroupHelper {

  public static CalculateStackButtonPosition(widgets: WidgetModel[], website: WebsiteModel, page: PageModel) {
  }
  public static GroupItems(widgets: WidgetModel[], website: WebsiteModel, page: PageModel) {
    const tops = [];
    const lefts = [];
    const bottoms = [];
    const widths = [];
    const heights = [];

    const section: WidgetModel = WidgetHelper.getWidget(page.Widgets, widgets[0].ParentId);
    if (section) {
      console.log(section);
      const container = CreateWidgetHelper.Create(website, section, SectionTypes.CONTAINER, StyleHelper.getStackContainer(), 'stack');
      container.Children = [];
      if (container) {
        widgets.forEach(wid => {
          container.Children.push(StyleHelper.UpdatePosition(wid));
          wid.ParentId = container.WidgetId;
        });
      }
      return container;
    }
  }

  public static GetContainerDimensions(widgets: WidgetModel[], website: WebsiteModel) { }


}
