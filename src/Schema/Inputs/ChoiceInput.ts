import { ValueElement } from '../Abstract/ValueElement';
import { IElement } from '../Interfaces/IElement';

export class ChoiceInputElement extends ValueElement {
    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);
    }
}
