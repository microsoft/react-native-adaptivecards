import { AbstractElement } from '../Base/AbstractElement';
import { ValueElement } from '../Base/ValueElement';

export class FactElement extends ValueElement {
    public readonly children: AbstractElement[] = [];

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);
    }
}
