import { JsonUtils } from '../../Shared/Utils';
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
        this.isValidJSON = true;
        this.type = this.getTypeName();
        if (!this.type) {
            this.noTypeName();
        }
        this.parent = parent;
        this.backgroundImage = json.backgroundImage;
        this.validateJSON(json, this.getRequiredProperties());
    }
    getParent() {
        return this.parent;
    }
    getAction() {
        return undefined;
    }
    getActions() {
        return [];
    }
    getForm() {
        return undefined;
    }
    hasAction() {
        return false;
    }
    isAction() {
        return false;
    }
    isContent() {
        return false;
    }
    isForm() {
        return false;
    }
    isInput() {
        return false;
    }
    isValue() {
        return false;
    }
    validateForm(value) {
        return true;
    }
    getId() {
        return undefined;
    }
    getAllInputFieldIds() {
        return [];
    }
    isValid() {
        return this.isValidJSON;
    }
    getBackgroundImageUrl() {
        console.log('getBackgroundImageUrl');
        console.log(this.backgroundImage);
        if (typeof this.backgroundImage === 'string') {
            return this.backgroundImage;
        }
        else {
            if (this.backgroundImage) {
                return this.backgroundImage.url;
            }
        }
        return undefined;
    }
    noTypeName() {
        this.isValidJSON = false;
        console.error('Please return a valid type name in \'getTypeName()\' method.');
    }
    noDataFound() {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': data not found');
    }
    invalidRequiredProperty(property) {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': ' + property + ' is required');
    }
    validateJSON(json, requiredProperties) {
        if (!json) {
            this.noDataFound();
        }
        if (requiredProperties) {
            for (let i = 0; i < requiredProperties.length; i++) {
                let property = requiredProperties[i];
                if (!JsonUtils.isValidValue(json[property])) {
                    this.invalidRequiredProperty(property);
                    return;
                }
            }
        }
    }
}
