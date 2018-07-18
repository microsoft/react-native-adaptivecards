import { AbstractElement } from './AbstractElement';
import { ContentElement } from './ContentElement';

export enum InputElementType {
    TextInput = 'Input.Text',
    NumberInput = 'Input.Number',
    DateInput = 'Input.Date',
    TimeInput = 'Input.Time',
    ToggleInput = 'Input.Toggle',
    ChoiceSetInput = 'Input.ChoiceSet',
}

export abstract class InputElement extends ContentElement {
    // Required
    public readonly id: string;
    // Optional
    public readonly value?: string;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.id = json.id;
            this.value = json.value;
        }
    }

    public abstract validate(input: string): boolean;
}
