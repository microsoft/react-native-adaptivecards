import { AbstractElement } from './AbstractElement';
export var ValueElementType;
(function (ValueElementType) {
    ValueElementType["Fact"] = "Fact";
    ValueElementType["ChoiceInput"] = "Input.Choice";
})(ValueElementType || (ValueElementType = {}));
export class ValueElement extends AbstractElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.title = json.title;
            this.value = json.value;
        }
    }
    get requiredProperties() {
        return ['title', 'value'];
    }
}
