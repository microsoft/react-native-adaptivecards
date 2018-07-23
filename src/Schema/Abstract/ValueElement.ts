import { IElement } from '../Interfaces/IElement';
import { IValue } from '../Interfaces/IValue';
import { AbstractElement } from './AbstractElement';

export enum ValueElementType {
    Fact = 'Fact',
    ChoiceInput = 'Input.Choice'
}

export abstract class ValueElement extends AbstractElement implements IValue {
    // Optional
    public readonly title: string;
    public readonly value: string;

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.title = json.title;
            this.value = json.value;
        }
    }

    public get requiredProperties() {
        return ['title', 'value'];
    }
}
