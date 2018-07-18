import { ValueElement } from '../Base/ValueElement';
export class FactElement extends ValueElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
    }
}
