
export class StyleHelper {

    public static getFlex(styles: KeyValueModel[] = []) {
        let style: any = {
            'display': 'flex',
            'width': '100%',
            'min-height': '30px',
        }
        styles.forEach(s => {
            style[s.Key] = s.Value;
        })
        return style;
    }
    public static getFlexRow() {
        return {
            'display': 'flex',
            'flex-direction': 'column',
            // 'flex-basis': '100%',
            'gap': '1rem',
            // 'height': '600px',
            'width': '100%',
            'background': '#ffffff',
            'position': 'relative',
            'padding-right': '10px',
            'padding-left': '10px',
            'align-items': 'center'
        }
    }
    public static getFlexBox() {
        return {
            'display': 'flex',
            'flex-direction': 'row',
            // 'flex-basis': '100%',
            'gap': '1rem',
            'min-height': '400px',
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
            'min-height': '400px',
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
            'min-height': '400px',
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
            'min-height': '100px'
        }
    }
    public static getFlexChild() {
        return {
            'display': 'flex',
            'position': 'relative',
            'flex-direction': 'column',
            'width': '100%',
            // 'flex-basis': '100%',
            'min-height': '50px',
            'background': '#ffffff',
            'padding-right': '10px',
            'padding-left': '10px',
            'padding-top': '10px',
            'padding-bottom': '10px',
        }
    }

    public static getGridStyles() {
        return {
            'display': 'grid',
            'grid-template-columns': '100%',
            'position': 'relative',
            'min-height': '12px',
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
            'min-height': '200px',
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
            'min-height': '200px',
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
            'min-height': '4rem',
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
        return { 'color': '#838383', position: 'relative', 'z-index': 1, width: '100%' };
    }
    public static getButtonStyles(styles: KeyValueModel[] = []) {

        let stringStyles = `
        border-radius: 6px;
        width: 100%;
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
        transform: scale(1,0);
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
        color: #ffffff;
        font-size: 18px;
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
}

export interface KeyValueModel {
    Key: string;
    Value: string;
}