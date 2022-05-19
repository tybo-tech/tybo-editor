export class StyleHelper {
    public static BACKGROUND = 'background-color';

    public static getFlexRow() {
        return {
            'display': 'flex',
            'min-height': '10rem'
        }
    }
    public static getFlexCol() {
        return {
            'display': 'flex',
            'min-height': '10rem'
        }
    }
    public static getFlexChild() {
        return {
            'flex-basis': '100%',
            'padding-right': '1rem',
            'padding-left': '1rem',
            'padding-top': '1rem',
            'padding-bottom': '1rem',
        }
    }
}
