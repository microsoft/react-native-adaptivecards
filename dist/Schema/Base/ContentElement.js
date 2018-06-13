import { Utils } from '../../utils';
import { CardElement } from '../Base/CardElement';
import { Spacing } from '../Base/Enums';
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
    ContentElementType["InputNumber"] = "Input.Number";
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
