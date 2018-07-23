import { ConsoleUtils } from '../../Utils/ConsoleUtils';
import { JsonUtils } from '../../Utils/JsonUtils';
export var CardElementType;
(function (CardElementType) {
    CardElementType["Column"] = "Column";
    CardElementType["ColumnSet"] = "ColumnSet";
    CardElementType["Container"] = "Container";
    CardElementType["Fact"] = "Fact";
    CardElementType["FactSet"] = "FactSet";
    CardElementType["Image"] = "Image";
    CardElementType["ImageSet"] = "ImageSet";
    CardElementType["TextBlock"] = "TextBlock";
    CardElementType["TextInput"] = "Input.Text";
    CardElementType["NumberInput"] = "Input.Number";
    CardElementType["DateInput"] = "Input.Date";
    CardElementType["TimeInput"] = "Input.Time";
    CardElementType["ToggleInput"] = "Input.Toggle";
    CardElementType["ChoiceInput"] = "Input.Choice";
    CardElementType["ChoiceSetInput"] = "Input.ChoiceSet";
    CardElementType["AdaptiveCard"] = "AdaptiveCard";
})(CardElementType || (CardElementType = {}));
export class AbstractElement {
    constructor(json, parent) {
        let validation = JsonUtils.isValidateJson(json, this.requiredProperties);
        if (!validation.isValid) {
            ConsoleUtils.error('AbstractElement', validation.message);
        }
        else {
            this.isValid = validation.isValid;
            this.type = json.type;
            this.parent = parent;
        }
    }
    get ancestors() {
        if (this.parent) {
            return [this.parent, ...this.parent.ancestors];
        }
        return [];
    }
    get ancestorsAndSelf() {
        return [this, ...this.ancestors];
    }
    get descends() {
        return this.children.reduce((prev, current) => {
            return prev.concat(current.descends);
        }, this.children.slice());
    }
    get descendsAndSelf() {
        return [this, ...this.descends];
    }
    get requiredProperties() {
        return ['type'];
    }
}
