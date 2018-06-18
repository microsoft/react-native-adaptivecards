import { AbstractElement } from '../Base/AbstractElement';
export var ValueElementType;
(function (ValueElementType) {
    ValueElementType["Fact"] = "Fact";
    ValueElementType["ChoiceInput"] = "Input.Choice";
})(ValueElementType || (ValueElementType = {}));
export class ValueElement extends AbstractElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }
    getRequiredProperties() {
        return ['title', 'value'];
    }
    isValue() {
        return true;
    }
}
