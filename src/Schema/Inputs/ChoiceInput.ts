import { TypedElement } from '../TypedElement';

export class ChoiceInputElement extends TypedElement {
    // Required
    readonly title: string;
    readonly value: string;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }

    getTypeName(): string {
        return 'Input.Choice';
    }

    getRequiredProperties(): Array<string> {
        return ['title', 'value'];
    }
}
