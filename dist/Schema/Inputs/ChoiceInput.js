import { ValueElement } from '../Base/ValueElement';
export class ChoiceInputElement extends ValueElement {
    constructor(json, parent) {
        super(json, parent);
    }
    getTypeName() {
        return 'Input.Choice';
    }
}
