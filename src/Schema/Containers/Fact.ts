import { CardElement } from '../Base/CardElement';

export class FactElement extends CardElement {
    // Required
    readonly title?: String;
    readonly value?: String;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }

    getTypeName(): string {
        return 'Fact';
    }
    getRequiredProperties(): Array<string> {
        return ['title', 'value'];
    }
}
