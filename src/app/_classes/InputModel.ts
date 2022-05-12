import { ColumnModel } from "./ColumnModel";
import { MainClass } from "./MainClass";
import { HelperClass } from "./_statics/HelperClass";

export class InputModel extends MainClass {

    InputId: string;
    FormId: string;
    Name: string;
    InputType: string;
    InputValue: string;
    InputLabel: string;
    LabelStyles: any;
    InputIcon: string;
    Placeholder: string;
    MobileLabelStyles: any;

    constructor(
        Id: string,
        Name: string,
        InputType: string,
        InputValue: string,
        InputLabel: string,
        LabelStyles: any,
        InputIcon: string,
        Placeholder: string,
        MobileLabelStyles: any

    ) {
        super();
        this.InputId = Id;
        this.Name = Name;
        this.InputType = InputType;
        this.InputValue = InputValue;
        this.InputLabel = InputLabel;
        this.LabelStyles = LabelStyles;
        this.InputIcon = InputIcon;
        this.Placeholder = Placeholder;
        this.MobileLabelStyles = MobileLabelStyles;
        this.AddStyles();

    }

    AddStyles() {
        if (this.InputType === 'text' || this.InputType === 'email' || this.InputType === 'tel' || this.InputType === 'number' || this.InputType === 'password' || this.InputType === 'textarea') {
            this.ItemStyle = {
                'display': 'block',
                'padding': ' 0.5rem 1rem',
                'width': '71%',
                'background-color': 'rgb(31, 39, 48)',
                'border': 'none',
                'border-radius': '7px',
                'margin-bottom': '18px'
            }

            this.LabelStyles = {
                'margin-bottom': '5px',
                'margin': '0'
            }
        }

        if (this.InputType === 'button') {
            this.ItemStyle = { 'background-color': '#4c3ee8', 'padding': '20px', 'color': '#ffffff', 'border': 'none', 'border-radius': '5px' }
        }


        this.ItemMobileStyle = this.ItemStyle;
        this.MobileLabelStyles = this.LabelStyles;
        if (this.ItemMobileStyle && this.ItemMobileStyle['width'])
            this.ItemMobileStyle['width'] = '100%'
    }
}

