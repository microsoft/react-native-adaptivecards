import { TypedElement } from '../TypedElement';
export class ChoiceInputElement extends TypedElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }
    getTypeName() {
        return 'Input.Choice';
    }
    getRequiredProperties() {
        return ['title', 'value'];
    }
}
