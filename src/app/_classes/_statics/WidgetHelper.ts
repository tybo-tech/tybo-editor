import { Emitters } from "src/app/_emmiters/Emitters";
import { IUpdateWidget } from "src/app/_services/sync.service";
import { DbCollectionModel } from "../DbCollectionModel";
import { PageModel } from "../PageModel";
import { WebsiteModel } from "../WebsiteModel";
import { WebstyleModel } from "../WebstyleModel";
import { WidgetModel } from "../WidgetModel";
import { DataKeys } from "./DataTypes";
import { DeviceTypes } from "./DeviceTypes";
import { HelperClass } from "./HelperClass";
import { SectionTypes } from "./SectionTypes";

export class WidgetHelper {


  public static removeDynamicWidgets(arr: WidgetModel[]): WidgetModel[] {
    return arr
      .filter((el) => !el.ParentWidget)
      .map((el) => {
        if (!el.Children || !Array.isArray(el.Children)) return el;
        el.Children = this.removeDynamicWidgets(el.Children);
        return el;
      });
  }


  public static getWidget(arr: WidgetModel[], id: string) {
    if (arr && arr.length) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].WidgetId === id) {
          return arr[i];
        }
        let widget: any = this.getWidget(arr[i].Children, id);
        if (widget) return widget;
      }


    }
  }

  public static mapIwidgetUpdateFromWidget(widget: WidgetModel): IUpdateWidget {
    const iwid: IUpdateWidget = {
      ParentId: widget.ParentId,
      Name: widget.Name,
      OrderNumber: widget.OrderNumber,
      Settings: widget.Settings,
      BackgroundType: widget.BackgroundType,
      FeildName: widget.FeildName || '',
      ItemFormat: widget.ItemFormat || '',
      DbTable: widget.DbTable,
      ItemEventName: widget.ItemEventName || '',
      ItemEvent: widget.ItemEvent,
      UrlId: widget.UrlId,
      ItemContent: widget.ItemContent,
      ItemClass: widget.ItemClass.filter((x: string) => x !== "active-node"),
      ItemCategory: widget.ItemCategory,
      ModifyUserId: widget.ModifyUserId,
      StatusId: widget.StatusId,
      Id: Number(widget.Id)
    }
    return iwid;
  }
  static GetPageData(website: WebsiteModel, tableName: string) {
    if (website.DbTables && website.Collections) {
      const table = website.DbTables.find(x => x.Name === tableName)
      if (table) {
        const data: any = website.Collections[table.TableId];
        return data;
      }
    }
  }

  public static proccessWidget(widget: WidgetModel, website: WebsiteModel, page: PageModel) {
    if (widget && widget.Children) {

      if (widget.ItemCategory === SectionTypes.DB_LIST && widget.DbTable) {
        const tableData: any[] = this.GetPageData(website, widget.DbTable);
        if (tableData && tableData.length) {
          widget.Children.forEach(child => {
            if (child && child.ItemCategory === SectionTypes.DB_ITEM) {
              child.IsTemplate = true;
              tableData.forEach(dataItem => {
                const grand = this.copyDataWidgets(child, widget, website, widget, dataItem);
                widget.Children.push(grand)
              })
            }
            if (child.Children && child.Children.length)
              this.proccessWidget(child, website, page);
          })
        }
      } else {
        if (widget.Children.length)
          widget.Children.forEach(child => {
            this.proccessWidget(child, website, page);
          })
      }
    }


    return widget;
  }


  public static createRecursiveWidget(parent: WidgetModel, recurseTempalte: WidgetModel, list: DbCollectionModel[]) {
    const temp = recurseTempalte;
    recurseTempalte.IsParentWidget = true;
    // recurseTempalte.ParentWidget = parent;
    list.forEach((listItem, index) => {
      let newWid: WidgetModel = new WidgetModel(HelperClass.getId('temp'), temp.WidgetId, temp.PageId, 'Header', temp.ItemType, ``);
      newWid.Children = [];
      newWid.ItemClass = temp.ItemClass;
      newWid.Name = temp.Name;
      newWid.Settings = temp.Settings;
      newWid.ParentWidget = temp;
      temp.Children.forEach(c2 => {
        let grandChild: WidgetModel = new WidgetModel(HelperClass.getId('temp'), c2.WidgetId, c2.PageId, 'Header', c2.ItemType, ``);
        if (c2.FeildName && c2.FeildName !== "Static") {
          grandChild.ItemContent = listItem.Data[c2.FeildName];
        } else {
          grandChild.ItemContent = c2.ItemContent;

        }
        grandChild.ItemClass = c2.ItemClass;
        grandChild.FeildName = c2.FeildName;
        grandChild.UrlId = c2.UrlId;
        grandChild.Name = c2.Name;
        grandChild.ItemEventName = c2.ItemEventName;
        grandChild.ItemEvent = c2.ItemEvent;
        grandChild.RelatedId = c2.WidgetId;
        grandChild.ElementType = c2.ElementType;
        grandChild.RouteId = listItem.DataId;
        grandChild.Settings[DataKeys.PARENT_DATA_SOURCE] = temp.Settings[`${DataKeys.DATA_TABLE}`];
        grandChild.ParentWidget = temp;

        newWid.Children.push(grandChild);
      });
      parent.Children.push(newWid);
    })
  }


  public static IsolateWidget(output: WidgetModel[], widgets: WidgetModel[]) {
    widgets.forEach((wid: WidgetModel) => {
      output.push(wid);
      if (wid.Children)
        this.IsolateWidget(output, wid.Children);
    })
    return output;
  }

  public static GetFeildValue(widgetId: string, page: PageModel) {
    debugger
    const widget: WidgetModel = this.getWidget(page.Widgets, widgetId);
    if (widget) {
      return widget.ItemContent;
    }
  }

  public static getByType(output: WidgetModel[], widgets: WidgetModel[], type: string) {
    widgets.forEach((wid: WidgetModel) => {
      if (wid.ItemType === type)
        output.push(wid);
      if (wid.Children)
        this.getByType(output, wid.Children, type);
    })
    return output;
  }

  static fixWidgetTree(widgets: WidgetModel[], paidId: string) {
    const roots: WidgetModel[] = [];
    var map: any = {};
    const parents = widgets.filter(x => x.ParentId === paidId);
    parents.forEach(parent => {
      parent.Children = this.getChildren(parent, widgets.filter(x => x.WidgetId !== parent.WidgetId));
      roots.push(parent);
    })

    return roots;
  }
  static getChildren(parent: WidgetModel, widgets: WidgetModel[]) {
    let children: WidgetModel[] = [];
    children = widgets.filter(x => x.ParentId === parent.WidgetId);
    children.forEach(child => {
      child.Children = this.getChildren(child, widgets.filter(x => x.WidgetId !== child.WidgetId));
    });
    return children;
  }

  static getChildrenToDelete(widgets: WidgetModel[] = [], widget: WidgetModel) {
    if (!widgets.find(x => x.WidgetId === widget.WidgetId)) {
      widgets.push(widget);
    }
    if (widget && widget.Children) {
      widget.Children.forEach(c => {
        widgets.push(c);
        if (c.Children)
          this.getChildrenToDelete(widgets, c)
      })
    }
    return widgets;
  }

  public static toggleOptions(widgets: WidgetModel[]) {
    widgets.forEach(widget => {
      widget.ShowOptions = false;
      if (widget.Children)
        this.toggleOptions(widget.Children)
    })

    return widgets;
  }

  static mapIdis(widgets: WidgetModel[], newWidgets: WidgetModel[]) {
    widgets.forEach(wid => {
      let check = newWidgets.find(x => x.WidgetId === wid.WidgetId);
      if (check)
        wid.Id = check.Id;
    })
    return widgets;
  }

  static removeClass(widgets: WidgetModel[], className: string) {
    widgets.forEach(wid => {
      if (wid.ItemClass && wid.ItemClass.length && wid.ItemClass.find((x: string) => x === className)) {
        wid.ShowOptions = false;
        const index = wid.ItemClass.indexOf(className);
        if (index >= 0) {
          wid.ItemClass.splice(index, 1);
        }
      }
      if (wid.Children)
        this.removeClass(wid.Children, className)
    })
    return widgets;
  }

  static removeShowOptions(widgets: WidgetModel[]) {
    widgets.forEach(wid => {
      wid.ShowOptions = false;
      if (wid.Children)
        this.removeShowOptions(wid.Children)
    })
    return widgets;
  }


  static getStyleValue(key: string, widget: WidgetModel, website: WebsiteModel) {
    let style;
    if (!website.WebsiteStyles || !website.WebsiteStyles.length || !widget.ItemClass || !widget.ItemClass.length)
      return;

    widget.SelectedClass = website.WebsiteStyles.find(x => x.SelectorName === widget.ItemClass[0]);
    if (!widget.SelectedClass) {
      const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), website.WebsiteId, `class-${new Date().getTime()}`, {});
      newClass.PcStyles = {};
      newClass.TabStyles = {};
      newClass.PhoneStyles = {};

      website.WebsiteStyles.push(newClass);
      widget.ItemClass = [newClass.SelectorName];
      widget.SelectedClass = newClass;
    }

    if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
      return widget.SelectedClass.PcStyles[key]
    }

    if (website.ViewDevice === DeviceTypes.TABLET) {
      return widget.SelectedClass.TabStyles[key]
    }
    if (website.ViewDevice === DeviceTypes.PHONE) {
      return widget.SelectedClass.PhoneStyles[key]
    }
    return style;
  }

  static updateCassClass(website: WebsiteModel, widget: WidgetModel, key: string, value: any, units: string) {
    if (!widget || !website || !widget.ItemClass || !widget.ItemClass.length)
      return widget;

    if (!website.WebsiteStyles)
      website.WebsiteStyles = [];
    widget.SelectedClass = website.WebsiteStyles.find(x => x.SelectorName === widget.ItemClass[0]);
    if (!widget.SelectedClass) {
      const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), website.WebsiteId, `class-${new Date().getTime()}`, {});
      newClass.PcStyles = {};
      newClass.TabStyles = {};
      newClass.PhoneStyles = {};

      website.WebsiteStyles.push(newClass);
      widget.ItemClass = [newClass.SelectorName];
      widget.SelectedClass = newClass;
    }


    if (!widget.SelectedClass.PcStyles)
      widget.SelectedClass.PcStyles = {};

    if (!widget.SelectedClass.PhoneStyles)
      widget.SelectedClass.PhoneStyles = {};

    if (!widget.SelectedClass.TabStyles)
      widget.SelectedClass.TabStyles = {};

    if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
      widget.SelectedClass.PcStyles[key] = value + units;
    }

    if (website.ViewDevice === DeviceTypes.TABLET) {
      widget.SelectedClass.TabStyles[key] = value + units;
    }
    if (website.ViewDevice === DeviceTypes.PHONE) {
      widget.SelectedClass.PhoneStyles[key] = value + units;
    }
    return widget;
  }


  // static getClass(website: WebsiteModel, widget: WidgetModel) {
  //   if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
  //     widget.SelectedClass.PcStyles[key] = value + units;
  //   }

  //   if (website.ViewDevice === DeviceTypes.TABLET) {
  //     widget.SelectedClass.TabStyles[key] = value + units;
  //   }
  //   if (website.ViewDevice === DeviceTypes.PHONE) {
  //     widget.SelectedClass.PhoneStyles[key] = value + units;
  //   }
  //   return widget;
  // }
  static removeCassClass(website: WebsiteModel, widget: WidgetModel, key: string) {
    if (!widget || !website || !widget.ItemClass || !widget.ItemClass.length)
      return widget;

    if (!website.WebsiteStyles)
      website.WebsiteStyles = [];
    widget.SelectedClass = website.WebsiteStyles.find(x => x.SelectorName === widget.ItemClass[0]);

    if (widget.SelectedClass) {
      if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
        delete widget.SelectedClass.PcStyles[key]
      }

      if (website.ViewDevice === DeviceTypes.TABLET) {
        delete widget.SelectedClass.TabStyles[key]
      }
      if (website.ViewDevice === DeviceTypes.PHONE) {
        delete widget.SelectedClass.PhoneStyles[key]
      }
    }



    return widget;
  }

  static pasteWidget(old: WidgetModel, containerWidget: WidgetModel, website: WebsiteModel): WidgetModel {
    let copy: WidgetModel = new WidgetModel(HelperClass.getId('wid'), containerWidget.WidgetId, containerWidget.PageId, old.Name, old.ItemType, ``);
    copy.Settings = old.Settings;
    copy.ParentId = containerWidget.WidgetId;
    copy.ItemContent = old.ItemContent;
    copy.ItemType = old.ItemType;
    copy.ElementType = old.ElementType;
    copy.Settings["PcX"] = 0;
    copy.Settings["PcY"] = 0;
    copy.Settings["TabX"] = 0;
    copy.Settings["TabY"] = 0;
    copy.Settings["PhoneX"] = 0;
    copy.Settings["PhoneY"] = 0;

    if (old.HasClass() && website.HasStyles()) {
      const oldClass = website.GetClassForWidget(old);
      if (oldClass) {
        const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('copy'), website.WebsiteId, `class-${new Date().getTime()}`, {});
        newClass.PcStyles = this.CopyCss(oldClass.PcStyles);
        newClass.TabStyles = this.CopyCss(oldClass.TabStyles);
        newClass.PhoneStyles = this.CopyCss(oldClass.PhoneStyles);
        website.WebsiteStyles.push(newClass);
        copy.ItemClass = [newClass.SelectorName];
        copy.SelectedClass = newClass
      }

    }
    ;


    return copy;
  }

  static copyDataWidgets(old: WidgetModel, containerWidget: WidgetModel, website: WebsiteModel, grandParent: WidgetModel, dataItem: any = {}): WidgetModel {
    let copy: WidgetModel = new WidgetModel(HelperClass.getId('wid'), containerWidget.WidgetId, containerWidget.PageId, old.Name, old.ItemType, ``);
    copy.Settings = old.Settings;
    copy.ParentId = containerWidget.WidgetId;
    copy.FeildName = old.FeildName
    copy.DbTable = old.DbTable
    copy.ItemEvent = old.ItemEvent
    copy.ItemEventName = old.ItemEventName
    copy.ItemContent = old.ItemContent;
    copy.ItemFormat = old.ItemFormat;
    copy.UrlId = old.UrlId;
    copy.Name = dataItem["Name"] || old.Name
    if (copy.UrlId) {
      copy.UrlValue = dataItem[copy.UrlId]
    }
    if (old.Settings[DataKeys.DATA_SOURCE] && copy.FeildName) {
      copy.ItemContent = dataItem[copy.FeildName] || old.ItemContent;

    }
    copy.ItemType = old.ItemType;
    copy.ElementType = old.ElementType;
    copy.ParentWidget = old;
    copy.Children = [];
    copy.GrandParent = grandParent;
    // old.ParentWidget = containerWidget;
    old.Children.forEach(c => {
      copy.Children.push(this.copyDataWidgets(c, copy, website, grandParent, dataItem))
    })

    if (old.HasClass() && website.HasStyles()) {
      const oldClass = website.GetClassForWidget(old);
      if (oldClass) {
        copy.ItemClass = old.ItemClass;
        // const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('copy'), website.WebsiteId, `class-${new Date().getTime()}`, {});
        // newClass.PcStyles = this.CopyCss(oldClass.PcStyles);
        // newClass.TabStyles = this.CopyCss(oldClass.TabStyles);
        // newClass.PhoneStyles = this.CopyCss(oldClass.PhoneStyles);
        // website.WebsiteStyles.push(newClass);
        // copy.ItemClass = [newClass.SelectorName];
        // copy.SelectedClass = newClass
      }

    }
    ;


    return copy;
  }



  static pasteStyles(widget: WidgetModel, selectedClass: WebstyleModel, website: WebsiteModel): any {
    if (!widget.SelectedClass || !website || !selectedClass)
      return;


    if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
      widget.SelectedClass.PcStyles = this.CopyCss(selectedClass.PcStyles)
    }

    if (website.ViewDevice === DeviceTypes.TABLET) {
      widget.SelectedClass.TabStyles = this.CopyCss(selectedClass.TabStyles)
    }
    if (website.ViewDevice === DeviceTypes.PHONE) {
      widget.SelectedClass.PhoneStyles = this.CopyCss(selectedClass.PhoneStyles)
    }

    return widget;
  }
  private static CopyCss(styles: any) {
    let cssObject: any = {};

    for (const [key, value] of Object.entries(styles)) {
      cssObject[key] = value;
    }
    return cssObject;
  }
  public static proccessWidgetDataChanaged(widgets: WidgetModel[]): WidgetModel[] {
    widgets.forEach(wid => {
      if (wid.ParentWidget) {
        wid.ItemContent = wid.ParentWidget.ItemContent;
      }
      if (wid.Children)
        this.proccessWidgetDataChanaged(wid.Children)
    });
    return widgets;
  }
}