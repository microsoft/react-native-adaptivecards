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

        if (this.isValidJSON) {
            this.id = json.id;
            this.value = json.value;
        }
    }

    public isInput() {
        return true;
    }

    public getAllInputFieldIds() {
        return [this.getId()];
    }
}
