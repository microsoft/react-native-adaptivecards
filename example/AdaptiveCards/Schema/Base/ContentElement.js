import { Spacing } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { CardElement } from '../Base/CardElement';
export var ContentElementType;
(function (ContentElementType) {
    ContentElementType["Column"] = "Column";
    ContentElementType["ColumnSet"] = "ColumnSet";
    ContentElementType["Container"] = "Container";
    ContentElementType["FactSet"] = "FactSet";
    ContentElementType["Image"] = "Image";
    ContentElementType["ImageSet"] = "ImageSet";
    ContentElementType["TextBlock"] = "TextBlock";
    ContentElementType["InputText"] = "Input.Text";
    ContentElementType["NumberInput"] = "Input.Number";
    ContentElementType["DateInput"] = "Input.Date";
    ContentElementType["TimeInput"] = "Input.Time";
    ContentElementType["InputToggle"] = "Input.Toggle";
    ContentElementType["InputChoiceSet"] = "Input.ChoiceSet";
})(ContentElementType || (ContentElementType = {}));
export class ContentElement extends CardElement {
    constructor(json) {
        super(json);
        this.separator = false;
        if (this.isValidJSON) {
            this.id = json.id;
            this.spacing = Utils.getStringEnumValueOrDefault(Spacing, json.spacing, Spacing.Default);
            this.separator = json.separator || false;
        }
    }
    getId() {
        return this.id;
    }
}
