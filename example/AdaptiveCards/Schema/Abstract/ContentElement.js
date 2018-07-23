import { AbstractElement } from './AbstractElement';
export var ContentElementType;
(function (ContentElementType) {
    ContentElementType["Column"] = "Column";
    ContentElementType["ColumnSet"] = "ColumnSet";
    ContentElementType["Container"] = "Container";
    ContentElementType["FactSet"] = "FactSet";
    ContentElementType["Image"] = "Image";
    ContentElementType["ImageSet"] = "ImageSet";
    ContentElementType["TextBlock"] = "TextBlock";
    ContentElementType["TextInput"] = "Input.Text";
    ContentElementType["NumberInput"] = "Input.Number";
    ContentElementType["DateInput"] = "Input.Date";
    ContentElementType["TimeInput"] = "Input.Time";
    ContentElementType["ToggleInput"] = "Input.Toggle";
    ContentElementType["ChoiceSetInput"] = "Input.ChoiceSet";
    ContentElementType["PeoplePicker"] = "Input.PeoplePicker";
    ContentElementType["AdaptiveCard"] = "AdaptiveCard";
})(ContentElementType || (ContentElementType = {}));
export class ContentElement extends AbstractElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.id = json.id;
            this.spacing = json.spacing;
            this.separator = json.separator || false;
        }
    }
}
