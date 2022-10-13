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
    Value: string;

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
       

            this.LabelStyles = {
                'margin-bottom': '5px',
                'margin': '0'
            }
        }

    }
}

