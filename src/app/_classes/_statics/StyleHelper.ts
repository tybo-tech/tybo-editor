import { WebsiteModel } from "../WebsiteModel";
import { WidgetModel } from "../WidgetModel";
import { CssProperties } from "./CssProperties";
import { DeviceTypes } from "./DeviceTypes";
import { DisplayKeys } from "./DisplayKeys";
import { WidgetHelper } from "./WidgetHelper";

export class StyleHelper {

    public static getFlex(styles: KeyValueModel[] = []) {
        let style: any = {
            'display': 'flex',
            'width': '100%',
            'height': '400px',
            'background': '#ffffff',
            'position': 'relative'
        }
        styles.forEach(s => {
            style[s.Key] = s.Value;
        })
        return style;
    }
    public static getFlexRow() {
        return {
            'display': 'flex',
            'flex-direction': 'row',
            'justify-content': 'center',
            // 'flex-basis': '100%',
            'gap': '1rem',
            // 'height': '600px',
            'width': '100%',
            'background': '#ffffff',
            'position': 'relative',
            'padding-right': '10px',
            'padding-left': '10px',
            'align-items': 'center',
            'height': '400px',
        }
    }
    public static getFlexBox() {
        return {
            'display': 'flex',
            'flex-direction': 'row',
            // 'flex-basis': '100%',
            'gap': '1rem',
            'height': '400px',
            'width': '100%',
            'padding-right': '10px',
            'padding-left': '10px',
            'max-width': '1280px',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'position': 'relative'
        }
    }

    public static getFlexBoxTab() {
        return {
            'display': 'flex',
            'flex-direction': 'column',
            // 'flex-basis': '100%',
            'gap': '1rem',
            'height': '400px',
            'width': '100%',
            'padding-right': '10px',
            'padding-left': '10px',
            'max-width': '1280px',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'position': 'relative'
        }
    }

    public static getFlexBoxPhone() {
        return {
            'display': 'flex',
            'flex-direction': 'column',
            // 'flex-basis': '100%',
            'gap': '1rem',
            'height': '400px',
            'width': '100%',
            'padding-right': '10px',
            'padding-left': '10px',
            'max-width': '1280px',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'position': 'relative'
        }
    }
    public static getFlexCol() {
        return {
            'display': 'flex',
            'height': '100px'
        }
    }
    public static getFlexChild() {
        return {
            'display': 'flex',
            'position': 'relative',
            'flex-direction': 'column',
            'width': '100%',
            'height': '380px',
            'background': '#e4e4e4',
            'padding-right': '10px',
            'padding-left': '10px',
            'padding-top': '10px',
            'padding-bottom': '10px',
        }
    }


    public static getFoatingContainerStyles() {
        return {
            'display': 'flex',
            'position': 'absolute',
            'flex-direction': 'column',
            'width': '40%',
            // 'flex-basis': '100%',
            'height': '200px',
            'background': '#333333',
            'padding-right': '10px',
            'padding-left': '10px',
            'padding-top': '10px',
            'padding-bottom': '10px',
            'left': '20%',
            'top': '20%',
            'z-index': '1',
        }
    }


    public static getStackContainer() {
        return {
            'display': 'flex',
            'position': 'absolute',
            'flex-direction': 'column',
            'width': '40%',
            'height': '200px',
            'background': 'none',
            'left': '20%',
            'top': '20%',
            'padding': '10px',
            'gap': '20px',
            'z-index': '1',
        }
    }

    public static getGridStyles() {
        return {
            'display': 'grid',
            'grid-template-columns': '33% 33% 33%',
            'position': 'relative',
            'background': '#dfe8f0',
            'grid-gap': '10px',
            'padding-right': '10px',
            'padding-left': '10px',
            'padding-top': '10px',
            'padding-bottom': '10px',
            'width': '100%'
        }
    }

    public static getFlexChildTab() {
        return {
            'display': 'flex',
            'position': 'relative',
            'flex-direction': 'column',
            // 'flex-basis': '100%',
            'height': '200px',
            'width': '100%',
            'padding-right': '10px',
            'padding-left': '10px',
            'padding-top': '10px',
            'padding-bottom': '10px',
        }
    }

    public static getFlexChildPhone() {
        return {
            'display': 'flex',
            'position': 'relative',
            'flex-direction': 'column',
            // 'flex-basis': '100%',
            'height': '200px',
            'width': '100%',
            'padding-right': '10px',
            'padding-left': '10px',
            'padding-top': '10px',
            'padding-bottom': '10px',
        }
    }

    public static getFlexNavBar(styles: KeyValueModel[] = []) {
        let style: any = {
            'display': 'flex',
            'flex-direction': 'row',
            // 'flex-basis': '100%',
            'width': '100%',
            'height': CssProperties.NAV_HEIGHT,
            'align-items': 'center',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'background': '#000000'
        }
        styles.forEach(s => {
            style[s.Key] = s.Value;
        })
        return style;
    }
    public static getInputStyles(styles: KeyValueModel[] = []) {
        let style: any = {
            'width': '100%',
            'padding-right': '20px',
            'padding-left': '20px',
            'padding-top': '12px',
            'padding-bottom': '12px',
            'margin-bottom': '25px',
            'display': 'block',
            'border-radius': '4px',
            'box-sizing': 'border-box'
        }
        styles.forEach(s => {
            style[s.Key] = s.Value;
        })
        return style;
    }
    public static getTextStyles(styles: KeyValueModel[] = []) {
        return { 'color': '#7f8c8d', background: 'none', position: 'relative', 'z-index': 1 };
    }
    public static getButtonStyles(styles: KeyValueModel[] = []) {

        let stringStyles = `
        border-radius: 6px;
        border: none;
        position: relative;
        color: #fff;
        background:#367AF6;
        text-align:center;
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
        z-index:1;
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                debugger
                style[s.Key] = s.Value;
            }
        })
        return style;
    }

    public static getImageStyles(styles: KeyValueModel[] = []) {

        let stringStyles = `
        width: 100%;
        position: relative;
        object-fit: cover;
        object-position: top;
        z-index:1;
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                debugger
                style[s.Key] = s.Value;
            }
        })
        return style;
    }
    public static getCardStyles(styles: KeyValueModel[] = []) {

        let stringStyles = `
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 100%;
        min-height: 100px;
        background: #ffffff;
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                debugger
                style[s.Key] = s.Value;
            }
        })
        return style;
    }
    public static getNavListItemStylePC(styles: KeyValueModel[] = []) {

        let stringStyles = `
        overflow: hidden;
        display: inline-block;
        list-style-type: none;
        font-size: 20px;
        margin: 0;
        margin-left: 24px;
        padding: 0;
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                debugger
                style[s.Key] = s.Value;
            }
        })
        return style;
    }
    public static getVidBg(styles: KeyValueModel[] = []) {

        let stringStyles = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                debugger
                style[s.Key] = s.Value;
            }
        })
        return style;
    }

    public static getNavListItemStylePhone(styles: KeyValueModel[] = []) {

        let stringStyles = `
        overflow: hidden;
        display: block;
        list-style-type: none;
        font-size: 20px;
        margin: 0;
        padding: 0;
        padding-top: 20px;

`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                debugger
                style[s.Key] = s.Value;
            }
        })
        return style;
    }
    public static getUlStylePhone(styles: KeyValueModel[] = []) {

        let stringStyles = `
        background: #000000;
        position: absolute;
        z-index: 10000;
        height: 100vh;
        width:70%;
        top:0;
        right:0;
        transform: scale(0,1);
        transform-origin: 100% 50%;
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                style[s.Key] = s.Value;
            }
        })
        return style;
    }
    public static getLinkStyle(styles: KeyValueModel[] = []) {

        let stringStyles = `
        color: #333333;
        font-size: 18px;
        cursor: pointer;
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                debugger
                style[s.Key] = s.Value;
            }
        })
        return style;
    }
    public static getMobileMenuStyles(styles: KeyValueModel[] = []) {

        let stringStyles = `
        width: 42px;
        padding: 3px;
        background: #ffffff;
        color: #000000;
        position: relative;
        border-radius: 7px;
        right: 24px;
`
        let style: any = this.proccessStringToCss(stringStyles);
        styles.forEach(s => {
            if (s.Key && s.Value && s.Key.length && s.Key != undefined) {
                style[s.Key] = s.Value;
            }
        })
        return style;
    }


    static proccessStringToCss(styles: string) {
        const lines = styles.trim().split(';').map(x => x.trim().split(":").map(x => x.trim()));
        let style: any = {};
        if (lines && lines.length) {
            lines.forEach(line => {
                if (line[0] && line[1])
                    style[line[0]] = line[1];
            })
        }
        return style;
    }


    public static SelectStyles(website: WebsiteModel, widget: WidgetModel) {
        if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
            return widget.SelectedClass?.PcStyles;
        }

        if (website.ViewDevice === DeviceTypes.TABLET) {
            return widget.SelectedClass?.TabStyles;
        }
        if (website.ViewDevice === DeviceTypes.PHONE) {
            return widget.SelectedClass?.PhoneStyles;
        }
    }


    public static UpdatePosition(widget: WidgetModel) {
        if (widget.SelectedClass?.PcStyles) {
            widget.SelectedClass.PcStyles['position'] = 'relative';
            widget.SelectedClass.PcStyles['left'] = '0';
            widget.SelectedClass.PcStyles['width'] = '100%';
        }
        if (widget.SelectedClass?.TabStyles) {
            widget.SelectedClass.TabStyles['position'] = 'relative';
            widget.SelectedClass.PcStyles['left'] = '0';
            widget.SelectedClass.PcStyles['width'] = '100%';
        }
        if (widget.SelectedClass?.PhoneStyles) {
            widget.SelectedClass.PhoneStyles['position'] = 'relative';
            widget.SelectedClass.PcStyles['left'] = '0';
            widget.SelectedClass.PcStyles['width'] = '100%';
        }
        return widget;
    }


    public static MoveTag(website: WebsiteModel, widget: WidgetModel, x: string, y: string) {
        if (widget && widget.SelectedClass) {

            WidgetHelper.VilidateClassStyles(widget);

            if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
                if (this.GetPosition(widget.SelectedClass.PcStyles) === CssProperties.ABSOLUTE) {
                    widget.SelectedClass.PcStyles['top'] = y;
                    widget.SelectedClass.PcStyles['left'] = x;
                    delete widget.SelectedClass.PcStyles["margin-top"];
                    delete widget.SelectedClass.PcStyles["margin-left"];
                } else {
                    widget.SelectedClass.PcStyles['margin-top'] = y;
                    widget.SelectedClass.PcStyles['margin-left'] = x;
                    delete widget.SelectedClass.PcStyles["top"];
                    delete widget.SelectedClass.PcStyles["left"];
                }
            }

            if (website.ViewDevice === DeviceTypes.TABLET) {
                if (this.GetPosition(widget.SelectedClass.TabStyles) === 'absoulute') {
                    widget.SelectedClass.TabStyles['top'] = y;
                    widget.SelectedClass.TabStyles['left'] = x;
                    delete widget.SelectedClass.TabStyles["margin-top"];
                    delete widget.SelectedClass.TabStyles["margin-left"];
                } else {
                    widget.SelectedClass.TabStyles['margin-top'] = y;
                    widget.SelectedClass.TabStyles['margin-left'] = x;
                    delete widget.SelectedClass.TabStyles["top"];
                    delete widget.SelectedClass.TabStyles["left"];
                }
            }
            if (website.ViewDevice === DeviceTypes.PHONE) {
                if (this.GetPosition(widget.SelectedClass.PhoneStyles) === 'absoulute') {
                    widget.SelectedClass.PhoneStyles['top'] = y;
                    widget.SelectedClass.PhoneStyles['left'] = x;
                    delete widget.SelectedClass.PhoneStyles["margin-top"];
                    delete widget.SelectedClass.PhoneStyles["margin-left"];
                } else {
                    widget.SelectedClass.PhoneStyles['margin-top'] = y;
                    widget.SelectedClass.PhoneStyles['margin-left'] = x
                    delete widget.SelectedClass.PhoneStyles["top"];
                    delete widget.SelectedClass.PhoneStyles["left"];
                }
            }


        }
    }

    private static GetPosition(style: any) {
        if (!style) {
            style = {};
            style[CssProperties.POSITION] = CssProperties.RELATIVE;
        }
        return style[CssProperties.POSITION];
    }

    public static CheckPosition(website: WebsiteModel, widget: WidgetModel) {
        widget = WidgetHelper.VilidateClassStyles(widget);
        if (!widget.SelectedClass)
            return;
        if (website.ViewDevice === DeviceTypes.PC || !website.ViewDevice) {
            return this.GetPosition(widget.SelectedClass.PcStyles)
        }

        if (website.ViewDevice === DeviceTypes.TABLET) {
            return this.GetPosition(widget.SelectedClass.PcStyles)
        }
        if (website.ViewDevice === DeviceTypes.PHONE) {
            return this.GetPosition(widget.SelectedClass.PcStyles)
        }
    }


    public static AlignItems(style: any, alignId: string) {
        if (style && alignId === DisplayKeys.ALIGN_CENTER_HORIZONTALY) {
            style['left'] = '50%';
            if (style['transform'] === 'translateY(-50%)' || style['transform'] === 'translate(-50%, -50%)') {
                style['transform'] = 'translate(-50%, -50%)';
                return style;
            }
            style['transform'] = 'translateX(-50%)';
            return style;
        }

        if (style && alignId === DisplayKeys.ALIGN_CENTER_VERTICALY) {
            style['top'] = '50%';
            if (style['transform'] === 'translateX(-50%)' || style['transform'] === 'translate(-50%, -50%)') {
                style['transform'] = 'translate(-50%, -50%)';
                return style;
            }
            style['transform'] = 'translateY(-50%)';
            return style;
        }

        if (style && alignId === DisplayKeys.ALIGN_LEFT) {
            style['left'] = '0';
            delete style['transform'];
            delete style['right'];
            return style;
        }

        if (style && alignId === DisplayKeys.ALIGN_LEFT) {
            style['left'] = '0';
            delete style['transform'];
            delete style['right'];
            return style;
        }

        if (style && alignId === DisplayKeys.ALIGN_RIGHT) {
            style['right'] = '0';
            delete style['transform'];
            delete style['left'];
            return style;
        }

        if (style && alignId === DisplayKeys.ALIGN_TOP) {
            style['top'] = '0';
            delete style['transform'];
            delete style['bottom'];
            return style;
        }

        if (style && alignId === DisplayKeys.ALIGN_BOTTOM) {
            style['bottom'] = '0';
            delete style['transform'];
            delete style['top'];
            return style;
        }
    }


    public static ApplyStyle(style: any, alignId: string, styleKey: string) {
        console.log(style, alignId, styleKey);
        if(style){
            style[styleKey] = alignId;
            return style;
        }
    }

    public static AlignFlexItems(style: any, alignId: string) {


    }
}

export interface KeyValueModel {
    Key: string;
    Value: string;
}