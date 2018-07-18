import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement } from '../Base/ActionElement';
import { FormElement } from '../Base/FormElement';
import { CardElement } from '../Cards/Card';

export class ShowCardActionElement extends ActionElement {
    // Required
    public readonly card: CardElement;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.card = new CardElement(json.card, parent);
        }
    }

    public get scope(): FormElement {
        if (this.parent) {
            return this.parent as FormElement;
        }
        return undefined;
    }

    public get children(): AbstractElement[] {
        if (this.card) {
            return [this.card];
        }
        return [];
    }

    protected getRequiredProperties(): string[] {
        return ['type', 'title', 'card'];
    }
}
