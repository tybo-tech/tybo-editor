
import { FormModel } from "../FormModel";
import { InputModel } from "../InputModel";
import { PageModel } from "../PageModel";
import { WebsiteModel } from "../WebsiteModel";
import { WidgetModel } from "../WidgetModel";
import { DeviceTypes } from "./DeviceTypes";
import { WidgetHelper } from "./WidgetHelper";

export class JsonParserHelper {





    public static parseWeb(site: WebsiteModel): WebsiteModel {
        // debugger
        const web = new WebsiteModel(
            site.WebsiteId,
            site.Name,
            site.Url,
            site.Logo,
            site.LogoStyles,
            site.NavItemsStyles,
            site.Title,
            site.Category,
            site.SubCategory,
            site.Icon,
            [],
            undefined,
            site.HeaderDisplay,
            site.HeaderType,
            site.HeaderVisibility,
            site.Footer ? this.parseWidgets([site.Footer])[0] : undefined,
            site.WebsiteMode,
            site.ViewDevice,
            site.ViewWidth,
        );

        site.Widgets.map(x => x.ItemClass = JSON.parse(x.ItemClass));
        web.Id = site.Id;

        if (web && web.Footer && web.ViewDevice === DeviceTypes.PHONE) {
            web.Footer.SelectedStyle = web.Footer.ItemMobileStyle;
        }

        if (web && web.Footer && web.ViewDevice === DeviceTypes.PC) {
            web.Footer.SelectedStyle = web.Footer.ItemStyle;
        }


        if (web && web.Header && web.ViewDevice === DeviceTypes.PHONE) {
            web.Header.SelectedStyle = web.Header.ItemMobileStyle;
        }

        if (web && web.Header && web.ViewDevice === DeviceTypes.PC) {
            web.Header.SelectedStyle = web.Header.ItemStyle;
        }



        web.ItemStyle = site.ItemStyle;
        web.ItemMobileStyle = site.ItemMobileStyle;
        web.Imports = site.Imports || [];
        web.Collections = site.Collections || [];
        web.TableIdListString = site.TableIdListString || [];
        web.Files = site.Files || [];
        web.ItemType = 'Page';
        if (site.WebsiteStyles && site.WebsiteStyles) {
            site.WebsiteStyles.forEach(style => {
                style.PcStyles = JSON.parse(style.PcStyles);
                style.PhoneStyles = JSON.parse(style.PhoneStyles);
                style.TabStyles = JSON.parse(style.TabStyles);
            })
        }
        if (site.Widgets) {
            // debugger
            const masters = site.Widgets.filter(x => x.PageId === "master");
            const pageWids = WidgetHelper.fixWidgetTree(masters, site.WebsiteId);
            if (pageWids && pageWids.length)
                web.Header = this.parseWidgets(pageWids)[0];
            // p.Widgets = this.parseWidgets(pageWids);
        }


        web.WebsiteStyles = site.WebsiteStyles || [];
        web.ItemClass = site.ItemClass || [];
        web.DbTables = site.DbTables || [];
        // web.Widgets = site.Widgets || [];
        if (!site.Widgets)
            site.Widgets = [];

        web.Pages = this.parsePages(site.Pages, site.Widgets);
        return web;
    }


    private static parsePages(Pages: PageModel[], widgets: WidgetModel[] = []): PageModel[] {
        const pages: any = [];
        Pages.forEach(page => {
            const p = new PageModel(
                page.PageId,
                page.ShowInNav,
                page.ShowTitle,
                page.Title,
                page.Name,
                page.Url,
                page.PageStatus,
                page.Styles,
                [],
                page.StyleClass
            );
            p.Id = page.Id;
            p.WebsiteId = page.WebsiteId;
            p.IsSelected = page.IsSelected + '' == "true";
            p.ItemStyle = page.ItemStyle;
            p.UrlId = page.UrlId;
            // p.PageData = page.PageData;
            p.Tables = page.Tables;
            p.TableName = page.TableName;

            p.TableDisplayColName = page.TableDisplayColName;
            p.ItemMobileStyle = page.ItemMobileStyle;
            const pageWids = WidgetHelper.fixWidgetTree(widgets.filter(x => x.PageId === page.PageId), page.PageId);
            p.Widgets = this.parseWidgets(pageWids);
            pages.push(p)
        })
        return pages;
    }


    public static parseWidgets(Widgets: WidgetModel[]): WidgetModel[] {
        const widgets: any = [];
        if (!Widgets)
            return [];
        Widgets.forEach(wid => {
            let w = new WidgetModel(
                wid.WidgetId,
                wid.ColumnId,
                wid.PageId,
                wid.Name,
                wid.ItemType,
                wid.ImageUrl,
                [],
                wid.ParentId,
                wid.ItemContent,
                wid.ItemHeading,
                wid.ItemEvent,
                wid.ItemEventName,
                wid.ImageStyles,
                wid.HeadingStyles,
                wid.ContentStyles,
                wid.EventStyles,
                wid.ElementType,
                wid.RowNumber,
                wid.ColNumber
            );
            w.Id = wid.Id;
            w.ItemStyle = wid.ItemStyle;
            w.ItemMobileStyle = wid.ItemMobileStyle;
            w.EventStyles = wid.EventStyles;
            w.HeadingStyles = wid.HeadingStyles;
            w.ContentStyles = wid.ContentStyles;
            w.ImageStyles = wid.ImageStyles;
            w.ItemCategory = wid.ItemCategory;
            w.ItemClass = wid.ItemClass;
            w.FeildName = wid.FeildName;
            w.ItemFormat = wid.ItemFormat;
            w.DbTable = wid.DbTable;
            w.UrlId = wid.UrlId;
            w.Events = wid.Events || [];
            w.BackgroundType = wid.BackgroundType || '';
            w.Settings = {};
            if (wid.Settings) {
                w.Settings = JSON.parse(wid.Settings);
                w.Settings = this.loadSettings(w);
            }
            w.OrderNumber = wid.OrderNumber || 1;
            w.Sort();

            if (wid.Children && wid.Children.length)
                w.Children = this.parseWidgets(wid.Children);
            if (wid.Form)
                w.Form = this.parseForm(wid.Form);
            widgets.push(w)
        })
        return widgets;
    }

    public static loadSettings(widget: WidgetModel, w = 200, h = 200): any {
        if (!widget.Settings)
            widget.Settings = {};

        // Pc

        if (!widget.Settings["PcX"])
            widget.Settings["PcX"] = 0;

        if (!widget.Settings["PcY"])
            widget.Settings["PcY"] = 0;


        if (!widget.Settings["PcW"])
            widget.Settings["PcW"] = w;


        if (!widget.Settings["PcH"])
            widget.Settings["PcH"] = h;

        // Tab

        if (!widget.Settings)
            widget.Settings = {};

        if (!widget.Settings["TabX"])
            widget.Settings["TabX"] = 0;

        if (!widget.Settings["TabY"])
            widget.Settings["TabY"] = 0;


        if (!widget.Settings["TabW"])
            widget.Settings["TabW"] = w;


        if (!widget.Settings["TabH"])
            widget.Settings["TabH"] = h;

        // phone 
        if (!widget.Settings)
            widget.Settings = {};

        if (!widget.Settings["PhoneX"])
            widget.Settings["PhoneX"] = 0;

        if (!widget.Settings["PhoneY"])
            widget.Settings["PhoneY"] = 0;


        if (!widget.Settings["PhoneW"])
            widget.Settings["PhoneW"] = w;


        if (!widget.Settings["PhoneH"])
            widget.Settings["PhoneH"] = h;

        // Background
        if (!widget.Settings["PcBgType"])
            widget.Settings["PcBgType"] = 'none';

        if (!widget.Settings["TabBgType"])
            widget.Settings["TabBgType"] = 'none';

        if (!widget.Settings["PhoneBgType"])
            widget.Settings["PhoneBgType"] = 'none';

        return widget.Settings;
    }

    private static parseForm(form: FormModel): FormModel | undefined {
        if (!form)
            return undefined;

        // debugger
        return new FormModel(form.FormId, form.Name, this.parseInputs(form.Inputs), this.parseInputs(form.Buttons))
    }

    private static parseInputs(Inputs: InputModel[]): InputModel[] {
        if (!Inputs || !Inputs.length)
            return [];
        const inputs: any = [];

        Inputs.forEach(input => {
            let w = new InputModel(
                input.InputId,
                input.Name,
                input.InputType,
                input.InputValue,
                input.InputLabel,
                input.LabelStyles,
                input.InputIcon,
                input.Placeholder,
                input.MobileLabelStyles
            );
            w.ItemStyle = input.ItemStyle
            w.ItemMobileStyle = input.ItemMobileStyle;
            w.OrderNumber = input.OrderNumber;
            inputs.push(w)
        })
        return inputs;
    }

}
