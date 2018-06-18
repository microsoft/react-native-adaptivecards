import { Spacing } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { AbstractElement } from '../Base/AbstractElement';
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
    ContentElementType["AdaptiveCard"] = "AdaptiveCard";
})(ContentElementType || (ContentElementType = {}));
export class ContentElement extends AbstractElement {
    constructor(json, parent) {
        super(json, parent);
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
    isContent() {
        return true;
    }
}
