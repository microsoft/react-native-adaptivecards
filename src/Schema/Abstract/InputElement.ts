import { IElement } from '../Interfaces/IElement';
import { IInput } from '../Interfaces/IInput';
import { ContentElement } from './ContentElement';

export enum InputElementType {
    TextInput = 'Input.Text',
    NumberInput = 'Input.Number',
    DateInput = 'Input.Date',
    TimeInput = 'Input.Time',
    ToggleInput = 'Input.Toggle',
    ChoiceSetInput = 'Input.ChoiceSet',
    PeoplePicker = 'Input.PeoplePicker',
}

export abstract class InputElement extends ContentElement implements IInput {
    // Required
    public readonly id: string;
    // Optional
    public readonly value?: string;
    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.id = json.id;
            this.value = json.value;
        }
    }

    public abstract validate(input: string): boolean;
}
