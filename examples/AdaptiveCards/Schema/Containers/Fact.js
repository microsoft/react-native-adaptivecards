import { ValueElement } from '../Abstract/ValueElement';
export class FactElement extends ValueElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
    }
}
