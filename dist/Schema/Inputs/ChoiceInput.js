import { ValueElement } from '../Abstract/ValueElement';
export class ChoiceInputElement extends ValueElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
    }
}
