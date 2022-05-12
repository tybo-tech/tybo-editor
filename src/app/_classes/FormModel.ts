import {  InputModel } from "./InputModel";
import { MainClass } from "./MainClass";
import { HelperClass } from "./_statics/HelperClass";

export class FormModel extends MainClass {

    FormId: string;
    WidgetId: string;
    Name: string;
    Inputs: InputModel[];
    Buttons: InputModel[];

    constructor(
        FormId: string,
        Name: string,
        Inputs: InputModel[],
        Buttons: InputModel[]
    ) {
        super();
        this.FormId = FormId;
        this.Name = Name;
        this.Inputs = Inputs;
        this.Buttons = Buttons;
    }
    AddInput(input: InputModel) {
        if (input) {
            this.Inputs.push(input);
        }
    }
    AddInputRange(count: number, types: string[] = [], labels: string[] = []) {
        for (let i = 0; i < count; i++) {
            const input = new InputModel(HelperClass.getId('input'), 'Name', types[i] || 'text', '', '', '', 'Enter name', '', {});
            input.InputLabel = labels[i] || 'Input label';
            // if(input.InputType === 'button')
            // input.InputLabel = 'Send message'
            this.AddInput(input);
        }
    }
}

