import { WebsiteModel } from "../WebsiteModel";
import { WidgetModel } from "../WidgetModel";
import { HelperClass } from "./HelperClass";



export class CreateWidgetHelper {

  public static Create(website: WebsiteModel, containerWidget: WidgetModel, sectionType: string, styleFuction : any, className: string) {
    const newWidget: WidgetModel = new WidgetModel(HelperClass.getId(sectionType.toLocaleLowerCase()), containerWidget.WidgetId, containerWidget.PageId, sectionType, sectionType, ``);
    newWidget.ParentId = containerWidget.WidgetId;
    containerWidget.AddChild(newWidget);
    newWidget.GetClass(website,className, styleFuction)
    return newWidget;
  }


}
