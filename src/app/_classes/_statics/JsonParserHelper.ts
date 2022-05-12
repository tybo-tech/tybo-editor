import { ColumnModel } from "../ColumnModel";
import { FormModel } from "../FormModel";
import { InputModel } from "../InputModel";
import { PageModel } from "../PageModel";
import { RowModel } from "../RowModel";
import { SectionModel } from "../SectionModel";
import { WebsiteModel } from "../WebsiteModel";
import { WidgetModel } from "../WidgetModel";
import { DeviceTypes } from "./DeviceTypes";

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
            this.parsePages(site.Pages),
            site.Header ? this.parseSections([site.Header])[0] : null,
            site.HeaderDisplay,
            site.HeaderType,
            site.HeaderVisibility,
            site.Footer ? this.parseSections([site.Footer])[0] : null,
            site.WebsiteMode,
            site.ViewDevice,
            site.ViewWidth ,
        );

        if (site.Header)
            web.Header = this.parseSections([site.Header])[0];
        if (site.Footer)
            web.Footer = this.parseSections([site.Footer])[0];
        web._id = site._id;

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
        return web;
    }


    private static parsePages(Pages: PageModel[]): PageModel[] {
        const pages = [];
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
                this.parseSections(page.Sections),
                page.StyleClass
            );
            p._id = page._id;
            p.IsSelected = page.IsSelected + '' == "true";
            p.ItemStyle = page.ItemStyle;
            p.ItemMobileStyle = page.ItemMobileStyle;
            pages.push(p)
        })
        return pages;
    }

    private static parseSections(secs: SectionModel[]): SectionModel[] {
        const sections = [];

        secs.forEach(sec => {
            let s = new SectionModel(
                sec.SectionId,
                sec.PageId,
                sec.Name,
                sec.Styles,
                this.parseRows(sec.Rows),
                this.parseColumns(sec.Columns),
                sec.SectionType,
                sec.ContentWidthMode,
                sec.ContentWidth
            );
            s.ItemStyle = sec.ItemStyle;
            s.ItemClass = sec.ItemClass;
            s.GridStyle = sec.GridStyle;
            s.ItemMobileStyle = sec.ItemMobileStyle;
            s.MobileGridStyle = sec.MobileGridStyle;
            sections.push(s)
        });


        //fix data
        // sections.forEach(section => {
        //     if (section.Columns) {
        //         const row = new RowModel(HelperClass.getId('row'), 'Row', section.Columns, 'Section-Raw');
        //         section.AddRow(row)
        //     }

        //     section.Columns = [];
        // })
        return sections;
    }


    public static parseWidgets(Widgets: WidgetModel[]): WidgetModel[] {
        const widgets = [];
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
                this.parseWidgetsChildren(wid.Children),
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
            w._id = wid._id;
            w.ItemStyle = wid.ItemStyle;
            w.ItemMobileStyle = wid.ItemMobileStyle;
            w.EventStyles = wid.EventStyles;
            w.HeadingStyles = wid.HeadingStyles;
            w.ContentStyles = wid.ContentStyles;
            w.ImageStyles = wid.ImageStyles;
            w.ItemCategory = wid.ItemCategory;
            w.ItemClass = wid.ItemClass;
            w.Form = this.parseForm(wid.Form);
            widgets.push(w)
        })
        return widgets;
    }


    private static parseForm(form: FormModel): FormModel {
        if (!form)
            return null;

        // debugger
        return new FormModel(form.FormId, form.Name, this.parseInputs(form.Inputs), this.parseInputs(form.Buttons))
    }

    private static parseInputs(Inputs: InputModel[]): InputModel[] {
        if (!Inputs || !Inputs.length)
            return [];
        const inputs = [];

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

    private static parseRows(Rows: RowModel[]): RowModel[] {
        if (!Rows || !Rows.length)
            return [];

        const rows = [];

        Rows.forEach(row => {
            let w = new RowModel(
                row.RowId,
                row.SectionId,
                row.Name,
                this.parseColumns(row.Columns),
                row.RowType,
            );
            w.ItemStyle = row.ItemStyle
            w.ItemMobileStyle = row.ItemMobileStyle;
            w.OrderNumber = row.OrderNumber;
            rows.push(w)
        })
        return rows;
    }
    private static parseColumns(Columns: ColumnModel[]): ColumnModel[] {
        if (!Columns)
            return [];

        const columns = [];

        Columns.forEach(wid => {
            let w = new ColumnModel(
                wid.ColumnId,
                wid.RowId,
                wid.Name,
                wid.Styles,
                this.parseWidgets(wid.Widgets),
                wid.ColumnType,
            );
            w.ItemStyle = wid.ItemStyle
            w.ItemMobileStyle = wid.ItemMobileStyle
            columns.push(w)
        })
        return columns;
    }

    private static parseWidgetsChildren(Widgets: WidgetModel[]): WidgetModel[] {
        if (!Widgets || !Widgets.length)
            return [];
        const widgets = [];
        Widgets.forEach(wid => {
            const w = new WidgetModel(
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
            )

            w._id = wid._id;
            w.ItemStyle = wid.ItemStyle;
            w.ItemMobileStyle = wid.ItemMobileStyle;
            w.EventStyles = wid.EventStyles;
            w.HeadingStyles = wid.HeadingStyles;
            w.ContentStyles = wid.ContentStyles;
            w.ImageStyles = wid.ImageStyles;
            w.ItemCategory = wid.ItemCategory;
            w.ItemClass = wid.ItemClass;
            widgets.push(w)
        })
        return widgets;
    }

}
