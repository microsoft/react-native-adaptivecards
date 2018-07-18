import { AbstractElement } from '../Base/AbstractElement';
import { ValueElement } from '../Base/ValueElement';

export class ChoiceInputElement extends ValueElement {
    public readonly children: AbstractElement[] = [];

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);
    }
}
