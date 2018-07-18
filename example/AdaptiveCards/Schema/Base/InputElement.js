import { ContentElement } from './ContentElement';
export var InputElementType;
(function (InputElementType) {
    InputElementType["TextInput"] = "Input.Text";
    InputElementType["NumberInput"] = "Input.Number";
    InputElementType["DateInput"] = "Input.Date";
    InputElementType["TimeInput"] = "Input.Time";
    InputElementType["ToggleInput"] = "Input.Toggle";
    InputElementType["ChoiceSetInput"] = "Input.ChoiceSet";
})(InputElementType || (InputElementType = {}));
export class InputElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.id = json.id;
            this.value = json.value;
        }
    }
}
