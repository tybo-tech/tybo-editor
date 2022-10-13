import { EVENT_NAMES, IEvent } from "../IEvent";
import { PageModel } from "../PageModel";
import { WebsiteModel } from "../WebsiteModel";
import { WidgetModel } from "../WidgetModel";
import { WidgetHelper } from "./WidgetHelper";

export class EventHelper {
  static CloseMenu(widget: WidgetModel, page: PageModel, website: WebsiteModel): WidgetModel | undefined {
    if (!widget || !widget.Events?.length)
      return;

    const currentEvent = widget.Events[0];
    if (currentEvent.Name === EVENT_NAMES.HIDE.Name && currentEvent.Inputs?.length) {
      let elementToShow: WidgetModel = WidgetHelper.getWidget(page.Widgets, currentEvent.Inputs[0].SourceId || '');
      if (!elementToShow && website.Header)
        elementToShow = WidgetHelper.getWidget([website.Header], currentEvent.Inputs[0].SourceId || '');;

      if (!elementToShow)
        return;
      this.HideElelent(elementToShow, website);
      return elementToShow;
    }
    return;
  }
  static ShowElelent(elementToShow: WidgetModel, website: WebsiteModel) {
    if (elementToShow.ItemClass && elementToShow.ItemClass.length && website.WebsiteStyles) {
      const style = website.GetStyles(elementToShow.ItemClass[0]);
      if (!style)
        return;
      // delete   style.PhoneStyles['transform'];
      style.PhoneStyles['display'] = 'block';
      style.PhoneStyles['animation'] = 'slide-in-from-right 1s ease 0s 1 normal forwards;';
      console.log(style);

    }

  }

  static HideElelent(elementToShow: WidgetModel, website: WebsiteModel) {
    if (elementToShow.ItemClass && elementToShow.ItemClass.length && website.WebsiteStyles) {
      const style = website.GetStyles(elementToShow.ItemClass[0]);
      if (!style)
        return;
      // delete   style.PhoneStyles['transform'];
      style.PhoneStyles['animation'] = 'slide-out-to-right 1s ease 0s 1 normal forwards;';
      setTimeout(() => {
        style.PhoneStyles['display'] = 'none'
      }, 2);
      console.log(style);

    }

  }

  static ToggleElelent(elementToShow: WidgetModel, website: WebsiteModel) {
    if (elementToShow.ItemClass && elementToShow.ItemClass.length && website.WebsiteStyles) {
      const style = website.GetStyles(elementToShow.ItemClass[0]);
      if (!style)
        return; if (style.PcStyles['transform'] === 'scale(0,1)') {
          style.PcStyles['transform'] = 'scale(1,1)'
          return
        }
      if (style.PcStyles['transform'] === 'scale(1,1)' || !style.PcStyles['transform'])
        style.PcStyles['transform'] = 'scale(0,1)'
      console.log(style);

    }

  }
  public static RequreAllWidgets(event: IEvent): boolean {
    return event.Name === EVENT_NAMES.TOGGLE.Name ||
      event.Name === EVENT_NAMES.SHOW.Name ||
      event.Name === EVENT_NAMES.HIDE.Name
  }

}