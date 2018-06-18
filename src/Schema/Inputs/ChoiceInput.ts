import { AbstractElement } from '../Base/AbstractElement';
import { ValueElement } from '../Base/ValueElement';

export class ChoiceInputElement extends ValueElement {

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);
    }

    public getTypeName(): string {
        return 'Input.Choice';
    }
}
