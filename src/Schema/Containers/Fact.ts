import { AbstractElement } from '../Base/AbstractElement';
import { ValueElement } from '../Base/ValueElement';

export class FactElement extends ValueElement {

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);
    }

    public getTypeName(): string {
        return 'Fact';
    }
}
