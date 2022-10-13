export class DisplayKeys {
    public static ALIGN_LEFT = 'align-left';
    public static ALIGN_CENTER_HORIZONTALY = 'align-center-h';
    public static ALIGN_RIGHT = 'lign-right';
    public static ALIGN_TOP = 'align-top';
    public static ALIGN_CENTER_VERTICALY = 'align-center-v';
    public static ALIGN_BOTTOM = 'align-bottom';
    public static ALIGN_LIST = [
        this.ALIGN_LEFT,
        this.ALIGN_CENTER_HORIZONTALY,
        this.ALIGN_RIGHT,
        this.ALIGN_TOP,
        this.ALIGN_CENTER_VERTICALY,
        this.ALIGN_BOTTOM
    ];


    // FLEX
    public static FLEX_ALIGN_START = {Key: 'align-items', Value: 'flex-start'};
    public static FLEX_ALIGN_CENTER =  {Key: 'align-items', Value: 'center'};;
    public static FLEX_ALIGN_END = {Key: 'align-items', Value: 'flex-end'};
    public static FLEX_ALIGN_LIST = [this.FLEX_ALIGN_START, this.FLEX_ALIGN_CENTER, this.FLEX_ALIGN_END];

    public static FLEX_DIRECTION_ROW = {Key: 'flex-direction', Value: 'row'};
    public static FLEX_DIRECTION_COLUMN ={Key: 'flex-direction', Value:  'column'};
    public static FLEX_DIRECTION_ROW_REVERSE = {Key: 'flex-direction', Value: 'row-reverse'};
    public static FLEX_DIRECTION_COLUMN_REVERSE = {Key: 'flex-direction', Value: 'column-reverse'};
    public static FLEX_DIRECTION_LIST = [
        this.FLEX_DIRECTION_ROW, this.FLEX_DIRECTION_ROW_REVERSE,
        this.FLEX_DIRECTION_COLUMN, this.FLEX_DIRECTION_COLUMN_REVERSE
    ];
}
