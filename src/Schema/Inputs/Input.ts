import { CardElement } from '../Elements/CardElement';

export abstract class InputElement extends CardElement {
    // Required
    readonly id: string;
    // Optional
    readonly value?: string;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.id = json.id;
            this.value = json.value;
        }
    }
}
